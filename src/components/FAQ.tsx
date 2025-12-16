import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
    {
        question: "Comment fonctionne la vérification des annonces ?",
        answer: "Chaque annonce passe par un processus de vérification manuelle. Nous vérifions l'identité du vendeur via WhatsApp, demandons les documents officiels du bien (titre foncier, contrat de bail, etc.), et validons les photos. Ce processus prend généralement 24 à 48h."
    },
    {
        question: "Comment publier une annonce sur Simsar ?",
        answer: "C'est simple ! Envoyez-nous les photos de votre bien, les détails (prix, surface, nombre de pièces, localisation) et vos documents via WhatsApp. Notre équipe vérifie tout et publie votre annonce avec le badge 'Vérifié'."
    },
    {
        question: "Combien coûte la publication d'une annonce ?",
        answer: "La publication d'annonces sur Simsar est actuellement gratuite pour les particuliers. Nous nous rémunérons sur des services premium optionnels comme la mise en avant ou les photos professionnelles."
    },
    {
        question: "Que signifie le badge 'Vérifié' ?",
        answer: "Le badge 'Vérifié' garantit que le vendeur a été identifié, que le bien existe réellement et que les informations publiées ont été contrôlées par notre équipe. C'est notre engagement contre les fausses annonces."
    },
    {
        question: "Dans quelles villes êtes-vous présents ?",
        answer: "Simsar couvre tout le Maroc ! Nous avons des annonces à Casablanca, Rabat, Marrakech, Tanger, Agadir, Fès, Meknès et dans de nombreuses autres villes. De nouvelles annonces sont ajoutées chaque jour."
    },
]

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-orange-50 rounded-full blur-3xl" />
            </div>

            <div className="max-w-3xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
                        <HelpCircle className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">FAQ</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Questions fréquentes
                    </h2>
                    <p className="text-gray-500 text-lg max-w-md mx-auto">
                        Tout ce que vous devez savoir sur Simsar et notre processus de vérification.
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-50/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                            >
                                <span className="font-semibold text-gray-900 pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <p className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
