import { useState, useRef, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
    {
        name: 'Karim Benali',
        location: 'Casablanca',
        avatar: '👨‍💼',
        rating: 5,
        text: "Enfin une plateforme de confiance ! J'ai trouvé mon appartement en 2 semaines sans aucune arnaque.",
    },
    {
        name: 'Fatima Zahra',
        location: 'Rabat',
        avatar: '👩‍💻',
        rating: 5,
        text: "Le processus de vérification est top. Je me suis sentie en sécurité du début à la fin.",
    },
    {
        name: 'Youssef Amrani',
        location: 'Marrakech',
        avatar: '🧑‍🎨',
        rating: 5,
        text: "Super réactif sur WhatsApp ! Mon annonce a été publiée en moins de 24h après vérification.",
    },
    {
        name: 'Salma El Idrissi',
        location: 'Tanger',
        avatar: '👩‍⚕️',
        rating: 5,
        text: "J'ai vendu ma villa grâce à Simsar. Les acheteurs étaient sérieux car aussi vérifiés.",
    },
]

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        if (isAutoPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length)
            }, 5000)
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isAutoPlaying])

    const goTo = (index: number) => {
        setCurrentIndex(index)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    const prev = () => goTo((currentIndex - 1 + testimonials.length) % testimonials.length)
    const next = () => goTo((currentIndex + 1) % testimonials.length)

    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-white to-[#FFF8F0] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-0 w-72 h-72 bg-orange-100/60 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
                        <Star className="w-4 h-4 text-[#FF6B35] fill-[#FF6B35]" />
                        <span className="text-sm font-medium text-[#FF6B35]">Témoignages</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Ce que disent nos clients
                    </h2>
                    <p className="text-gray-500 text-lg max-w-md mx-auto">
                        Des milliers de Marocains nous font confiance pour leurs projets immobiliers.
                    </p>
                </div>

                {/* Testimonial Carousel */}
                <div className="relative">
                    {/* Card */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-xl border border-white/50 relative overflow-hidden">
                        {/* Quote decoration */}
                        <div className="absolute top-4 right-6 text-8xl text-orange-100 font-serif leading-none">
                            "
                        </div>

                        <div className="relative z-10">
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                                "{testimonials[currentIndex].text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center text-2xl">
                                    {testimonials[currentIndex].avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">
                                        {testimonials[currentIndex].name}
                                    </div>
                                    <div className="text-gray-500">
                                        {testimonials[currentIndex].location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-gray-100"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goTo(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex
                                        ? 'bg-[#FF6B35] scale-125'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-gray-100"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
