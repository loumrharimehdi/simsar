import { Link, useLocation } from 'react-router-dom'
import { Home, Search, User, LogIn } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export function Navbar() {
    const location = useLocation()
    const isLandingPage = location.pathname === '/'
    const { user, loading } = useAuth()

    return (
        <nav className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-white/20">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#FF6B35] to-[#FF8F5E] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
                        <Home className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl text-gray-900">Simsar</span>
                </Link>

                {/* Right side buttons */}
                <div className="flex items-center gap-3">
                    {/* View Listings button - only on landing page */}
                    {isLandingPage && (
                        <Link
                            to="/annonces"
                            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2.5 rounded-2xl font-medium transition-all duration-300 hover:scale-105"
                        >
                            <Search className="w-4 h-4" />
                            <span className="hidden sm:inline">Voir les annonces</span>
                        </Link>
                    )}

                    {/* Auth Button - Conditional based on login state */}
                    {!loading && (
                        user ? (
                            // Logged in: Show Dashboard button
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white px-5 py-2.5 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-200 hover:shadow-orange-300"
                            >
                                <User className="w-5 h-5" />
                                <span className="hidden sm:inline">Mon Dashboard</span>
                            </Link>
                        ) : (
                            // Not logged in: Show Login button
                            <Link
                                to="/login"
                                className="flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white px-5 py-2.5 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-200 hover:shadow-orange-300"
                            >
                                <LogIn className="w-5 h-5" />
                                <span className="hidden sm:inline">Espace Pro</span>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </nav>
    )
}
