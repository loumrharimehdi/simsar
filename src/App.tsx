import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// Public pages
import { LandingPage } from './pages/LandingPage'
import { ListingsPage } from './pages/ListingsPage'
import { PropertyDetailPage } from './pages/PropertyDetailPage'

// Auth pages
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'

// Dashboard pages
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { MyPropertiesPage } from './pages/dashboard/MyPropertiesPage'
import { NewPropertyPage } from './pages/dashboard/NewPropertyPage'
import { ClientsPage } from './pages/dashboard/ClientsPage'
import { SettingsPage } from './pages/dashboard/SettingsPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/annonces" element={<ListingsPage />} />
          <Route path="/annonces/:id" element={<PropertyDetailPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/annonces"
            element={
              <ProtectedRoute>
                <MyPropertiesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/annonces/new"
            element={
              <ProtectedRoute>
                <NewPropertyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/annonces/:id"
            element={
              <ProtectedRoute>
                <NewPropertyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/clients"
            element={
              <ProtectedRoute>
                <ClientsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
