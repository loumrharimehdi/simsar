import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Home, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { signIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const { error } = await signIn(email, password)

        if (error) {
            setError(getErrorMessage(error.message))
            setLoading(false)
        } else {
            navigate(from, { replace: true })
        }
    }

    const getErrorMessage = (message: string): string => {
        if (message.includes('Invalid login credentials')) {
            return 'Email ou mot de passe incorrect'
        }
        if (message.includes('Email not confirmed')) {
            return 'Veuillez confirmer votre email'
        }
        return 'Une erreur est survenue. Veuillez réessayer.'
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
                                Espace Professionnel
                            </h1>
                            <p className="text-gray-500">
                                Connectez-vous à votre compte
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
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                                        placeholder="pro@agence.ma"
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
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                                        placeholder="••••••••"
                                        required
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Connexion...
                                    </>
                                ) : (
                                    'Se connecter'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-4">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-sm text-gray-400">ou</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* Register Link */}
                        <p className="text-center text-gray-600">
                            Pas encore de compte ?{' '}
                            <Link
                                to="/register"
                                className="text-[#FF6B35] font-semibold hover:underline"
                            >
                                Créer un compte pro
                            </Link>
                        </p>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-400 mt-6">
                        En vous connectant, vous acceptez nos{' '}
                        <a href="#" className="underline hover:text-gray-600">conditions d'utilisation</a>
                    </p>
                </div>
            </main>
        </div>
    )
}
