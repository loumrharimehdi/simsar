import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useProperties } from '../hooks/useProperties'

const mockData = [
    {
        id: '1',
        title: 'Appartement à Casablanca',
        description: 'Bel appartement',
        price: 1200000,
        type: 'achat',
        city: 'Casablanca',
        bedrooms: 3,
        bathrooms: 2,
        surface: 120,
        images: ['https://example.com/image.jpg'],
        whatsapp_number: '212644662605',
        verified: true,
        professional_id: null,
        status: 'active',
        created_at: '2024-01-01T00:00:00Z'
    }
]

// Mock Supabase with full chain including .range()
vi.mock('../lib/supabase', () => ({
    supabase: {
        from: vi.fn(() => ({
            select: vi.fn(() => ({
                order: vi.fn(() => ({
                    range: vi.fn(() => ({
                        eq: vi.fn(() => ({
                            ilike: vi.fn(() => Promise.resolve({ data: mockData, error: null }))
                        })),
                        ilike: vi.fn(() => Promise.resolve({ data: mockData, error: null })),
                        then: (cb: (result: { data: typeof mockData; error: null }) => void) =>
                            Promise.resolve({ data: mockData, error: null }).then(cb)
                    }))
                }))
            }))
        }))
    }
}))

describe('useProperties', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should initialize with loading state', () => {
        const { result } = renderHook(() => useProperties())

        expect(result.current.loading).toBe(true)
        expect(result.current.properties).toEqual([])
        expect(result.current.error).toBe(null)
    })

    it('should return hasMore and loadMore functions', () => {
        const { result } = renderHook(() => useProperties({ type: 'achat' }))

        expect(typeof result.current.loadMore).toBe('function')
        expect(typeof result.current.hasMore).toBe('boolean')
    })

    it('should have loadingMore state', () => {
        const { result } = renderHook(() => useProperties())

        expect(result.current.loadingMore).toBe(false)
    })
})
