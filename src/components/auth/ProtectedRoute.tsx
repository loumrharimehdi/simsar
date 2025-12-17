import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
    children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-[#FF6B35] animate-spin" />
                    <p className="text-gray-500 font-medium">Chargement...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        // Redirect to login with return path
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <>{children}</>
}
