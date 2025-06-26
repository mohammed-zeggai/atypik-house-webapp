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
        allowedHosts: 'all'
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
