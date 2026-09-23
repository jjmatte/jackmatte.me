import { test, expect } from '@playwright/test';

test('home page renders with a heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Hello, my name is Jack.');
});
