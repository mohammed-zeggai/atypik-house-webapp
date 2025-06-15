import express from 'express';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

async function createServer() {
  const app = express();

  // Active la compression gzip pour réduire la taille des réponses HTTP
  app.use(compression());

  // Sert les fichiers statiques (favicon, images, css, js) avec cache de 30 jours
  app.use(
    express.static(path.resolve(__dirname, 'public'), {
      maxAge: '30d',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          // Pas de cache pour les fichiers HTML (pour éviter les contenus obsolètes)
          res.setHeader('Cache-Control', 'no-cache');
        }
      },
    })
  );

  // Création du serveur Vite en mode middleware SSR
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  });

  // Utiliser le middleware Vite
  app.use(vite.middlewares);

  // Middleware principal pour le SSR
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      // 1. Lire index.html
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

      // 2. Appliquer la transformation Vite (injecte scripts + HMR)
      template = await vite.transformIndexHtml(url, template);

      // 3. Importer la factory createApp pour SSR
      const { createApp } = await vite.ssrLoadModule('/src/main.js');

      // 4. Créer l'app Vue, router et metaManager
      const { app: vueApp, router, metaManager } = createApp();

      // 5. Naviguer vers l'URL demandée
      await router.push(url);
      await router.isReady();

      // 6. Rendre l'app Vue en string
      const { renderToString } = await vite.ssrLoadModule('vue/server-renderer');
      const appHtml = await renderToString(vueApp);

      // 7. Générer les balises meta dynamiques via vue-meta
      const metaHtml = metaManager.renderToString();

      // 8. Injecter le rendu app et les meta tags dans le template HTML
      let html = template.replace(`<!--app-html-->`, appHtml);
      html = html.replace('</head>', `${metaHtml}</head>`);

      // 9. Envoyer la page complète
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);

    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return app;
}

createServer().then(app =>
  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  })
);
