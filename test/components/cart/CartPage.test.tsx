import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartPage from '@/components/cart/CartPage'
import { vi } from 'vitest'

// Mock next/image and next/link
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>
}))

const mockProducts = [
  {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: '99.99',
    sku: 'TEST123',
    image: '/test-image.jpg',
    quantity: 2,
    createdAt: new Date()
  }
]

const mockProps = {
  products: mockProducts,
  removeProduct: vi.fn(),
  updateQuantity: vi.fn(),
  getTotalPrice: vi.fn(() => 199.98)
}

describe('CartPage', () => {
  it('renders empty cart state correctly', () => {
    render(<CartPage {...mockProps} products={[]} />)
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument()
  })

  it('renders cart with products correctly', () => {
    render(<CartPage {...mockProps} />)
    
    expect(screen.getByText('Your Cart')).toBeInTheDocument()
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('SKU: TEST123')).toBeInTheDocument()
    expect(screen.getByText('£99.99')).toBeInTheDocument()
  })

  it('displays correct quantity controls', () => {
    render(<CartPage {...mockProps} />)
    
    expect(screen.getByText('2')).toBeInTheDocument()
    // const [decreaseButton, increaseButton] = screen.getAllByRole('button', { name: '' })
    const increaseButton = screen.getByTestId("qty-asc")
    const decreaseButton = screen.getByTestId("qty-dec")
    expect(decreaseButton).toBeInTheDocument()
    expect(increaseButton).toBeInTheDocument()
  })

  it('handles quantity updates correctly', async () => {
    render(<CartPage {...mockProps} />)
    
    // const [decreaseButton, increaseButton] = screen.getAllByRole('button', { name: '' })
    const increaseButton = screen.getByTestId("qty-asc")
    const decreaseButton = screen.getByTestId("qty-dec")
    await userEvent.click(increaseButton)
    expect(mockProps.updateQuantity).toHaveBeenCalledWith(1, 3)
    
    await userEvent.click(decreaseButton)
    expect(mockProps.updateQuantity).toHaveBeenCalledWith(1, 1)
  })

  it('handles product removal', async () => {
    render(<CartPage {...mockProps} />)
    
    // const removeButton = screen.getAllByRole('button', { name: '' })
    const removeButton = screen.getByTestId("rm")
    await userEvent.click(removeButton)
    expect(mockProps.removeProduct).toHaveBeenCalledWith(1)
  })

  it('displays order summary correctly', () => {
    render(<CartPage {...mockProps} />)
    
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
    expect(screen.getByText('Subtotal')).toBeInTheDocument()
    expect(screen.getByText('Shipping')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
  })

  it('shows checkout button', () => {
    render(<CartPage {...mockProps} />)
    
    const checkoutButton = screen.getByRole('link', { name: /proceed to checkout/i })
    expect(checkoutButton).toBeInTheDocument()
    expect(checkoutButton).toHaveAttribute('href', '/checkout')
  })
})
