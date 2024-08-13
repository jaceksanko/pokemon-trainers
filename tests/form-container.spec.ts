import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
});

test('filling in the fields and sending should result in success', async ({ page }) => {
  await page.getByPlaceholder("Trainer's name").click();
  await page.getByPlaceholder("Trainer's name").fill('Name');
  await page.getByPlaceholder("Trainer's age").click();
  await page.getByPlaceholder("Trainer's age").fill('22');
  await page.getByPlaceholder('Choose').click();
  await page.getByRole('option', { name: 'bulbasaur' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForSelector('button:has-text("Reset form")', { timeout: 60000 });
  await page.getByRole('button', { name: 'Reset form' }).click();
});

test('filling in the fields and clicking Reset should clear the form', async ({ page }) => {
  await page.getByPlaceholder("Trainer's name").click();
  await page.getByPlaceholder("Trainer's name").fill('Name');
  await page.getByPlaceholder("Trainer's age").click();
  await page.getByPlaceholder("Trainer's age").fill('22');
  await page.getByPlaceholder('Choose').click();
  await page.getByRole('option', { name: 'charmander' }).click();

  const nameValue = await page.getByPlaceholder("Trainer's name").inputValue();
  expect(nameValue).toBe('Name');
  const ageValue = await page.getByPlaceholder("Trainer's age").inputValue();
  expect(ageValue).toBe('22');
  const selectedOption = await page.getByPlaceholder('Choose').inputValue();
  expect(selectedOption).toBe('charmander');

  await page.waitForSelector('button:has-text("Reset")');
  await page.getByRole('button', { name: 'Reset' }).click();

  const nameValueEmpty = await page.getByPlaceholder("Trainer's name").inputValue();
  expect(nameValueEmpty).toBe('');
  const ageValueEmpty = await page.getByPlaceholder("Trainer's age").inputValue();
  expect(ageValueEmpty).toBe('');
  const selectedOptionEmpty = await page.getByPlaceholder('Choose').inputValue();
  expect(selectedOptionEmpty).toBe('');
});

test('clicking on Submit with an unfilled form should display an error message', async ({ page }) => {
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByTestId('trainerName')).toContainText('This field cannot be empty');
  await expect(page.getByTestId('pokemonData')).toContainText('This field cannot be empty');
});

test('after selecting a Pokemon, its photo and information about it should be displayed.', async ({ page }) => {
  await page.getByPlaceholder('Choose').click();
  await page.getByRole('option', { name: 'pikachu' }).click();
  await expect(page.getByRole('img', { name: 'Pokemon image' })).toBeVisible();
  await expect(page.locator('section')).toContainText('Name: pikachu');
  await expect(page.locator('section')).toContainText('Type: electric');
  await expect(page.locator('section')).toContainText('Base experience: 112');
  await expect(page.locator('section')).toContainText('Id: 25');
});
