import { render, screen } from '@testing-library/react'
import { ProductDetails } from '@/components/products/ProductDetails'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

// Mock the next/image component
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />
}))

const addProductMock = vi.fn()

vi.mock('@/components/cart', () => ({
    useBasket: () => ({
      addProduct: addProductMock
    })
  }))

const mockProduct = {
  id: 1,
  name: 'Test Product',
  description: 'A fantastic test product description',
  image: '/test-image.jpg',
  price: '199.99',
  sku: 'TEST123',
  createdAt: new Date()
}

describe('ProductDetails', () => {
  it('renders all product information correctly', () => {
    render(<ProductDetails product={mockProduct} />)
    
    // Check main product details
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('£199.99')).toBeInTheDocument()
    expect(screen.getByText('A fantastic test product description')).toBeInTheDocument()
    expect(screen.getByText('SKU: TEST123')).toBeInTheDocument()
  })

  it('displays quantity selector with correct options', () => {
    render(<ProductDetails product={mockProduct} />)
    
    expect(screen.getByText('Quantity')).toBeInTheDocument()
    const quantitySelector = screen.getByRole('combobox')
    expect(quantitySelector).toBeInTheDocument()
  })

  it('shows add to cart button with correct text and icon', () => {
    render(<ProductDetails product={mockProduct} />)
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    expect(addToCartButton).toBeInTheDocument()
    expect(addToCartButton).toHaveClass('w-full')
  })

  it('displays additional product details section', () => {
    render(<ProductDetails product={mockProduct} />)
    
    expect(screen.getByText('Product Details')).toBeInTheDocument()
    expect(screen.getByText('Free shipping')).toBeInTheDocument()
    expect(screen.getByText('30-day return policy')).toBeInTheDocument()
    expect(screen.getByText('24/7 customer support')).toBeInTheDocument()
  })

  it('renders product image correctly', () => {
    render(<ProductDetails product={mockProduct} />)
    
    const imageContainer = screen.getByRole('img')
    expect(imageContainer).toBeInTheDocument()
  })
})

// Add this new test
it('calls addProduct when add to cart button is clicked', async () => {
    render(<ProductDetails product={mockProduct} />)
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    await userEvent.click(addToCartButton)
    
    expect(addProductMock).toHaveBeenCalledWith(mockProduct, 1)
})