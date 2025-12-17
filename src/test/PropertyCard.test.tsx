import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { PropertyCard } from '../components/PropertyCard'
import type { Property } from '../types/database'

const mockProperty: Property = {
    id: '1',
    title: 'Appartement moderne à Casablanca',
    description: 'Bel appartement avec vue sur mer',
    price: 1500000,
    type: 'achat',
    city: 'Casablanca',
    bedrooms: 3,
    bathrooms: 2,
    surface: 120,
    images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    whatsapp_number: '212644662605',
    verified: true,
    professional_id: null,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z'
}

const renderPropertyCard = (property: Property = mockProperty) => {
    return render(
        <BrowserRouter>
            <PropertyCard property={property} />
        </BrowserRouter>
    )
}

describe('PropertyCard', () => {
    it('should render property title', () => {
        renderPropertyCard()
        expect(screen.getByText('Appartement moderne à Casablanca')).toBeInTheDocument()
    })

    it('should render property price formatted correctly', () => {
        renderPropertyCard()
        // Price should be formatted as "1 500 000"
        expect(screen.getByText(/1.*500.*000/)).toBeInTheDocument()
    })

    it('should render property city', () => {
        renderPropertyCard()
        expect(screen.getByText('Casablanca')).toBeInTheDocument()
    })

    it('should render verified badge when property is verified', () => {
        renderPropertyCard()
        expect(screen.getByText('Vérifié')).toBeInTheDocument()
    })

    it('should render WhatsApp contact button', () => {
        renderPropertyCard()
        expect(screen.getByText('Contacter sur WhatsApp')).toBeInTheDocument()
    })

    it('should show "À vendre" label for achat type', () => {
        renderPropertyCard()
        expect(screen.getByText('À vendre')).toBeInTheDocument()
    })

    it('should show "/mois" suffix for rental properties', () => {
        const rentalProperty: Property = {
            ...mockProperty,
            type: 'longue',
            price: 8500
        }
        renderPropertyCard(rentalProperty)
        expect(screen.getByText('/mois')).toBeInTheDocument()
    })

    it('should render bedrooms count', () => {
        renderPropertyCard()
        expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('should render surface area', () => {
        renderPropertyCard()
        expect(screen.getByText('120 m²')).toBeInTheDocument()
    })
})
