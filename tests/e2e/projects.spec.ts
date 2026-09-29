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

test('a project with a clip renders a looping muted video', async ({ page }) => {
  await page.goto('/projects/example-alpha');
  const video = page.locator('video[data-project-clip]');
  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute('loop', '');
  await expect(video).toHaveAttribute('muted', '');
  await expect(video).toHaveAttribute('playsinline', '');
});

test('a project without a clip renders no video', async ({ page }) => {
  await page.goto('/projects/example-beta');
  await expect(page.locator('video')).toHaveCount(0);
});
