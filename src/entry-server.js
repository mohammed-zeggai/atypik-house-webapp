import { createApp } from './main.js';
import { renderToString } from 'vue/server-renderer';

export async function render(url) {
  const { app, router, metaManager } = createApp();

  await router.push(url);
  await router.isReady();

  const appHtml = await renderToString(app);
  const meta = metaManager.render();

  return { appHtml, meta };
}
