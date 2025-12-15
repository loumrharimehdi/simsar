import { useEffect } from 'react'

interface SEOProps {
    title?: string
    description?: string
    keywords?: string
    ogImage?: string
    ogType?: 'website' | 'article'
}

const DEFAULT_TITLE = 'Simsar - Immobilier au Maroc en toute confiance'
const DEFAULT_DESCRIPTION = 'Fini les fausses annonces et les arnaques. Chaque vendeur et chaque bien est vérifié manuellement. Achat, location courte et longue durée au Maroc.'
const DEFAULT_KEYWORDS = 'immobilier, Maroc, annonces immobilières, achat, location, appartement, villa, maison, Casablanca, Rabat, Marrakech'

export function SEO({
    title,
    description = DEFAULT_DESCRIPTION,
    keywords = DEFAULT_KEYWORDS,
    ogImage = '/og-image.jpg',
    ogType = 'website'
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
    }, [fullTitle, description, keywords, ogImage, ogType])

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
