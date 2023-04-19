// @ts-check
const { test, expect } = require('@playwright/test');

test('has all text', async ({ page }) => {
  //navigate to local URL. In a real project it would be best to use a variable for the url
  await page.goto('http://localhost:4200/dashboard');

  //verify the elements are visible with the right text. 
  //In a real project, best to abstract these element selectors 
  //into a page object to make them reusable and easier to manage
  await expect(page.getByRole('link', { name: 'Dashboard'})).toBeVisible();
  await expect(page.getByRole('link', { name: 'Heroes'})).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Tour of Heroes' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Top Heroes' })).toBeVisible();
  await expect(page.getByLabel('Hero Search')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Messages' })).toBeVisible();

  await expect(page.getByRole('link', { name: 'Bombasto'})).toBeVisible();
  await expect(page.getByRole('link', { name: 'Celeritas'})).toBeVisible();
  await expect(page.getByRole('link', { name: 'Magneta'})).toBeVisible();
  await expect(page.getByRole('link', { name: 'RubberMan'})).toBeVisible();

  await expect(page.getByRole('button', { name: 'Clear messages'})).toBeVisible();
});

test('check Bomasto hero page and edit', async ({ page }) => {
  await page.goto('http://localhost:4200/dashboard');

  //navigate to the Bombasto hero page via clicking on the Bombasto button
  await page.getByRole('link', { name: 'Bombasto'}).click();
  
  //verify elements are on page as expected
  await expect(page.getByRole('heading', { name: 'Tour of Heroes' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Dashboard'})).toBeVisible();
  await expect(page.getByRole('link', { name: 'Heroes'})).toBeVisible();
  await expect(page.getByRole('heading', { name: 'BOMBASTO Details'})).toBeVisible();
  await expect(page.getByLabel('Hero name:')).toBeVisible();

  await expect(page.getByRole('button', { name: 'go back'})).toBeVisible();
  await expect(page.getByRole('button', { name: 'save'})).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Messages'})).toBeVisible();

  //update the hero name and click save
  await page.getByRole('textbox').fill('NewHero');
  await page.getByRole('button', { name: 'save'}).click();

  //verify the name has changed on original dashboard page
  await expect(page.getByRole('link', { name: 'NewHero'})).toBeVisible();
});
