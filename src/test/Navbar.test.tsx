import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

// Mock AuthContext
vi.mock('../contexts/AuthContext', () => ({
    useAuth: () => ({
        user: null,
        loading: false,
        session: null,
        signIn: vi.fn(),
        signUp: vi.fn(),
        signOut: vi.fn(),
    })
}))

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

    it('should render Espace Pro button when not logged in', () => {
        renderNavbar()
        expect(screen.getByText('Espace Pro')).toBeInTheDocument()
    })

    it('should have a link to home page', () => {
        renderNavbar()
        const homeLink = screen.getByRole('link', { name: /simsar/i })
        expect(homeLink).toHaveAttribute('href', '/')
    })
})
