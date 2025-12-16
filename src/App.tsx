import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { ListingsPage } from './pages/ListingsPage'
import { PropertyDetailPage } from './pages/PropertyDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/annonces" element={<ListingsPage />} />
        <Route path="/annonces/:id" element={<PropertyDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

