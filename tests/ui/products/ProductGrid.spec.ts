import { test, expect } from '@playwright/test';

test.describe('Products Grid', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Test Product 1',
      description: 'Description 1',
      price: '29.99',
      sku: 'SKU001',
      image: '/test-image-1.jpg',
      createdAt: new Date()
    },
    {
      id: 2,
      name: 'Test Product 2',
      description: 'Description 2',
      price: '39.99',
      sku: 'SKU002',
      image: '/test-image-2.jpg',
      createdAt: new Date()
    }
  ];

  test('should navigate to product detail page when clicking a product', async ({ page }) => {
    // Navigate to products page
    await page.goto('/products');

    // Verify products are displayed
    await expect(page.getByText('Test Product 1')).toBeVisible();
    await expect(page.getByText('£29.99')).toBeVisible();

    // Click on the first product
    await page.getByRole('link', { name: /Test Product 1/i }).click();

    // Verify navigation to product detail page
    await expect(page).toHaveURL('/products/1');
  });

  test('should display correct product information in grid', async ({ page }) => {
    await page.goto('/products');

    // Check if all products are rendered
    const productCards = await page.getByRole('link').all();
    expect(productCards.length).toBe(mockProducts.length);

    // Verify first product details
    const firstProduct = mockProducts[0];
    await expect(page.getByText(firstProduct.name)).toBeVisible();
    await expect(page.getByText(firstProduct.sku)).toBeVisible();
    await expect(page.getByText(`£${firstProduct.price}`)).toBeVisible();
  });

  test('should have correct layout and styling', async ({ page }) => {
    await page.goto('/products');

    // Verify grid layout
    const grid = page.locator('.grid');
    await expect(grid).toHaveClass(/grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4/);

    // Verify product card hover effect
    const firstCard = page.locator('.card').first();
    await expect(firstCard).toHaveClass(/hover:shadow-lg/);
  });
});
