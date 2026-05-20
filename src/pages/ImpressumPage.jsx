import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function ImpressumPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <SEO title="Impressum" noindex />
      <Navbar />
      <main>
        <section className="section" style={{ paddingTop: '120px' }}>
          <div className="container" style={{ maxWidth: '720px' }}>
            <p className="section-kicker">Rechtliches</p>
            <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Impressum</h1>

            <div className="impressum-content">
              <h2>Angaben gemäß § 5 TMG</h2>
              <p>
                Ehso's Burger<br />
                Bornheide 47b<br />
                22549 Hamburg
              </p>

              <h2>Kontakt</h2>
              <p>
                Bestellungen &amp; Anfragen:{' '}
                <a href="https://www.lieferando.de/speisekarte/ehsos-burger" target="_blank" rel="noopener noreferrer">
                  Lieferando
                </a>
              </p>

              <h2>Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)</h2>
              <p>
                Ehso's Burger<br />
                Bornheide 47b<br />
                22549 Hamburg
              </p>

              <h2>Haftungsausschluss</h2>
              <h3>Haftung für Inhalte</h3>
              <p>
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
                Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine
                Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              </p>

              <h3>Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
                keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                Anbieter oder Betreiber der Seiten verantwortlich.
              </p>

              <h3>Urheberrecht</h3>
              <p>
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
