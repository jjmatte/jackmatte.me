import { test, expect } from '@playwright/test';

test('blog index lists the placeholder post', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.getByRole('heading', { name: 'Writing', level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Hello World' })).toBeVisible();
});

test('blog post renders its body', async ({ page }) => {
  await page.goto('/blog/hello-world');
  await expect(page.getByRole('heading', { name: 'Hello World', level: 1 })).toBeVisible();
  await expect(page.getByText('This is a placeholder post')).toBeVisible();
});
