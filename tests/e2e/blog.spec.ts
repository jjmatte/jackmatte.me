import { test, expect } from '@playwright/test';

test('blog index lists published posts and hides drafts', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.getByRole('heading', { name: 'Writing', level: 1 })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Thoughts on Becoming a Coder in an LLM World' })
  ).toHaveCount(1);
  await expect(
    page.getByRole('link', { name: 'Unpublished Draft Fixture' })
  ).toHaveCount(0);
});

test('blog post renders its title and body', async ({ page }) => {
  await page.goto('/blog/becoming-a-coder-in-an-llm-world');
  await expect(
    page.getByRole('heading', { name: 'Thoughts on Becoming a Coder in an LLM World', level: 1 })
  ).toBeVisible();
  await expect(page.getByText('The first time I used an LLM')).toBeVisible();
});
