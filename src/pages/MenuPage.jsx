import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function MenuPage() {
  useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title="Speisekarte – Burger, Croque, Wraps & mehr"
        description="Entdecke die vollständige Speisekarte von Ehso's Burger Hamburg: Burger ab 8 €, Croques, Wraps, Fingerfood, Crêpes, Family Boxes und mehr."
        canonical="/speisekarte"
      />
      <Navbar />
      <main>
        <Menu />
      </main>
      <Footer hideOrder />
    </>
  )
}
