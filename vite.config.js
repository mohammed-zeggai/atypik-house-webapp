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
        allowedHosts: ['f2i-dev06-mz-ak-yy-ae.fr']
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
