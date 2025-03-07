import { test, expect } from '@playwright/test';

test.describe('Product Details Page', () => {
  test('should add product to cart with selected quantity', async ({ page }) => {
    // Navigate to product page
    await page.goto(`/products/1`);

    // Verify initial product details are displayed
    await expect(page.getByTestId("name")).toBeVisible();
    await expect(page.getByTestId("price")).toBeVisible();
    await expect(page.getByTestId("sku")).toBeVisible();

    // Open quantity selector
    await page.getByRole('combobox').click();

    // Select quantity of 3
    await page.getByRole('option', { name: '3' }).click();

    // Verify quantity is selected
    await expect(page.getByRole('combobox')).toHaveValue('3');

    // Click add to cart button
    await page.getByTestId("add-to-cart-button").click();

    // Verify cart state (assuming you have a cart indicator)
    await expect(page.getByTestId('cart-count')).toHaveText('3');
  });

  test('should handle quantity selection limits', async ({ page }) => {
    await page.goto(`/products/1`);

    // Open quantity selector
    await page.getByRole('combobox').click();

    // Verify max quantity is 10
    const options = await page.getByRole('option').all();
    expect(options.length).toBe(10);

    // Verify first and last options
    await expect(options[0]).toHaveText('1');
    await expect(options[9]).toHaveText('10');
  });

  test('should display product images correctly', async ({ page }) => {
    await page.goto(`/products/1`);

    // Check if product image is visible
    const productImage = page.getByTestId("product-image")
    await expect(productImage).toBeVisible();
  });

  test('should display product details section', async ({ page }) => {
    await page.goto(`/products/1`);

    // Verify shipping and return policy information
    await expect(page.getByText('Free shipping')).toBeVisible();
    await expect(page.getByText('30-day return policy')).toBeVisible();
    await expect(page.getByText('24/7 customer support')).toBeVisible();
  });
});
