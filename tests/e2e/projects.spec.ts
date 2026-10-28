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

test('project cards show a thumbnail that links to the detail page', async ({ page }) => {
  await page.goto('/projects');
  const thumb = page.locator('a.thumb').first();
  await expect(thumb).toBeVisible();
  await thumb.click();
  await expect(page).toHaveURL(/\/projects\/[a-z]+$/);
});

test('the Net Worth Tracker project is listed and its detail renders a screenshot', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.getByRole('link', { name: 'Net Worth Tracker' })).toBeVisible();

  await page.goto('/projects/networth');
  await expect(page.getByRole('heading', { name: 'Net Worth Tracker', level: 1 })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Net Worth Tracker screenshot' })).toBeVisible();
  await expect(page.locator('video[data-project-clip]')).toHaveCount(0);
});

test('the website project is listed and its detail links to the source repo', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.getByRole('link', { name: 'This Website' })).toBeVisible();

  await page.goto('/projects/website');
  await expect(page.getByRole('heading', { name: 'This Website', level: 1 })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Source' }).first()
  ).toHaveAttribute('href', 'https://github.com/jjmatte/jackmatte.me');
  // No media for this entry.
  await expect(page.locator('video[data-project-clip]')).toHaveCount(0);
  await expect(page.locator('img.screenshot')).toHaveCount(0);
});
