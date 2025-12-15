import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { SEO } from '../components/SEO'

describe('SEO', () => {
    afterEach(() => {
        cleanup()
        // Reset document title
        document.title = ''
    })

    it('should set default title when no title prop is provided', () => {
        render(<SEO />)
        expect(document.title).toBe('Simsar - Immobilier au Maroc en toute confiance')
    })

    it('should set custom title with Simsar suffix', () => {
        render(<SEO title="Achat immobilier" />)
        expect(document.title).toBe('Achat immobilier | Simsar')
    })

    it('should set description meta tag', () => {
        const description = 'Test description'
        render(<SEO description={description} />)

        const metaDescription = document.querySelector('meta[name="description"]')
        expect(metaDescription?.getAttribute('content')).toBe(description)
    })

    it('should set Open Graph title', () => {
        render(<SEO title="Test Page" />)

        const ogTitle = document.querySelector('meta[property="og:title"]')
        expect(ogTitle?.getAttribute('content')).toBe('Test Page | Simsar')
    })

    it('should set Twitter card meta tags', () => {
        render(<SEO />)

        const twitterCard = document.querySelector('meta[name="twitter:card"]')
        expect(twitterCard?.getAttribute('content')).toBe('summary_large_image')
    })
})
