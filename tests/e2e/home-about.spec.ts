import { test, expect } from '@playwright/test';

test('home shows intro and only featured projects', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Jack Matte');
  await expect(page.getByRole('link', { name: 'Example Project Alpha' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Example Project Beta' })).toHaveCount(0);
});

test('about page renders', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { name: 'About', level: 1 })).toBeVisible();
});
