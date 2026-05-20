import { Routes, Route } from 'react-router-dom'
import CookieBanner from './components/CookieBanner'
import SEO from './components/SEO'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import LocationsStripe from './components/LocationsStripe'
import Location from './components/Location'
import Footer from './components/Footer'
import MenuPage from './pages/MenuPage'
import ImpressumPage from './pages/ImpressumPage'
import DatenschutzPage from './pages/DatenschutzPage'

const HOME_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: "Ehso's Burger",
  url: 'https://ehsosburger.de',
  telephone: '+494076487272',
  image: 'https://ehsosburger.de/images/Logo/logo.png',
  logo: 'https://ehsosburger.de/images/Logo/logo.png',
  description: 'Frische, handgemachte Burger zum Mitnehmen und Liefern in Hamburg Lurup. Bestelle über Lieferando, Wolt oder Uber Eats.',
  servesCuisine: ['Burger', 'American', 'Fast Food', 'Croque', 'Wraps'],
  priceRange: '€€',
  hasMenu: 'https://ehsosburger.de/speisekarte',
  acceptsReservations: false,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bornheide 47b',
    addressLocality: 'Hamburg',
    addressRegion: 'Hamburg',
    postalCode: '22549',
    addressCountry: 'DE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 53.576,
    longitude: 9.882,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '15:00', closes: '23:59' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '13:00', closes: '23:59' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '13:00', closes: '23:59' },
  ],
  sameAs: [
    'https://www.lieferando.de/speisekarte/ehsos-burger',
    'https://wolt.com/de/deu/hamburg/restaurant/ehsos-burger',
    'https://www.ubereats.com/de/store/ehsos-burger/2Em64aJsUc-urJq2ww0PKQ',
  ],
}

function HomePage() {
  return (
    <>
      <SEO
        canonical="/"
        description="Ehso's Burger in Hamburg Lurup – saftige, frisch zubereitete Burger zum Mitnehmen oder nach Hause liefern lassen. Jetzt über Lieferando, Wolt oder Uber Eats bestellen."
        jsonLd={HOME_JSON_LD}
      />
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
    <>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/speisekarte" element={<MenuPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/datenschutz" element={<DatenschutzPage />} />
      </Routes>
    </>
  )
}
