import { test, expect } from '@playwright/test';

test('nav links are present on the home page', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation');
  await expect(nav.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  await expect(nav.getByRole('link', { name: 'Writing' })).toHaveAttribute('href', '/blog');
  await expect(nav.getByRole('link', { name: 'About' })).toHaveCount(0);
});

test('home has a skip link and a main landmark', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a.skip-link')).toHaveAttribute('href', '#main');
  await expect(page.locator('main#main')).toBeVisible();
});

test('active nav link is marked with aria-current', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation');
  await expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  await expect(nav.getByRole('link', { name: 'Projects' })).not.toHaveAttribute('aria-current', 'page');
});
