import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

const cities = [
    {
        name: 'Casablanca',
        count: 150,
        emoji: '🏙️',
        gradient: 'from-blue-400 to-indigo-500',
    },
    {
        name: 'Rabat',
        count: 85,
        emoji: '🏛️',
        gradient: 'from-emerald-400 to-teal-500',
    },
    {
        name: 'Marrakech',
        count: 120,
        emoji: '🌴',
        gradient: 'from-orange-400 to-red-500',
    },
    {
        name: 'Tanger',
        count: 65,
        emoji: '⛵',
        gradient: 'from-cyan-400 to-blue-500',
    },
    {
        name: 'Agadir',
        count: 55,
        emoji: '🏖️',
        gradient: 'from-yellow-400 to-orange-500',
    },
    {
        name: 'Fès',
        count: 40,
        emoji: '🕌',
        gradient: 'from-purple-400 to-pink-500',
    },
]

export function PopularCities() {
    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-white to-[#FFF8F0] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-1/4 w-72 h-72 bg-orange-100/50 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
                        <MapPin className="w-4 h-4 text-[#FF6B35]" />
                        <span className="text-sm font-medium text-[#FF6B35]">Villes populaires</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Explorez par ville
                    </h2>
                    <p className="text-gray-500 text-lg max-w-md mx-auto">
                        Découvrez les meilleures opportunités immobilières dans tout le Maroc.
                    </p>
                </div>

                {/* Cities Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cities.map((city) => (
                        <Link
                            key={city.name}
                            to={`/annonces?city=${encodeURIComponent(city.name)}`}
                            className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                        >
                            {/* Background gradient on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${city.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                            <div className="relative z-10 flex items-center gap-4">
                                {/* Emoji */}
                                <div className={`w-16 h-16 bg-gradient-to-br ${city.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {city.emoji}
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors">
                                        {city.name}
                                    </h3>
                                    <p className="text-gray-500">
                                        {city.count}+ annonces
                                    </p>
                                </div>

                                {/* Arrow */}
                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-[#FF6B35] group-hover:text-white transition-all duration-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
