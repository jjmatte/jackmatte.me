import { test, expect } from '@playwright/test';

test('the sword dial renders and tracks the cursor bearing', async ({ page }) => {
  await page.goto('/');
  const dial = page.locator('.sword-dial');
  await expect(dial).toBeAttached();

  // Default angle before any mouse movement.
  const read = () => dial.evaluate((el) => getComputedStyle(el).getPropertyValue('--sword-angle').trim());
  expect(await read()).toBe('0deg');

  // Move the cursor to the bottom-right of a 1280x720 viewport (center 640,360):
  // atan2(240, 160) + 90deg ≈ 146deg, so the angle must change from the default.
  await page.mouse.move(800, 600);
  await expect.poll(read).not.toBe('0deg');
});
