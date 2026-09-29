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

// A project without a clip falls back to no video. The clip-renders-video branch
// is temporarily uncovered (no project ships a clip yet); restore it when Lots
// gets its real recording.
test('a project without a clip renders no video', async ({ page }) => {
  await page.goto('/projects/lots');
  await expect(page.locator('video')).toHaveCount(0);
});
