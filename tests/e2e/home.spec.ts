import { test, expect } from '@playwright/test';

test('home shows intro and only featured projects', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Jack Matte');
  await expect(page.getByRole('link', { name: 'Example Project Alpha' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Example Project Beta' })).toHaveCount(0);
});

test('home shows an About section with a timeline', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'About', level: 2 })).toBeVisible();
  const axis = page.locator('.tl-axis');
  await expect(axis).toBeVisible();
  await expect(axis.locator('.tl-tick')).not.toHaveCount(0);
  await expect(page.locator('.tl-message')).toBeVisible();
});

test('home shows recent writing with an all-writing link', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Recent writing' })).toBeVisible();
  await expect(page.getByRole('link', { name: /all writing/i })).toHaveAttribute('href', '/blog');
});

test('the standalone /about page no longer exists', async ({ page }) => {
  const res = await page.goto('/about');
  expect(res?.status()).toBe(404);
});
