import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { ListingsPage } from './pages/ListingsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/annonces" element={<ListingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
