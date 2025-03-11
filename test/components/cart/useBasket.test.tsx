import { renderHook, act } from '@testing-library/react'
import BasketProvider from '@/components/cart/BasketProvider'
import { useBasket } from '@/components/cart'

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: '99.99',
  description: 'Test Description',
  sku: 'TEST123',
  image: '/test.jpg',
  createdAt: new Date()
}

describe('BasketProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('initializes with empty basket', () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: BasketProvider
    })
    
    expect(result.current.products).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
    expect(result.current.getTotalPrice()).toBe(0)
  })

  it('adds products to basket', () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: BasketProvider
    })

    act(() => {
      result.current.addProduct(mockProduct, 2)
    })

    expect(result.current.products).toHaveLength(1)
    expect(result.current.totalItems).toBe(2)
    expect(result.current.getTotalPrice()).toBe(199.98)
  })

  it('updates quantity of existing product', () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: BasketProvider
    })

    act(() => {
      result.current.addProduct(mockProduct, 1)
      result.current.updateQuantity(1, 3)
    })

    expect(result.current.totalItems).toBe(3)
    expect(result.current.products[0].quantity).toBe(3)
  })

  it('removes products from basket', () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: BasketProvider
    })

    act(() => {
      result.current.addProduct(mockProduct)
      result.current.removeProduct(1)
    })

    expect(result.current.products).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
  })

  it('handles remove unknown', () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: BasketProvider
    })

    act(() => {
      result.current.removeProduct(1)
    })

    expect(result.current.products).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
  })

  it('clears the entire basket', () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: BasketProvider
    })

    act(() => {
      result.current.addProduct(mockProduct)
      result.current.clearBasket()
    })

    expect(result.current.products).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
  })

  it('persists basket state in localStorage', () => {
    const { result } = renderHook(() => useBasket(), {
      wrapper: BasketProvider
    })

    act(() => {
      result.current.addProduct(mockProduct)
    })

    const savedBasket = JSON.parse(localStorage.getItem('basket') || '[]')
    expect(savedBasket).toHaveLength(1)
    expect(savedBasket[0].id).toBe(mockProduct.id)
  })

  it('loads basket state from localStorage', () => {
    localStorage.setItem('basket', JSON.stringify([{ ...mockProduct, quantity: 2 }]))

    const { result } = renderHook(() => useBasket(), {
      wrapper: BasketProvider
    })

    expect(result.current.products).toHaveLength(1)
    expect(result.current.totalItems).toBe(2)
  })
})
