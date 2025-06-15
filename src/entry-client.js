import { createApp } from './main.js';

const { app, router, metaManager } = createApp();

router.isReady().then(() => {
  app.mount('#app');
});
