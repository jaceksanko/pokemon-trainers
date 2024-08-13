import { test, expect } from '@playwright/test';
import moment from 'moment';

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
});

test('date should be visible', async ({ page }) => {
  await expect(page.getByTestId('current-date')).toBeVisible();
});

test('should display the current date in correct format', async ({ page }) => {
  const currentDateElement = page.getByTestId('current-date');
  const currentDateText = await currentDateElement.textContent();

  const format = 'dddd, DD.MM.YYYY';
  const isValid = moment(currentDateText, format, true).isValid();

  await expect(isValid).toBe(true);
});
