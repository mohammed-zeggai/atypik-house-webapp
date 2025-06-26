import express from 'express'
import { createServer } from 'vite'
import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { pathToFileURL } from 'url'

async function createServerApp() {
  const app = express()
  const root = process.cwd()

  // Crée le serveur Vite en mode middleware SSR
  const vite = await createServer({
    root,
    server: { middlewareMode: 'ssr' },
    appType: 'custom',
  })

  // Utilise Vite comme middleware
  app.use(vite.middlewares)

  // Toutes les requêtes passent ici pour le rendu SSR
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      // Lis le template HTML
      let template = await readFile(resolve(root, 'index.html'), 'utf-8')

      // Transforme le template avec Vite (injecte les scripts)
      template = await vite.transformIndexHtml(url, template)

      // Charge le module serveur (render)
      // Utiliser pathToFileURL pour éviter les problèmes de chemin sur Windows
      const serverEntryPath = pathToFileURL(resolve(root, '/app/dist/server/entry-server.js')).href
      const { render } = await vite.ssrLoadModule('/app/dist/server/entry-server.js')

      // Rend le contenu de l'app
      const { appContent } = await render(url)

      // Injecte dans le template
      const html = template.replace('<!--ssr-outlet-->', appContent)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })

}

createServerApp()
