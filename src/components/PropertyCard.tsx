import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bed, Bath, Maximize, MapPin, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Property } from '../types/database'

interface PropertyCardProps {
    property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-MA', {
            style: 'decimal',
            maximumFractionDigits: 0,
        }).format(price)
    }

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'achat':
                return 'À vendre'
            case 'courte':
                return 'Location courte durée'
            case 'longue':
                return 'Location longue durée'
            default:
                return type
        }
    }

    const openWhatsApp = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const message = encodeURIComponent(
            `Bonjour, je suis intéressé(e) par votre bien: ${property.title} à ${property.city} (${formatPrice(property.price)} DH)`
        )
        window.open(`https://wa.me/${property.whatsapp_number}?text=${message}`, '_blank')
    }

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImageIndex((prev) =>
            prev === property.images.length - 1 ? 0 : prev + 1
        )
    }

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImageIndex((prev) =>
            prev === 0 ? property.images.length - 1 : prev - 1
        )
    }

    const hasImages = property.images && property.images.length > 0

    return (
        <Link
            to={`/annonces/${property.id}`}
            className="block bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-orange-200/40 hover:scale-[1.02] hover:border-[#FF6B35]/20 focus:shadow-2xl focus:shadow-orange-200/50 focus:scale-[1.02] focus:border-[#FF6B35]/40 focus:outline-none transition-all duration-300 ease-out group cursor-pointer border-2 border-transparent"
        >
            {/* Image Carousel */}
            <div className="relative h-48 bg-gray-100">
                {hasImages ? (
                    <>
                        <img
                            src={property.images[currentImageIndex]}
                            alt={property.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                        {property.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                                >
                                    <ChevronRight className="w-5 h-5 text-gray-700" />
                                </button>
                                {/* Dots indicator */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                    {property.images.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-4xl">🏠</span>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#FF6B35] text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {getTypeLabel(property.type)}
                    </span>
                    {property.verified && (
                        <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            Vérifié
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Price */}
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(property.price)}
                    </span>
                    <span className="text-gray-500 font-medium">DH</span>
                    {property.type !== 'achat' && (
                        <span className="text-gray-400 text-sm">/mois</span>
                    )}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                    {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{property.city}</span>
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                    {property.bedrooms && (
                        <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            <span>{property.bedrooms}</span>
                        </div>
                    )}
                    {property.bathrooms && (
                        <div className="flex items-center gap-1">
                            <Bath className="w-4 h-4" />
                            <span>{property.bathrooms}</span>
                        </div>
                    )}
                    {property.surface && (
                        <div className="flex items-center gap-1">
                            <Maximize className="w-4 h-4" />
                            <span>{property.surface} m²</span>
                        </div>
                    )}
                </div>

                {/* WhatsApp Button */}
                <button
                    onClick={openWhatsApp}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02]"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Contacter sur WhatsApp
                </button>
            </div>
        </Link>
    )
}
