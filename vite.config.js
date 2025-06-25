import vue from '@vitejs/plugin-vue';

export default {
  plugins: [vue()],
  ssr: {
    noExternal: ['vue-meta']
  }
};
