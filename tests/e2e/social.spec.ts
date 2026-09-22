import { test, expect } from '@playwright/test';

test('email copy button copies the address and shows feedback', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');

  const email = page.getByRole('link', { name: 'joshuajmatte@gmail.com' }).first();
  await expect(email).toHaveAttribute('href', 'mailto:joshuajmatte@gmail.com');

  const copy = page.getByRole('button', { name: /copy email address/i }).first();
  await copy.click();
  await expect(copy).toHaveText('Copied!');

  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toBe('joshuajmatte@gmail.com');
});
