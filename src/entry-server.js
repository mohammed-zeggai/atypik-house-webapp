import { createVueApp } from './main'
import { renderToString } from '@vue/server-renderer'

export async function render(url) {
  const { app, router } = createVueApp()

  router.push(url)
  await router.isReady()

  const appContent = await renderToString(app)

  return { appContent }
}
