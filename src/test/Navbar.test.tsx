import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

describe('Navbar', () => {
    const renderNavbar = () => {
        return render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        )
    }

    it('should render Simsar logo', () => {
        renderNavbar()
        expect(screen.getByText('Simsar')).toBeInTheDocument()
    })

    it('should render WhatsApp CTA button', () => {
        renderNavbar()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should have a link to home page', () => {
        renderNavbar()
        const homeLink = screen.getByRole('link', { name: /simsar/i })
        expect(homeLink).toHaveAttribute('href', '/')
    })
})
