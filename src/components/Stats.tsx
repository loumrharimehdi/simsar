import { useEffect, useRef, useState } from 'react'
import { Home, MapPin, CheckCircle, TrendingUp } from 'lucide-react'

interface Stat {
    icon: React.ElementType
    value: number
    suffix: string
    label: string
    gradient: string
}

const stats: Stat[] = [
    {
        icon: Home,
        value: 500,
        suffix: '+',
        label: 'Annonces vérifiées',
        gradient: 'from-orange-400 to-pink-500',
    },
    {
        icon: MapPin,
        value: 30,
        suffix: '+',
        label: 'Villes couvertes',
        gradient: 'from-blue-400 to-indigo-500',
    },
    {
        icon: CheckCircle,
        value: 100,
        suffix: '%',
        label: 'Annonces vérifiées',
        gradient: 'from-green-400 to-emerald-500',
    },
    {
        icon: TrendingUp,
        value: 98,
        suffix: '%',
        label: 'Clients satisfaits',
        gradient: 'from-purple-400 to-pink-500',
    },
]

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!start) return

        let startTime: number | null = null
        let animationFrame: number

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)

            setCount(Math.floor(progress * end))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrame)
    }, [end, duration, start])

    return count
}

function StatCard({ stat, isVisible }: { stat: Stat; isVisible: boolean }) {
    const count = useCountUp(stat.value, 2000, isVisible)
    const Icon = stat.icon

    return (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/50 text-center group hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {count}{stat.suffix}
            </div>
            <div className="text-gray-500 font-medium">
                {stat.label}
            </div>
        </div>
    )
}

export function Stats() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.2 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-[#FFF8F0] to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 right-0 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
                        <TrendingUp className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">Nos chiffres</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Simsar en chiffres
                    </h2>
                    <p className="text-gray-500 text-lg max-w-md mx-auto">
                        La confiance de milliers de Marocains dans leur recherche immobilière.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} isVisible={isVisible} />
                    ))}
                </div>
            </div>
        </section>
    )
}
