import { useEffect } from 'react'

interface SEOProps {
    title?: string
    description?: string
    keywords?: string
    ogImage?: string
    ogType?: 'website' | 'article'
    schemaType?: 'RealEstateAgent' | 'Product' | 'WebPage'
    propertyData?: {
        name: string
        price: number
        city: string
        description?: string
        image?: string
    }
}

const DEFAULT_TITLE = 'Simsar - Immobilier au Maroc en toute confiance'
const DEFAULT_DESCRIPTION = 'Fini les fausses annonces et les arnaques. Chaque vendeur et chaque bien est vérifié manuellement. Achat, location courte et longue durée au Maroc.'
const DEFAULT_KEYWORDS = 'immobilier, Maroc, annonces immobilières, achat, location, appartement, villa, maison, Casablanca, Rabat, Marrakech'

const SCHEMA_REAL_ESTATE_AGENT = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Simsar',
    description: DEFAULT_DESCRIPTION,
    url: 'https://simsar.ma',
    logo: 'https://simsar.ma/favicon.svg',
    address: {
        '@type': 'PostalAddress',
        addressCountry: 'MA',
        addressLocality: 'Maroc',
    },
    areaServed: {
        '@type': 'Country',
        name: 'Morocco',
    },
    sameAs: ['https://wa.me/212644662605'],
}

export function SEO({
    title,
    description = DEFAULT_DESCRIPTION,
    keywords = DEFAULT_KEYWORDS,
    ogImage = '/og-image.jpg',
    ogType = 'website',
    schemaType = 'RealEstateAgent',
    propertyData,
}: SEOProps) {
    const fullTitle = title ? `${title} | Simsar` : DEFAULT_TITLE

    useEffect(() => {
        // Update document title
        document.title = fullTitle

        // Update or create meta tags
        updateMetaTag('description', description)
        updateMetaTag('keywords', keywords)

        // Open Graph tags
        updateMetaTag('og:title', fullTitle, 'property')
        updateMetaTag('og:description', description, 'property')
        updateMetaTag('og:image', ogImage, 'property')
        updateMetaTag('og:type', ogType, 'property')
        updateMetaTag('og:site_name', 'Simsar', 'property')
        updateMetaTag('og:locale', 'fr_MA', 'property')

        // Twitter Card tags
        updateMetaTag('twitter:card', 'summary_large_image')
        updateMetaTag('twitter:title', fullTitle)
        updateMetaTag('twitter:description', description)
        updateMetaTag('twitter:image', ogImage)

        // Schema.org JSON-LD
        let schemaData
        if (propertyData) {
            schemaData = {
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: propertyData.name,
                description: propertyData.description || `Bien immobilier à ${propertyData.city}`,
                image: propertyData.image,
                offers: {
                    '@type': 'Offer',
                    priceCurrency: 'MAD',
                    price: propertyData.price,
                    availability: 'https://schema.org/InStock',
                },
                brand: {
                    '@type': 'Brand',
                    name: 'Simsar',
                },
            }
        } else {
            schemaData = SCHEMA_REAL_ESTATE_AGENT
        }

        updateJsonLd(schemaData)
    }, [fullTitle, description, keywords, ogImage, ogType, schemaType, propertyData])

    return null
}

function updateMetaTag(name: string, content: string, attr: 'name' | 'property' = 'name') {
    let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement

    if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, name)
        document.head.appendChild(element)
    }

    element.content = content
}

function updateJsonLd(data: object) {
    const id = 'simsar-schema-jsonld'
    let script = document.getElementById(id) as HTMLScriptElement

    if (!script) {
        script = document.createElement('script')
        script.id = id
        script.type = 'application/ld+json'
        document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(data)
}

