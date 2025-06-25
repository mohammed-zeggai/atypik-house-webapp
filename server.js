import express from 'express'
import { createServer as createViteServer } from 'vite'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

const isProd = process.env.NODE_ENV === 'production'
const root = process.cwd()

async function createServer() {
  const app = express()

  let vite
  if (!isProd) {
    // En dev mode : démarrer vite en middleware SSR
    vite = await createViteServer({
      root,
      server: { middlewareMode: 'ssr' },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    // En prod : servir les fichiers statiques du build client
    app.use('/assets', express.static(resolve(root, 'dist/client/assets')))
    app.use('/favicon.ico', express.static(resolve(root, 'dist/client/favicon.ico')))
    app.use('/robots.txt', express.static(resolve(root, 'dist/client/robots.txt')))
    app.use('/manifest.webmanifest', express.static(resolve(root, 'dist/client/manifest.webmanifest')))
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        // En dev, on lit le template et on le transforme via vite
        template = await readFile(resolve(root, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      } else {
        // En prod, on utilise les fichiers buildés
        template = await readFile(resolve(root, 'dist/client/index.html'), 'utf-8')
        render = (await import('./dist/server/entry-server.js')).render
      }

      // Rendu SSR
      const { appContent } = await render(url)

      // Injection du rendu dans le template HTML
      const html = template.replace(`<!--ssr-outlet-->`, appContent)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(e)
      }
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(3000, () => {
    console.log('Server started at http://localhost:3000')
  })
}

createServer()
