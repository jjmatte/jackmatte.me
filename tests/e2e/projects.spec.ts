import { test, expect } from '@playwright/test';

test('projects index lists project titles', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Lots' })).toBeVisible();
});

test('project detail page renders title and writeup', async ({ page }) => {
  await page.goto('/projects/lots');
  await expect(page.getByRole('heading', { name: 'Lots', level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Why I built this' })).toBeVisible();
});

test('the Lots clip renders as a looping muted video', async ({ page }) => {
  await page.goto('/projects/lots');
  const video = page.locator('video[data-project-clip]');
  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute('loop', '');
  await expect(video).toHaveAttribute('muted', '');
  await expect(video).toHaveAttribute('playsinline', '');
});
