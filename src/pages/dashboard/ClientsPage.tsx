import { useState } from 'react'
import { Plus, Users, Phone, Mail, MessageSquare, Edit2, Trash2, Loader2, AlertCircle, X } from 'lucide-react'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { useClients } from '../../hooks/useClients'
import type { ClientStatus, ClientSource } from '../../types/database'

const STATUS_CONFIG: Record<ClientStatus, { label: string; color: string }> = {
    prospect: { label: 'Prospect', color: 'bg-gray-100 text-gray-700' },
    negotiating: { label: 'En négociation', color: 'bg-yellow-100 text-yellow-700' },
    closed_won: { label: 'Conclu ✓', color: 'bg-green-100 text-green-700' },
    closed_lost: { label: 'Perdu', color: 'bg-red-100 text-red-700' },
}

const SOURCE_OPTIONS: { value: ClientSource; label: string }[] = [
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'call', label: 'Appel' },
    { value: 'website', label: 'Site web' },
    { value: 'other', label: 'Autre' },
]

export function ClientsPage() {
    const { clients, loading, error, createClient, updateClient, deleteClient } = useClients()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingClient, setEditingClient] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [formLoading, setFormLoading] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        status: 'prospect' as ClientStatus,
        source: 'whatsapp' as ClientSource,
        notes: '',
    })

    const resetForm = () => {
        setFormData({
            name: '',
            phone: '',
            email: '',
            status: 'prospect',
            source: 'whatsapp',
            notes: '',
        })
        setEditingClient(null)
        setFormError(null)
    }

    const openModal = (clientId?: string) => {
        if (clientId) {
            const client = clients.find(c => c.id === clientId)
            if (client) {
                setFormData({
                    name: client.name,
                    phone: client.phone,
                    email: client.email || '',
                    status: client.status,
                    source: client.source || 'other',
                    notes: client.notes || '',
                })
                setEditingClient(clientId)
            }
        } else {
            resetForm()
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        resetForm()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormError(null)
        setFormLoading(true)

        const data = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email || undefined,
            status: formData.status,
            source: formData.source,
            notes: formData.notes || undefined,
        }

        const { error } = editingClient
            ? await updateClient(editingClient, data)
            : await createClient(data)

        if (error) {
            setFormError(error)
        } else {
            closeModal()
        }

        setFormLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) return
        setDeletingId(id)
        await deleteClient(id)
        setDeletingId(null)
    }

    const openWhatsApp = (phone: string) => {
        window.open(`https://wa.me/${phone.replace(/\D/g, '')}`, '_blank')
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Mes clients</h1>
                        <p className="text-gray-500 mt-1">{clients.length} client(s)</p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white px-5 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all hover:scale-105"
                    >
                        <Plus className="w-5 h-5" />
                        Nouveau client
                    </button>
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
                ) : clients.length === 0 ? (
                    /* Empty state */
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-12 border border-white/50 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun client</h3>
                        <p className="text-gray-500 mb-6">Ajoutez vos premiers clients pour suivre vos prospects.</p>
                        <button
                            onClick={() => openModal()}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white px-5 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Ajouter un client
                        </button>
                    </div>
                ) : (
                    /* Clients list */
                    <div className="grid gap-4">
                        {clients.map((client) => (
                            <div
                                key={client.id}
                                className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white/50 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        {/* Avatar */}
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#FF8F5E] rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0">
                                            {client.name.charAt(0).toUpperCase()}
                                        </div>

                                        {/* Info */}
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="font-semibold text-gray-900">{client.name}</h3>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_CONFIG[client.status].color}`}>
                                                    {STATUS_CONFIG[client.status].label}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-3.5 h-3.5" />
                                                    {client.phone}
                                                </span>
                                                {client.email && (
                                                    <span className="flex items-center gap-1">
                                                        <Mail className="w-3.5 h-3.5" />
                                                        {client.email}
                                                    </span>
                                                )}
                                            </div>
                                            {client.notes && (
                                                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{client.notes}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => openWhatsApp(client.phone)}
                                            className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-xl transition-colors"
                                            title="WhatsApp"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => openModal(client.id)}
                                            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors"
                                            title="Modifier"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(client.id)}
                                            disabled={deletingId === client.id}
                                            className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors disabled:opacity-50"
                                            title="Supprimer"
                                        >
                                            {deletingId === client.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative bg-white rounded-3xl p-6 w-full max-w-md shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingClient ? 'Modifier le client' : 'Nouveau client'}
                            </h2>
                            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-xl">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {formError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500" />
                                <p className="text-red-600 text-sm">{formError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                                    placeholder="0612345678"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                                    >
                                        {Object.entries(STATUS_CONFIG).map(([value, config]) => (
                                            <option key={value} value={value}>{config.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                                    <select
                                        name="source"
                                        value={formData.source}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                                    >
                                        {SOURCE_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] resize-none"
                                    placeholder="Notes sur ce client..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formLoading}
                                className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {formLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Enregistrement...
                                    </>
                                ) : (
                                    editingClient ? 'Mettre à jour' : 'Ajouter le client'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    )
}
