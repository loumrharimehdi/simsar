import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Home as HomeIcon, Palmtree, Building2, Sparkles } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { PropertyCard } from '../components/PropertyCard'
import { useProperties } from '../hooks/useProperties'
import type { PropertyType } from '../types/database'

const categories = [
    { type: 'achat' as PropertyType, label: 'Achat', icon: HomeIcon, emoji: '🏠' },
    { type: 'courte' as PropertyType, label: 'Courte', icon: Palmtree, emoji: '🏖️' },
    { type: 'longue' as PropertyType, label: 'Longue', icon: Building2, emoji: '🏢' },
]

export function ListingsPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    const activeType = (searchParams.get('type') as PropertyType) || 'achat'

    const options = useMemo(() => ({
        type: activeType,
        city: searchQuery || undefined,
    }), [activeType, searchQuery])

    const { properties, loading, error } = useProperties(options)

    const handleTypeChange = (type: PropertyType) => {
        setSearchParams({ type })
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8F0] to-[#FFF5EB]">
            <Navbar />

            <main className="flex-1 pb-32">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    {/* Ultra-modern iOS 26 Search Bar */}
                    <form onSubmit={handleSearch} className="mb-8">
                        <div className={`relative max-w-2xl mx-auto transition-all duration-500 ${isFocused ? 'scale-[1.02]' : ''}`}>
                            {/* Glow effect behind */}
                            <div className={`absolute inset-0 bg-gradient-to-r from-orange-400/30 via-pink-400/20 to-purple-400/30 rounded-3xl blur-xl transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />

                            {/* Main search container */}
                            <div className={`relative bg-white/90 backdrop-blur-2xl rounded-3xl border-2 transition-all duration-300 shadow-xl ${isFocused ? 'border-[#FF6B35] shadow-orange-200/50' : 'border-white/50 shadow-gray-200/30'}`}>
                                <div className="flex items-center px-5 py-4">
                                    {/* Animated search icon */}
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mr-4 transition-all duration-300 ${isFocused ? 'bg-gradient-to-br from-[#FF6B35] to-[#FF8F5E] shadow-lg shadow-orange-300/50' : 'bg-gray-100'}`}>
                                        <Search className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-white' : 'text-gray-400'}`} />
                                    </div>

                                    {/* Input */}
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder="Rechercher une ville..."
                                        className="flex-1 bg-transparent text-lg font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
                                    />

                                    {/* Sparkle indicator */}
                                    {searchQuery && (
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                                            <span className="hidden sm:inline">Recherche...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#FF8F5E] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
                            {(() => {
                                const Icon = categories.find((c) => c.type === activeType)?.icon
                                return Icon ? <Icon className="w-5 h-5 text-white" /> : null
                            })()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {activeType === 'achat' && 'Achat'}
                                {activeType === 'courte' && 'Location Courte'}
                                {activeType === 'longue' && 'Location Longue'}
                            </h1>
                            <p className="text-sm text-gray-500">{properties.length} annonces trouvées</p>
                        </div>
                    </div>

                    {/* Properties Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="relative">
                                <div className="w-14 h-14 border-4 border-gray-200 rounded-full"></div>
                                <div className="absolute top-0 left-0 w-14 h-14 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">❌</span>
                            </div>
                            <p className="text-red-500 mb-4">Erreur: {error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="text-[#FF6B35] hover:underline font-medium"
                            >
                                Réessayer
                            </button>
                        </div>
                    ) : properties.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                                <Search className="w-10 h-10 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Aucun résultat trouvé
                            </h3>
                            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                                Essayez de modifier vos termes de recherche ou changez de catégorie.
                            </p>
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-[#FF6B35] hover:underline font-medium"
                            >
                                ← Retour à l'accueil
                            </Link>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {properties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Ultra-modern iOS 26 Docked Filter Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                {/* Glass pill container */}
                <div className="max-w-sm mx-auto">
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/40 via-pink-400/30 to-orange-400/40 rounded-full blur-2xl" />

                        {/* Main pill */}
                        <div className="relative bg-white/95 backdrop-blur-2xl rounded-full p-1.5 shadow-2xl shadow-gray-400/30 border border-white/50">
                            <div className="flex items-center gap-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.type}
                                        onClick={() => handleTypeChange(cat.type)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-full transition-all duration-300 ${activeType === cat.type
                                                ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white shadow-lg shadow-orange-400/40 scale-[1.02]'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <span className="text-lg">{cat.emoji}</span>
                                        <span className={`text-sm font-semibold ${activeType === cat.type ? '' : 'hidden sm:inline'}`}>
                                            {cat.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
