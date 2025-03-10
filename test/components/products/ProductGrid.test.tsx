import { render, screen } from '@testing-library/react'
import { ProductsGrid } from '@/components/products/ProductGrid'
import { vi } from 'vitest'

// Mock the next/image component
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />
}))

// Mock the next/link component
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
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

describe('ProductsGrid', () => {
  it('renders the products grid with correct content', () => {
    render(<ProductsGrid products={mockProducts} />)
    
    // Check if the main heading is present
    expect(screen.getByText('Products')).toBeInTheDocument()
    
    // Check if product details are rendered
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('SKU: TEST123')).toBeInTheDocument()
    
    // Check if the price is formatted and displayed
    expect(screen.getByText('£99.99')).toBeInTheDocument()
    
    // Check if the link is present with correct href
    const productLink = screen.getByRole('link')
    expect(productLink).toHaveAttribute('href', '/products/1')
  })

  it('renders empty grid when no products are provided', () => {
    render(<ProductsGrid products={[]} />)
    
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
