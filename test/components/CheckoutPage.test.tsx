import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutPage from '@/components/checkout/CheckoutPage'
import { vi } from 'vitest'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

// Mock createOrder action
vi.mock('@/actions', () => ({
  createOrder: vi.fn(() => Promise.resolve('123'))
}))

const mockProducts = [
  {
    id: 1,
    name: 'Test Product',
    price: '99.99',
    description: '',
    quantity: 2,
    sku: 'TEST123',
    image: '/test.jpg',
    createdAt: new Date()
  }
]

const mockProps = {
  products: mockProducts,
  clearBasket: vi.fn(),
  getTotalPrice: vi.fn(() => 199.98)
}

describe('CheckoutPage', () => {
  it('renders shipping form and order summary', () => {
    render(<CheckoutPage {...mockProps} />)
    
    // Form elements
    expect(screen.getByText('Shipping Details')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Address Line 1')).toBeInTheDocument()
    expect(screen.getByLabelText('City')).toBeInTheDocument()
    expect(screen.getByLabelText('Postcode')).toBeInTheDocument()
    
    // Order summary
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Qty: 2')).toBeInTheDocument()
    expect(screen.getByTestId(`order-price-1`)).toHaveTextContent("£199.98")
  })

  it('handles form submission successfully', async () => {
    render(<CheckoutPage {...mockProps} />)
    
    // Fill out form
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
    await userEvent.type(screen.getByLabelText('Address Line 1'), '123 Test St')
    await userEvent.type(screen.getByLabelText('City'), 'Test City')
    await userEvent.type(screen.getByLabelText('Postcode'), 'TE1 1ST')
    
    // Submit form
    await userEvent.click(screen.getByRole('button', { name: /complete order/i }))
    
    // Verify submission
    await waitFor(() => {
      expect(mockProps.clearBasket).toHaveBeenCalled()
    })
  })

  it('displays validation errors for required fields', async () => {
    render(<CheckoutPage {...mockProps} />)
    
    // Submit empty form
    await userEvent.click(screen.getByRole('button', { name: /complete order/i }))
    
    // Check for validation messages
    expect(await screen.findByText('Address is required')).toBeInTheDocument()
    expect(await screen.findByText('City is required')).toBeInTheDocument()
    expect(await screen.findByText('Postcode is required')).toBeInTheDocument()
  })
})
