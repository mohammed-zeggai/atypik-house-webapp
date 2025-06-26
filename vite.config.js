import vue from '@vitejs/plugin-vue'

export default ({ command, ssrBuild }) => {
  const isSSR = !!ssrBuild

  return {
    plugins: [vue()],
    build: isSSR
      ? {
          ssr: 'src/entry-server.js',
          outDir: 'dist/server',
          rollupOptions: {
            input: 'src/entry-server.js',
          },
        }
      : {
          outDir: 'dist/client',
        },
    ssr: isSSR
      ? {
          noExternal: ['vue-meta']
        }
      : undefined,
    server: {
      host: true, // accepte les connexions externes
      middlewareMode: isSSR, // nécessaire quand utilisé en middleware (Express)
      allowedHosts: ['f2i-dev06-mz-ak-yy-ae.fr'], // 👈 ajoute cette ligne
    },
    appType: 'custom' // important pour SSR avec Express
  }
}
