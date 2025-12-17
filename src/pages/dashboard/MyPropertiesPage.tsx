import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Building2, Edit2, Trash2, Eye, EyeOff, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { useMyProperties } from '../../hooks/useMyProperties'
import type { PropertyStatus } from '../../types/database'

export function MyPropertiesPage() {
    const { properties, loading, error, deleteProperty, updateStatus } = useMyProperties()
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const getStatusBadge = (status: PropertyStatus) => {
        switch (status) {
            case 'active':
                return <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"><Eye className="w-3 h-3" /> Active</span>
            case 'paused':
                return <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium"><EyeOff className="w-3 h-3" /> En pause</span>
            case 'sold':
                return <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"><CheckCircle className="w-3 h-3" /> Vendu</span>
        }
    }

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'achat': return 'Vente'
            case 'courte': return 'Location courte'
            case 'longue': return 'Location longue'
            default: return type
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-MA', {
            style: 'decimal',
            maximumFractionDigits: 0
        }).format(price) + ' DH'
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) return
        setDeletingId(id)
        await deleteProperty(id)
        setDeletingId(null)
    }

    const handleToggleStatus = async (id: string, currentStatus: PropertyStatus) => {
        const newStatus: PropertyStatus = currentStatus === 'active' ? 'paused' : 'active'
        await updateStatus(id, newStatus)
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Mes annonces</h1>
                        <p className="text-gray-500 mt-1">{properties.length} annonce(s)</p>
                    </div>
                    <Link
                        to="/dashboard/annonces/new"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white px-5 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all hover:scale-105"
                    >
                        <Plus className="w-5 h-5" />
                        Nouvelle annonce
                    </Link>
                </div>

                {/* Error state */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {/* Loading state */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin" />
                    </div>
                ) : properties.length === 0 ? (
                    /* Empty state */
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-12 border border-white/50 text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Building2 className="w-8 h-8 text-orange-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune annonce</h3>
                        <p className="text-gray-500 mb-6">Créez votre première annonce pour commencer à recevoir des contacts.</p>
                        <Link
                            to="/dashboard/annonces/new"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white px-5 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Créer une annonce
                        </Link>
                    </div>
                ) : (
                    /* Properties list */
                    <div className="grid gap-4">
                        {properties.map((property) => (
                            <div
                                key={property.id}
                                className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/50 hover:shadow-md transition-shadow"
                            >
                                <div className="flex gap-4">
                                    {/* Image */}
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                        {property.images?.[0] ? (
                                            <img
                                                src={property.images[0]}
                                                alt={property.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Building2 className="w-8 h-8 text-gray-300" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 truncate">{property.title}</h3>
                                                <p className="text-sm text-gray-500">{property.city} • {getTypeLabel(property.type)}</p>
                                            </div>
                                            {getStatusBadge(property.status)}
                                        </div>

                                        <p className="text-lg font-bold text-[#FF6B35] mt-2">{formatPrice(property.price)}</p>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 mt-3">
                                            <Link
                                                to={`/dashboard/annonces/${property.id}`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                Modifier
                                            </Link>
                                            <button
                                                onClick={() => handleToggleStatus(property.id, property.status)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                                            >
                                                {property.status === 'active' ? (
                                                    <><EyeOff className="w-4 h-4" /> Pause</>
                                                ) : (
                                                    <><Eye className="w-4 h-4" /> Activer</>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(property.id)}
                                                disabled={deletingId === property.id}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                                            >
                                                {deletingId === property.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}
