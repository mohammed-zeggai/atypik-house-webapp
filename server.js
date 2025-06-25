import express from 'express'
import { createServer as createViteServer } from 'vite'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

async function createServer() {
  const app = express()
  const root = process.cwd()

  // Crée le serveur vite en mode middleware SSR
  const vite = await createViteServer({
    root,
    server: { middlewareMode: 'ssr' },
    appType: 'custom',
  })

  // Utilise vite comme middleware
  app.use(vite.middlewares)

  // Toutes les requêtes passent ici pour SSR
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl
      // Lis le template html
      let template = await readFile(resolve(root, 'index.html'), 'utf-8')
      // Transforme le template avec vite (injecte les scripts)
      template = await vite.transformIndexHtml(url, template)

      // Charge le module serveur (render)
      const { render } = await vite.ssrLoadModule('/src/entry-server.js')

      // Rend le contenu
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

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
  })
}

createServer()
