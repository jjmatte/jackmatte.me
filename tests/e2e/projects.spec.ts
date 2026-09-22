import { test, expect } from '@playwright/test';

test('projects index lists project titles', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Example Project Alpha' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Example Project Beta' })).toBeVisible();
});

test('project detail page renders title and writeup', async ({ page }) => {
  await page.goto('/projects/example-alpha');
  await expect(page.getByRole('heading', { name: 'Example Project Alpha', level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Why I built this' })).toBeVisible();
});
