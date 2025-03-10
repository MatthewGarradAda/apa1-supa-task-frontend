import { cn, formatCurrency } from '../../src/lib/utils'

describe('cn (className utility)', () => {
  it('should merge className strings correctly', () => {
    const result = cn('text-red-500', 'bg-blue-300')
    expect(result).toBe('text-red-500 bg-blue-300')
  })

  it('should handle conditional classes', () => {
    const result = cn('base-class', {
      'active-class': true,
      'inactive-class': false
    })
    expect(result).toBe('base-class active-class')
  })

  it('should merge tailwind classes efficiently', () => {
    const result = cn('px-2 py-1', 'px-4', 'hover:px-6')
    expect(result).toBe('py-1 px-4 hover:px-6')
  })

  it('should handle array inputs', () => {
    const result = cn(['text-sm', 'font-bold'], 'text-center')
    expect(result).toBe('text-sm font-bold text-center')
  })
})

describe('formatCurrency', () => {
  it('should format whole numbers correctly', () => {
    const result = formatCurrency(1000)
    expect(result).toBe('£1,000.00')
  })

  it('should format decimal numbers correctly', () => {
    const result = formatCurrency(1000.50)
    expect(result).toBe('£1,000.50')
  })

  it('should format small numbers correctly', () => {
    const result = formatCurrency(0.99)
    expect(result).toBe('£0.99')
  })

  it('should format zero correctly', () => {
    const result = formatCurrency(0)
    expect(result).toBe('£0.00')
  })

  it('should format large numbers correctly', () => {
    const result = formatCurrency(1000000)
    expect(result).toBe('£1,000,000.00')
  })
})
