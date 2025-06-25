import express from 'express'
import { createServer as createViteServer } from 'vite'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

async function createServer() {
  const app = express()
  const root = process.cwd()

  // Initialise Vite en mode middleware SSR
  const vite = await createViteServer({
    root,
    server: { middlewareMode: 'ssr' },
    appType: 'custom'
  })

  // Utilisation des middlewares Vite (pour hot reload, etc.)
  app.use(vite.middlewares)

  // SSR pour toutes les routes
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      // Lis index.html à la racine du projet
      let template = await readFile(resolve(root, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      // Charge le module SSR (entry-server.js)
      const { render } = await vite.ssrLoadModule('/src/entry-server.js')

      // Rend l'application en HTML
      const { appContent } = await render(url)

      // Injecte le contenu dans le template
      const html = template.replace('<!--ssr-outlet-->', appContent)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(3000, () => {
    console.log('Serveur en ligne : http://localhost:3000')
  })
}

createServer()
