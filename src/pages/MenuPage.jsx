import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function MenuPage() {
  useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Menu />
      </main>
      <Footer />
    </>
  )
}
