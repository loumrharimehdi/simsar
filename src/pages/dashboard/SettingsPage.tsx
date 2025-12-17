import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Building2, Save, Loader2, AlertCircle, CheckCircle2, LogOut } from 'lucide-react'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

export function SettingsPage() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        company_name: user?.user_metadata?.company_name || '',
        phone: user?.user_metadata?.phone || '',
        city: user?.user_metadata?.city || '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        const { error: updateError } = await supabase.auth.updateUser({
            data: formData
        })

        if (updateError) {
            setError('Erreur lors de la mise à jour')
        } else {
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        }

        setLoading(false)
    }

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50 space-y-5">
                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                        <User className="w-5 h-5 text-[#FF6B35]" />
                        Profil professionnel
                    </h2>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <p className="text-green-600">Profil mis à jour avec succès !</p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={user?.email || ''}
                                disabled
                                className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">L'email ne peut pas être modifié</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'entreprise</label>
                        <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                                placeholder="Mon Agence Immo"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                                placeholder="0612345678"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                                placeholder="Casablanca"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Enregistrement...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Enregistrer les modifications
                            </>
                        )}
                    </button>
                </form>

                {/* Subscription Info */}
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50">
                    <h2 className="font-semibold text-gray-900 mb-4">Abonnement</h2>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                        <div>
                            <p className="font-semibold text-gray-900">Essai gratuit</p>
                            <p className="text-sm text-gray-500">14 jours restants</p>
                        </div>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                            ⭐ Actif
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                        À la fin de votre essai, vous pourrez choisir un plan adapté à vos besoins.
                    </p>
                </div>

                {/* Danger Zone */}
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-red-100">
                    <h2 className="font-semibold text-red-600 mb-4">Zone de danger</h2>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Se déconnecter
                    </button>
                </div>
            </div>
        </DashboardLayout>
    )
}
