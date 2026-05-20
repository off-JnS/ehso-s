/**
 * Post-build: copy dist/index.html into each SPA route sub-folder
 * and inject page-specific <title>, <meta name="description">, canonical,
 * and Open Graph tags so social scrapers and non-JS crawlers get
 * the correct metadata per route.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(__dirname, '..', 'dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')

const SITE_URL = 'https://ehsosburger.de'

const ROUTES = [
  {
    path: 'speisekarte',
    title: "Speisekarte – Burger, Croque, Wraps & mehr | Ehso's Burger",
    description: "Entdecke die vollständige Speisekarte von Ehso's Burger Hamburg: Burger ab 8\u00a0€, Croques, Wraps, Fingerfood, Crêpes, Family Boxes und mehr.",
    canonical: `${SITE_URL}/speisekarte`,
    noindex: false,
  },
  {
    path: 'impressum',
    title: "Impressum | Ehso's Burger",
    description: "Impressum von Ehso's Burger – Bornheide 47b, 22549 Hamburg.",
    canonical: `${SITE_URL}/impressum`,
    noindex: true,
  },
  {
    path: 'datenschutz',
    title: "Datenschutzerklärung | Ehso's Burger",
    description: "Datenschutzerklärung von Ehso's Burger gemäß DSGVO.",
    canonical: `${SITE_URL}/datenschutz`,
    noindex: true,
  },
]

function injectMeta(html, route) {
  const robots = route.noindex ? 'noindex, nofollow' : 'index, follow'

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
  html = html.replace(/(<meta name="description" content=")[^"]*(")/,  `$1${route.description}$2`)
  html = html.replace(/(<meta name="robots" content=")[^"]*(")/,        `$1${robots}$2`)
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/,    `$1${route.canonical}$2`)
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/,  `$1${route.title}$2`)
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/,`$1${route.description}$2`)
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/,      `$1${route.title}$2`)
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/,`$1${route.description}$2`)

  // Inject canonical link before </head>
  if (!html.includes('<link rel="canonical"')) {
    html = html.replace('</head>', `  <link rel="canonical" href="${route.canonical}" />\n  </head>`)
  }

  return html
}

for (const route of ROUTES) {
  const dir = path.join(dist, route.path)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), injectMeta(template, route))
  console.log(`✓  dist/${route.path}/index.html`)
}

console.log('All SPA routes pre-rendered with per-page meta.')
