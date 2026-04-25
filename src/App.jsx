import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import LocationsStripe from './components/LocationsStripe'
import Location from './components/Location'
import Footer from './components/Footer'
import MenuPage from './pages/MenuPage'

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <LocationsStripe />
      <Location />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/speisekarte" element={<MenuPage />} />
    </Routes>
  )
}
