import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Building2, Users, Settings, LogOut, Menu, X, ChevronRight } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface DashboardLayoutProps {
    children: React.ReactNode
}

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Mes annonces', href: '/dashboard/annonces', icon: Building2 },
    { name: 'Mes clients', href: '/dashboard/clients', icon: Users },
    { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user, signOut } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const companyName = user?.user_metadata?.company_name || 'Mon Agence'

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-[#FFF8F0]">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-50 h-full w-72 bg-white/80 backdrop-blur-xl border-r border-white/50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-5 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="w-9 h-9 bg-gradient-to-br from-[#FF6B35] to-[#FF8F5E] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
                                    <Home className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-bold text-xl text-gray-900">Simsar</span>
                            </Link>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href ||
                                (item.href !== '/dashboard' && location.pathname.startsWith(item.href))
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive
                                            ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8F5E] text-white shadow-lg shadow-orange-200'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* User section */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#FF8F5E] rounded-xl flex items-center justify-center text-white font-bold">
                                {companyName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{companyName}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Déconnexion</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-72">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-white/50">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
                        >
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>
                        <div className="flex items-center gap-3">
                            {/* Subscription badge */}
                            <span className="hidden sm:inline-flex items-center px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                                ⭐ Essai gratuit
                            </span>
                            <Link
                                to="/"
                                className="text-sm text-gray-500 hover:text-[#FF6B35] font-medium"
                            >
                                Voir le site →
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
