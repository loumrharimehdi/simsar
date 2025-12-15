import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8F0] to-white">
            {/* iOS 26 style background with floating elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animated gradient orbs */}
                <div className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-orange-300/40 to-pink-300/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-blue-300/30 to-purple-300/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
                {/* Centered Content */}
                <div className="text-center max-w-3xl mx-auto">
                    {/* Glassmorphism Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl px-5 py-2.5 rounded-full mb-8 border border-white/50 shadow-lg shadow-orange-100/50">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <ShieldCheck className="w-4 h-4 text-[#FF6B35]" />
                        <span className="text-sm font-semibold text-gray-700">Plateforme 100% Vérifiée</span>
                    </div>

                    {/* Main Headline with gradient text */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
                        <span className="text-gray-900">L'immobilier au Maroc,</span>
                        <br />
                        <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8F5E] to-[#FFB088] bg-clip-text text-transparent">
                            en toute confiance.
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
                        Fini les fausses annonces et les arnaques. Chaque vendeur
                        et chaque bien est vérifié manuellement.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link
                            to="/annonces"
                            className="group flex items-center gap-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-300/50"
                        >
                            Voir les annonces
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Single stat - only 100% verified */}
                    <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/50 shadow-lg shadow-gray-100/50">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                            <div className="text-xl font-bold text-gray-900">100% Vérifiées</div>
                            <div className="text-sm text-gray-500">Toutes nos annonces</div>
                        </div>
                    </div>
                </div>

                {/* Floating Property Cards - iOS 26 style */}
                <div className="hidden lg:block absolute top-32 -left-10 transform -rotate-6 animate-float">
                    <PropertyPreviewCard
                        image="🏠"
                        price="1.2M DH"
                        location="Casablanca"
                    />
                </div>
                <div className="hidden lg:block absolute top-40 -right-10 transform rotate-6 animate-float-delayed">
                    <PropertyPreviewCard
                        image="🏢"
                        price="8,500 DH/mois"
                        location="Rabat"
                    />
                </div>
            </div>
        </section>
    )
}

interface PropertyPreviewCardProps {
    image: string
    price: string
    location: string
}

function PropertyPreviewCard({ image, price, location }: PropertyPreviewCardProps) {
    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-2xl shadow-gray-200/50 border border-white/50 w-48">
            <div className="w-full h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center text-4xl mb-3">
                {image}
            </div>
            <div className="font-bold text-gray-900">{price}</div>
            <div className="text-sm text-gray-500">{location}</div>
            <div className="mt-2 flex items-center gap-1">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-xs text-green-600 font-medium">Vérifié</span>
            </div>
        </div>
    )
}
