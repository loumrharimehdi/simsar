import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Hero } from '../components/Hero'

describe('Hero', () => {
    const renderHero = () => {
        return render(
            <BrowserRouter>
                <Hero />
            </BrowserRouter>
        )
    }

    it('should render main headline', () => {
        renderHero()
        expect(screen.getByText(/L'immobilier au Maroc/i)).toBeInTheDocument()
    })

    it('should render "en toute confiance" text', () => {
        renderHero()
        expect(screen.getByText(/en toute confiance/i)).toBeInTheDocument()
    })

    it('should render verified badge', () => {
        renderHero()
        expect(screen.getByText('Plateforme 100% Vérifiée')).toBeInTheDocument()
    })

    it('should have CTA link to listings', () => {
        renderHero()
        const ctaLink = screen.getByRole('link', { name: /voir les annonces/i })
        expect(ctaLink).toHaveAttribute('href', '/annonces')
    })

    it('should render "100% Vérifiées" stat', () => {
        renderHero()
        expect(screen.getByText('100% Vérifiées')).toBeInTheDocument()
    })
})
