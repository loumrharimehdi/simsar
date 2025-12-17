import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, Building2, Phone, MapPin, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        phone: '',
        city: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const { signUp } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas')
            return
        }

        if (formData.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères')
            return
        }

        setLoading(true)

        const { error } = await signUp(formData.email, formData.password, {
            company_name: formData.companyName,
            phone: formData.phone,
            city: formData.city
        })

        if (error) {
            setError(getErrorMessage(error.message))
            setLoading(false)
        } else {
            setSuccess(true)
            // Redirect after 3 seconds
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        }
    }

    const getErrorMessage = (message: string): string => {
        if (message.includes('User already registered')) {
            return 'Un compte existe déjà avec cet email'
        }
        if (message.includes('Invalid email')) {
            return 'Adresse email invalide'
        }
        return 'Une erreur est survenue. Veuillez réessayer.'
    }

    // Success state
    if (success) {
        return (
            <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
                <header className="p-4">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-[#FF6B35] to-[#FF8F5E] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
                            <Home className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl text-gray-900">Simsar</span>
                    </Link>
                </header>

                <main className="flex-1 flex items-center justify-center px-4">
                    <div className="w-full max-w-md text-center">
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-ios border border-white/50">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-3">
                                Inscription réussie !
                            </h1>
                            <p className="text-gray-500 mb-6">
                                Un email de confirmation a été envoyé à <strong>{formData.email}</strong>.
                                Veuillez cliquer sur le lien pour activer votre compte.
                            </p>
                            <Link
                                to="/login"
                                className="inline-block bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all"
                            >
                                Aller à la connexion
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
            {/* Header */}
            <header className="p-4">
                <Link to="/" className="inline-flex items-center gap-2">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#FF6B35] to-[#FF8F5E] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
                        <Home className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl text-gray-900">Simsar</span>
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-ios border border-white/50">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Créer un compte Pro
                            </h1>
                            <p className="text-gray-500">
                                Rejoignez Simsar et gérez vos annonces
                            </p>
                        </div>

                        {/* Pricing Badge */}
                        <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
                            <p className="text-sm text-orange-700 text-center">
                                🎉 <strong>Essai gratuit 14 jours</strong> puis 299 MAD/mois
                            </p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Company Name */}
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom de l'entreprise / Agence
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="companyName"
                                        name="companyName"
                                        type="text"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                                        placeholder="Mon Agence Immo"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email professionnel
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                                        placeholder="contact@agence.ma"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Téléphone
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                                        placeholder="0612345678"
                                        required
                                    />
                                </div>
                            </div>

                            {/* City */}
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                    Ville
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                                        placeholder="Casablanca"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                                        placeholder="Min. 6 caractères"
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirmer le mot de passe
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mt-6"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Création du compte...
                                    </>
                                ) : (
                                    "Créer mon compte Pro"
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-4">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-sm text-gray-400">ou</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* Login Link */}
                        <p className="text-center text-gray-600">
                            Déjà un compte ?{' '}
                            <Link
                                to="/login"
                                className="text-[#FF6B35] font-semibold hover:underline"
                            >
                                Se connecter
                            </Link>
                        </p>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-400 mt-6">
                        En créant un compte, vous acceptez nos{' '}
                        <a href="#" className="underline hover:text-gray-600">conditions générales</a>
                        {' '}et{' '}
                        <a href="#" className="underline hover:text-gray-600">politique de confidentialité</a>
                    </p>
                </div>
            </main>
        </div>
    )
}
