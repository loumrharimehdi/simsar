import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '212644662605'

export function CTASection() {
    const openWhatsApp = () => {
        const message = encodeURIComponent(
            "Bonjour, je souhaite publier une annonce sur Simsar."
        )
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
    }

    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] via-[#FF8F5E] to-[#FFB088]" />

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-5 py-2.5 rounded-full mb-8 border border-white/30">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-white">Commencez dès maintenant</span>
                </div>

                {/* Headline */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                    Prêt à trouver votre
                    <br />
                    bien idéal ?
                </h2>

                {/* Subtext */}
                <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                    Rejoignez des milliers de Marocains qui font confiance à Simsar pour leurs projets immobiliers.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/annonces"
                        className="group flex items-center gap-3 bg-white text-[#FF6B35] px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
                    >
                        Voir les annonces
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button
                        onClick={openWhatsApp}
                        className="group flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Publier une annonce
                    </button>
                </div>

                {/* Trust indicators */}
                <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/70">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">100% Gratuit</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">Sans engagement</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">Support 24/7</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
