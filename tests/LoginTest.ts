import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8081/login');
  await page.getByPlaceholder('email@domain.com').click();
  await page.getByPlaceholder('email@domain.com').fill('test@test.com');
  await page.getByPlaceholder('Mot de passe').click();
  await page.getByPlaceholder('Mot de passe').press('CapsLock');
  await page.getByPlaceholder('Mot de passe').fill('Password@1234');
  await page.getByPlaceholder('Mot de passe').press('CapsLock');
  await page.getByPlaceholder('Mot de passe').fill('Password@1234');
  await page.getByRole('button', { name: 'Se connecter' }).click();
});
