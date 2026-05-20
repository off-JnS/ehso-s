import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const STORAGE_KEY = 'ehsos_cookie_consent'

export default function DatenschutzPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const revokeConsent = () => {
    localStorage.removeItem(STORAGE_KEY)
    window.location.reload()
  }

  return (
    <>
      <SEO title="Datenschutzerklärung" noindex />
      <Navbar />
      <main>
        <section className="section" style={{ paddingTop: '120px' }}>
          <div className="container" style={{ maxWidth: '720px' }}>
            <p className="section-kicker">Rechtliches</p>
            <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Datenschutzerklärung</h1>

            <div className="impressum-content">

              {/* 1 */}
              <h2>1. Verantwortlicher</h2>
              <p>
                Ehso's Burger<br />
                Bornheide 47b<br />
                22549 Hamburg<br />
                <br />
                Telefon: <a href="tel:+4904076487272">040 76487272</a><br />
                E-Mail: <a href="mailto:[E-Mail-Adresse eintragen]">[E-Mail-Adresse eintragen]</a>
              </p>
              <p>
                Verantwortlich im Sinne der DSGVO ist die oben genannte natürliche oder juristische
                Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der
                Verarbeitung von personenbezogenen Daten entscheidet.
              </p>

              {/* 2 */}
              <h2>2. Allgemeines zur Datenverarbeitung</h2>
              <p>
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre
                personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              <p>
                Diese Website erhebt und verarbeitet personenbezogene Daten grundsätzlich nur,
                soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer
                Inhalte und Leistungen erforderlich ist oder Sie eingewilligt haben. Eine
                Weitergabe Ihrer persönlichen Daten an Dritte findet ohne Ihre ausdrückliche
                Einwilligung nicht statt, außer in den nachfolgend beschriebenen Fällen.
              </p>

              {/* 3 */}
              <h2>3. Hosting (Hostinger)</h2>
              <p>
                Diese Website wird bei Hostinger International Ltd., 61 Lordou Vironos Street,
                6023 Larnaka, Zypern, gehostet. Beim Aufruf unserer Website werden durch den
                Hostinganbieter automatisch sogenannte Server-Logfiles erfasst. Dazu gehören:
              </p>
              <ul>
                <li>IP-Adresse des anfragenden Rechners</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Verwendeter Browser und ggf. das Betriebssystem</li>
                <li>Referrer-URL (zuvor besuchte Seite)</li>
              </ul>
              <p>
                Diese Daten sind nicht bestimmten Personen zuordenbar und werden nicht mit
                anderen Datenquellen zusammengeführt. Die Verarbeitung erfolgt auf Grundlage
                von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren und
                störungsfreien Bereitstellung der Website).
              </p>
              <p>
                Wir haben mit Hostinger einen Auftragsverarbeitungsvertrag (AVV) gemäß
                Art. 28 DSGVO abgeschlossen.{' '}
                <a href="https://www.hostinger.de/datenschutzrichtlinie" target="_blank" rel="noopener noreferrer">
                  Datenschutzrichtlinie von Hostinger
                </a>
              </p>

              {/* 4 */}
              <h2>4. Cookies und lokaler Speicher</h2>
              <p>
                Unsere Website verwendet technisch notwendige Cookies sowie den lokalen
                Browserspeicher (localStorage), um Ihre Cookie-Einwilligungsentscheidung zu
                speichern. Dieser Eintrag trägt den Schlüssel <code>ehsos_cookie_consent</code>{' '}
                und enthält den Wert <code>accepted</code> oder <code>rejected</code>. Er wird
                nicht an Dritte übermittelt.
              </p>
              <p>
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse, Ihre
                Einwilligungsentscheidung zu respektieren und nicht wiederholend nachzufragen).
              </p>
              <p>
                Analyse-Cookies werden ausschließlich auf Basis Ihrer ausdrücklichen
                Einwilligung gesetzt (siehe Abschnitt 5).
              </p>

              {/* 5 */}
              <h2>5. Google Analytics (nur mit Einwilligung)</h2>
              <p>
                Mit Ihrer Einwilligung verwenden wir Google Analytics 4, einen
                Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street,
                Dublin 4, Irland („Google"). Google Analytics verwendet Cookies, um die
                Nutzung unserer Website statistisch auszuwerten. Die durch das Cookie
                erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich
                Ihrer gekürzten IP-Adresse) werden an einen Server von Google übertragen
                und dort gespeichert. Dabei kann eine Übertragung in die USA nicht
                ausgeschlossen werden. Wir verwenden IP-Anonymisierung, sodass Ihre
                IP-Adresse von Google innerhalb der EU gekürzt wird.
              </p>
              <p>
                Wir setzen <strong>Google Consent Mode v2</strong> ein. Das bedeutet:
                Bevor Sie aktiv einwilligen, werden keine Tracking-Daten erhoben.
                Google Analytics wird erst nach Ihrer Zustimmung über das Cookie-Banner
                aktiviert.
              </p>
              <p>
                <strong>Zweck:</strong> Analyse des Nutzerverhaltens zur Verbesserung
                unserer Website (z. B. meistbesuchte Seiten, Verweildauer).<br />
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).<br />
                <strong>Speicherdauer:</strong> Die Daten werden nach 14 Monaten automatisch
                gelöscht.
              </p>
              <p>
                Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft
                widerrufen:
              </p>
              <p>
                <button
                  onClick={revokeConsent}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(249,115,22,0.4)',
                    borderRadius: '50px',
                    color: 'var(--color-primary)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    fontWeight: 600,
                    padding: '8px 20px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Cookie-Einstellungen zurücksetzen
                </button>
              </p>
              <p>
                Alternativ können Sie die Speicherung von Cookies durch eine entsprechende
                Einstellung Ihrer Browsersoftware verhindern. Weitere Informationen zum
                Datenschutz bei Google:{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  policies.google.com/privacy
                </a>
              </p>

              {/* 6 */}
              <h2>6. Google Fonts</h2>
              <p>
                Wir verwenden Google Fonts der Google Ireland Limited, Gordon House, Barrow
                Street, Dublin 4, Irland, zum Einbinden von Schriftarten. Beim Laden der
                Seite baut Ihr Browser eine Verbindung zu den Servern von Google auf, um die
                Schriftart herunterzuladen. Dabei wird Ihre IP-Adresse an Google übertragen.
              </p>
              <p>
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
                einheitlichen und optimalen Darstellung der Website). Weitere Informationen:{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  policies.google.com/privacy
                </a>
              </p>

              {/* 7 */}
              <h2>7. Externe Bestellplattformen</h2>
              <p>
                Unsere Website enthält Links zu externen Bestellplattformen. Wenn Sie auf
                einen dieser Links klicken, verlassen Sie unsere Website. Wir haben keinen
                Einfluss auf die Datenverarbeitung durch diese Anbieter:
              </p>
              <ul>
                <li>
                  <strong>Lieferando</strong> (Takeaway.com Group N.V., Oosterdoksstraat 80,
                  1011 DK Amsterdam, Niederlande) –{' '}
                  <a href="https://www.lieferando.de/datenschutz" target="_blank" rel="noopener noreferrer">
                    Datenschutz Lieferando
                  </a>
                </li>
                <li>
                  <strong>Wolt</strong> (Wolt Enterprises Oy, Arkadiankatu 6, 00100 Helsinki,
                  Finnland) –{' '}
                  <a href="https://wolt.com/de/privacy" target="_blank" rel="noopener noreferrer">
                    Datenschutz Wolt
                  </a>
                </li>
                <li>
                  <strong>Uber Eats</strong> (Uber B.V., Burgerweeshuispad 301,
                  1076 HR Amsterdam, Niederlande) –{' '}
                  <a href="https://www.uber.com/de/de/legal/privacy/" target="_blank" rel="noopener noreferrer">
                    Datenschutz Uber
                  </a>
                </li>
              </ul>

              {/* 8 */}
              <h2>8. Externe Links (Google Maps)</h2>
              <p>
                Auf unserer Website befinden sich klickbare Adressangaben, die einen Link zu
                Google Maps (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
                Irland) öffnen. Google Maps wird dabei <strong>nicht eingebettet</strong> —
                die Karte öffnet sich ausschließlich in einem neuen Tab, wenn Sie aktiv
                auf die Adresse klicken. Erst in diesem Moment wird eine Verbindung zu
                Google-Servern hergestellt. Für die dort geltenden Datenschutzbestimmungen
                verweisen wir auf:{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  policies.google.com/privacy
                </a>
              </p>

              {/* 9 */}
              <h2>9. Ihre Rechte als betroffene Person</h2>
              <p>Ihnen stehen folgende Rechte gegenüber uns zu:</p>
              <ul>
                <li><strong>Auskunft</strong> über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
                <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
                <li><strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO)</li>
                <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)</li>
                <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
                <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
                <li><strong>Widerruf</strong> einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO) –
                  ohne Auswirkung auf die bis dahin erfolgte Verarbeitung</li>
              </ul>
              <p>
                Zur Geltendmachung Ihrer Rechte wenden Sie sich bitte an die oben genannte
                Kontaktadresse.
              </p>

              {/* 10 */}
              <h2>10. Beschwerderecht bei der Aufsichtsbehörde</h2>
              <p>
                Sie haben das Recht, sich jederzeit bei einer Datenschutzaufsichtsbehörde zu
                beschweren. Die für uns zuständige Behörde ist:
              </p>
              <p>
                <a href="https://www.datenschutz-hamburg.de" target="_blank" rel="noopener noreferrer">
                  Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit
                </a><br />
                Ludwig-Erhard-Str. 22, 7. OG<br />
                20459 Hamburg<br />
                E-Mail: mailbox@datenschutz.hamburg.de
              </p>

              {/* 11 */}
              <h2>11. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p>
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Mai 2026.
                Durch die Weiterentwicklung unserer Website oder aufgrund geänderter
                gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese
                Datenschutzerklärung zu ändern. Die jeweils aktuelle Fassung ist stets
                auf dieser Seite abrufbar.
              </p>

              <p style={{ marginTop: '2rem', opacity: 0.5, fontSize: '0.85rem' }}>
                Stand: Mai 2026
              </p>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

