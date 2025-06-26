import vue from '@vitejs/plugin-vue'

export default ({ command, ssrBuild }) => {
  if (ssrBuild) {
    return {
      plugins: [vue()],
      build: {
        ssr: 'src/entry-server.js',
        outDir: 'dist/server',
        rollupOptions: {
          input: 'src/entry-server.js',
        },
      },
      ssr: {
        noExternal: ['vue-meta']
      },
      server: {
        host: '0.0.0.0',
        port: 8080,
        configureServer: (server) => {
          server.middlewares.use((req, res, next) => {
            const allowedHosts = ['https://atypik-house-ssr-web-app-vyxof.ondigitalocean.app', 'https://f2i-dev06-mz-ak-yy-ae.fr', 'http://localhost']
            const hostHeader = req.headers.host?.split(':')[0]
            if (!allowedHosts.includes(hostHeader || '')) {
              res.statusCode = 403
              res.end('Forbidden')
              return
            }
            next()
          })
        }
      }
    }
  } else {
    return {
      plugins: [vue()],
      build: {
        outDir: 'dist/client',
      }
    }
  }
}
