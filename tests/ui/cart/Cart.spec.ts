import { test, expect } from '@playwright/test';

test.describe('Cart Page', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Test Product 1',
      price: '29.99',
      sku: 'SKU001',
      quantity: 2,
      image: '/test-image-1.jpg'
    },
    {
      id: 2,
      name: 'Test Product 2',
      price: '39.99',
      sku: 'SKU002',
      quantity: 1,
      image: '/test-image-2.jpg'
    }
  ];

  test('should proceed to checkout with items in cart', async ({ page }) => {
    // Set up cart state with mock products
    await page.evaluate((products) => {
      localStorage.setItem('basket', JSON.stringify(products));
    }, mockProducts);

    // Navigate to cart page
    await page.goto('/cart');

    // Verify cart items are displayed
    await expect(page.getByText('Test Product 1')).toBeVisible();
    await expect(page.getByText('Test Product 2')).toBeVisible();

    // Verify total price calculation
    const expectedTotal = mockProducts.reduce((sum, product) => 
      sum + (parseFloat(product.price) * product.quantity), 0);
    await expect(page.getByText(`£${expectedTotal.toFixed(2)}`)).toBeVisible();

    // Click proceed to checkout
    await page.getByRole('link', { name: /proceed to checkout/i }).click();

    // Verify navigation to checkout page
    await expect(page).toHaveURL('/checkout');
  });

  test('should update cart total when changing quantities', async ({ page }) => {
    await page.goto('/cart');

    // Increase quantity of first product
    const plusButton = page.locator('button', { has: page.locator('.h-4.w-4').first() });
    await plusButton.click();

    // Verify quantity update
    await expect(page.locator('.w-8.text-center').first()).toHaveText('3');

    // Verify total price updates
    const newExpectedTotal = (3 * 29.99) + (1 * 39.99);
    await expect(page.getByText(`£${newExpectedTotal.toFixed(2)}`)).toBeVisible();
  });

  test('should show empty cart state when no items', async ({ page }) => {
    // Clear cart
    await page.evaluate(() => localStorage.removeItem('cart'));
    await page.goto('/cart');

    // Verify empty cart message
    await expect(page.getByText('Your cart is empty')).toBeVisible();
    await expect(page.getByRole('link', { name: /continue shopping/i })).toBeVisible();
    
    // Verify checkout button is not present
    await expect(page.getByRole('link', { name: /proceed to checkout/i })).not.toBeVisible();
  });

  test('should remove items from cart', async ({ page }) => {
    await page.goto('/cart');

    // Click remove button for first product
    const removeButton = page.locator('button[class*="text-destructive"]').first();
    await removeButton.click();

    // Verify product is removed
    await expect(page.getByText('Test Product 1')).not.toBeVisible();
    
    // Verify total price updates
    await expect(page.getByText('£39.99')).toBeVisible();
  });
});
