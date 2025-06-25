import express from 'express'
import { createServer as createViteServer } from 'vite'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

const isProd = process.env.NODE_ENV === 'production'
const __dirname = resolve()

async function createServer() {
  const app = express()

  let vite
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: 'ssr' },
      appType: 'custom'
    })
    app.use(vite.middlewares)
  } else {
    app.use('/assets', express.static(resolve('dist/client/assets')))
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        template = await readFile(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      } else {
        template = await readFile(resolve('dist/client/index.html'), 'utf-8')
        render = (await import('./dist/server/entry-server.js')).render
      }

      const { appContent } = await render(url)

      const html = template.replace(`<!--ssr-outlet-->`, appContent)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(3000, () => {
    console.log('SSR server running at http://localhost:3000')
  })
}

createServer()
