import { MessageCircle, FileCheck, Globe } from 'lucide-react'

const steps = [
    {
        icon: MessageCircle,
        title: 'Envoi sur WhatsApp',
        description: 'Envoyez les photos et détails de votre bien via WhatsApp.',
        gradient: 'from-green-400 to-emerald-500',
        bgGlow: 'bg-green-400/20',
    },
    {
        icon: FileCheck,
        title: 'Vérification Stricte',
        description: "Nous vérifions l'identité et les documents officiels.",
        gradient: 'from-blue-400 to-indigo-500',
        bgGlow: 'bg-blue-400/20',
    },
    {
        icon: Globe,
        title: 'Mise en ligne',
        description: 'Votre annonce est publiée avec le badge "Vérifié".',
        gradient: 'from-[#FF6B35] to-[#FF8F5E]',
        bgGlow: 'bg-orange-400/20',
    },
]

export function HowItWorks() {
    return (
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
                        <span className="text-sm font-medium text-gray-600">Simple & Rapide</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Comment ça marche ?
                    </h2>
                    <p className="text-gray-500 text-lg max-w-md mx-auto">
                        Trois étapes simples pour publier votre annonce en toute sécurité.
                    </p>
                </div>

                {/* Steps with iOS-style cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Step number */}
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                            </div>

                            {/* Icon with glow */}
                            <div className="relative mb-6">
                                <div className={`absolute inset-0 ${step.bgGlow} rounded-2xl blur-xl scale-150 group-hover:scale-175 transition-transform duration-500`} />
                                <div className={`relative w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                                    <step.icon className="w-8 h-8 text-white" />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-xl text-gray-900 mb-3">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
