import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Bed, Bath, Maximize, MapPin, ShieldCheck, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { SEO } from '../components/SEO'
import { supabase } from '../lib/supabase'
import type { Property } from '../types/database'

export function PropertyDetailPage() {
    const { id } = useParams<{ id: string }>()
    const [property, setProperty] = useState<Property | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)

    useEffect(() => {
        async function fetchProperty() {
            if (!id) return

            setLoading(true)
            const { data, error: fetchError } = await supabase
                .from('properties')
                .select('*')
                .eq('id', id)
                .single()

            if (fetchError) {
                setError(fetchError.message)
            } else {
                setProperty(data)
            }
            setLoading(false)
        }

        fetchProperty()
    }, [id])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-MA', {
            style: 'decimal',
            maximumFractionDigits: 0,
        }).format(price)
    }

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'achat': return 'À vendre'
            case 'courte': return 'Location courte durée'
            case 'longue': return 'Location longue durée'
            default: return type
        }
    }

    const openWhatsApp = () => {
        if (!property) return
        const message = encodeURIComponent(
            `Bonjour, je suis intéressé(e) par votre bien: ${property.title} à ${property.city} (${formatPrice(property.price)} DH)`
        )
        window.open(`https://wa.me/${property.whatsapp_number}?text=${message}`, '_blank')
    }

    const nextImage = () => {
        if (!property) return
        setCurrentImageIndex((prev) => prev === property.images.length - 1 ? 0 : prev + 1)
    }

    const prevImage = () => {
        if (!property) return
        setCurrentImageIndex((prev) => prev === 0 ? property.images.length - 1 : prev - 1)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8F0] to-[#FFF5EB]">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="relative">
                        <div className="w-14 h-14 border-4 border-gray-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-14 h-14 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !property) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8F0] to-[#FFF5EB]">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">❌</span>
                        </div>
                        <p className="text-red-500 mb-4">{error || 'Annonce non trouvée'}</p>
                        <Link to="/annonces" className="text-[#FF6B35] hover:underline font-medium">
                            ← Retour aux annonces
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8F0] to-[#FFF5EB]">
            <SEO
                title={property.title}
                description={`${getTypeLabel(property.type)} - ${property.title} à ${property.city}. ${formatPrice(property.price)} DH. ${property.bedrooms || ''} chambres, ${property.surface || ''} m².`}
            />
            <Navbar />

            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    {/* Back button */}
                    <Link
                        to="/annonces"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF6B35] mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Retour aux annonces
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div
                                className="relative h-80 md:h-96 bg-gray-100 rounded-3xl overflow-hidden cursor-pointer group"
                                onClick={() => setIsGalleryOpen(true)}
                            >
                                {property.images.length > 0 ? (
                                    <>
                                        <img
                                            src={property.images[currentImageIndex]}
                                            alt={property.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        {property.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); prevImage() }}
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                                >
                                                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); nextImage() }}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                                >
                                                    <ChevronRight className="w-6 h-6 text-gray-700" />
                                                </button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <span className="text-6xl">🏠</span>
                                    </div>
                                )}

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-[#FF6B35] text-white text-sm font-medium px-3 py-1.5 rounded-full">
                                        {getTypeLabel(property.type)}
                                    </span>
                                    {property.verified && (
                                        <span className="bg-green-500 text-white text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
                                            <ShieldCheck className="w-4 h-4" />
                                            Vérifié
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            {property.images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {property.images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${index === currentImageIndex
                                                    ? 'border-[#FF6B35] scale-105'
                                                    : 'border-transparent opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Property Info */}
                        <div className="space-y-6">
                            {/* Price */}
                            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-xl">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-4xl font-bold text-gray-900">
                                        {formatPrice(property.price)}
                                    </span>
                                    <span className="text-xl text-gray-500 font-medium">DH</span>
                                    {property.type !== 'achat' && (
                                        <span className="text-gray-400">/mois</span>
                                    )}
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    {property.title}
                                </h1>
                                <div className="flex items-center gap-1 text-gray-500">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-lg">{property.city}</span>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-xl">
                                <h2 className="font-bold text-lg text-gray-900 mb-4">Caractéristiques</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    {property.bedrooms && (
                                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                            <Bed className="w-6 h-6 text-[#FF6B35] mx-auto mb-2" />
                                            <div className="font-bold text-gray-900">{property.bedrooms}</div>
                                            <div className="text-sm text-gray-500">Chambres</div>
                                        </div>
                                    )}
                                    {property.bathrooms && (
                                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                            <Bath className="w-6 h-6 text-[#FF6B35] mx-auto mb-2" />
                                            <div className="font-bold text-gray-900">{property.bathrooms}</div>
                                            <div className="text-sm text-gray-500">Salles de bain</div>
                                        </div>
                                    )}
                                    {property.surface && (
                                        <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                            <Maximize className="w-6 h-6 text-[#FF6B35] mx-auto mb-2" />
                                            <div className="font-bold text-gray-900">{property.surface}</div>
                                            <div className="text-sm text-gray-500">m²</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            {property.description && (
                                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-xl">
                                    <h2 className="font-bold text-lg text-gray-900 mb-3">Description</h2>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                        {property.description}
                                    </p>
                                </div>
                            )}

                            {/* WhatsApp CTA */}
                            <button
                                onClick={openWhatsApp}
                                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-green-200"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Contacter sur WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            {/* Fullscreen Gallery Modal */}
            {isGalleryOpen && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
                    <button
                        onClick={() => setIsGalleryOpen(false)}
                        className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                        <ChevronLeft className="w-8 h-8 text-white" />
                    </button>

                    <img
                        src={property.images[currentImageIndex]}
                        alt={property.title}
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                    />

                    <button
                        onClick={nextImage}
                        className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                        <ChevronRight className="w-8 h-8 text-white" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {property.images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
