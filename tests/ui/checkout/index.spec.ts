import { test, expect } from '@playwright/test';

test.describe('Checkout Page', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Premium Widget',
      price: '25.99',
      quantity: 2,
      sku: 'WID-001'
    },
    {
      id: 2,
      name: 'Deluxe Gadget',
      price: '49.99',
      quantity: 1,
      sku: 'GAD-002'
    }
  ];

  test.beforeEach(async ({ page }) => {
    // Setup cart with mock products
    await page.evaluate((products) => {
      localStorage.setItem('basket', JSON.stringify(products));
    }, mockProducts);
    await page.goto('/checkout');
  });

  test('displays correct order summary with GBP prices', async ({ page }) => {
    // Check product prices
    await expect(page.getByText('£51.98')).toBeVisible(); // 2 x £25.99
    await expect(page.getByText('£49.99')).toBeVisible(); // 1 x £49.99

    // Verify total calculation
    const expectedTotal = '£101.97'; // (2 x £25.99) + (1 x £49.99)
    await expect(page.getByText(expectedTotal)).toBeVisible();
  });

  test('successfully submits valid shipping details', async ({ page }) => {
    // Fill in the form
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/address line 1/i).fill('123 Test Street');
    await page.getByLabel(/city/i).fill('London');
    await page.getByLabel(/postcode/i).fill('SW1A 1AA');

    // Submit form
    await page.getByRole('button', { name: /complete order/i }).click();

    // Verify redirect to order confirmation
    await expect(page).toHaveURL(/\/orders\/\d+/);
  });

  test('validates required fields', async ({ page }) => {
    // Submit empty form
    await page.getByRole('button', { name: /complete order/i }).click();

    // Check error messages
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/address is required/i)).toBeVisible();
    await expect(page.getByText(/city is required/i)).toBeVisible();
    await expect(page.getByText(/postcode is required/i)).toBeVisible();
  });

  test('validates email format', async ({ page }) => {
    // Fill invalid email
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByRole('button', { name: /complete order/i }).click();

    // Check error message
    await expect(page.getByText(/invalid email/i)).toBeVisible();
  });

  test('displays correct product quantities', async ({ page }) => {
    // Check product quantities in order summary
    await expect(page.getByText('Qty: 2')).toBeVisible();
    await expect(page.getByText('Qty: 1')).toBeVisible();
  });

  test('handles form submission state', async ({ page }) => {
    // Fill valid form
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/address line 1/i).fill('123 Test Street');
    await page.getByLabel(/city/i).fill('London');
    await page.getByLabel(/postcode/i).fill('SW1A 1AA');

    // Click submit and verify button state
    const submitButton = page.getByRole('button', { name: /complete order/i });
    await submitButton.click();
    await expect(submitButton).toBeDisabled();
    await expect(submitButton).toHaveText('Processing...');
  });
});
