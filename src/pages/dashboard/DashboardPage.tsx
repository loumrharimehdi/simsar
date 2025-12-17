import { Link } from 'react-router-dom'
import { Building2, Users, Plus, ArrowRight, TrendingUp, Eye, Phone } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'

export function DashboardPage() {
    const { user } = useAuth()

    const companyName = user?.user_metadata?.company_name || 'Mon Agence'

    // Placeholder stats - will be replaced with real data
    const stats = [
        { label: 'Annonces actives', value: '0', icon: Building2, color: 'orange' },
        { label: 'Vues totales', value: '0', icon: Eye, color: 'blue' },
        { label: 'Clients', value: '0', icon: Users, color: 'green' },
        { label: 'Contacts ce mois', value: '0', icon: Phone, color: 'purple' },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Welcome Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Bonjour, {companyName} 👋
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Bienvenue dans votre espace professionnel Simsar
                        </p>
                    </div>
                    <Link
                        to="/dashboard/annonces/new"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white px-5 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all hover:scale-105"
                    >
                        <Plus className="w-5 h-5" />
                        Nouvelle annonce
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white/50 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color === 'orange' ? 'bg-orange-100' :
                                stat.color === 'blue' ? 'bg-blue-100' :
                                    stat.color === 'green' ? 'bg-green-100' :
                                        'bg-purple-100'
                                }`}>
                                <stat.icon className={`w-5 h-5 ${stat.color === 'orange' ? 'text-orange-500' :
                                    stat.color === 'blue' ? 'text-blue-500' :
                                        stat.color === 'green' ? 'text-green-500' :
                                            'text-purple-500'
                                    }`} />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-4">
                    {/* My Properties */}
                    <Link
                        to="/dashboard/annonces"
                        className="group bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-all hover:scale-[1.01]"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                                    <Building2 className="w-6 h-6 text-orange-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    Mes annonces
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Gérez vos biens immobiliers
                                </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>

                    {/* My Clients */}
                    <Link
                        to="/dashboard/clients"
                        className="group bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-all hover:scale-[1.01]"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-green-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    Mes clients
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Suivez vos prospects et clients
                                </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>
                </div>

                {/* Empty State / Getting Started */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                            <TrendingUp className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                                🚀 Commencez maintenant
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Publiez votre première annonce et commencez à recevoir des contacts qualifiés.
                            </p>
                            <Link
                                to="/dashboard/annonces/new"
                                className="inline-flex items-center gap-2 text-[#FF6B35] font-semibold hover:underline"
                            >
                                Publier une annonce
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
