// Erzeugt die SVGs fürs Profil. Aufruf: node scripts/generate.mjs
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'assets')
mkdirSync(out, { recursive: true })

const c = {
  bg: '#0d1117',
  card: '#161b22',
  line: '#30363d',
  ridge1: '#161b22',
  ridge2: '#1c222b',
  cream: '#f2ece1',
  gold: '#c9a97c',
  muted: '#8b949e',
}
const serif = "Georgia, 'Times New Roman', serif"
const sans = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
const mono = "ui-monospace, SFMono-Regular, Consolas, Menlo, monospace"
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function header() {
  const main = 'M0 372 L190 345 L330 365 L520 320 L660 350 L790 225 L860 275 L930 62 L1010 170 L1060 140 L1200 250'
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 380" role="img" aria-label="Yannick Salm: Bergkette als Header">
<style>
@keyframes rise { from { opacity: 0; transform: translateY(36px) } to { opacity: 1; transform: none } }
@keyframes draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes fade { from { opacity: 0 } to { opacity: 1 } }
.back { animation: rise 1.2s ease-out both }
.mid { animation: rise 1.2s .2s ease-out both }
.fill { animation: fade 1s 1.6s ease-out both }
.line { stroke-dasharray: 1; animation: draw 2.2s .4s ease-in-out both }
.snow { animation: fade .8s 2.2s ease-out both }
.glow { animation: fade 1.6s 1.4s ease-out both }
.t1 { animation: rise .9s .5s ease-out both }
.t2 { animation: rise .9s .8s ease-out both }
.t3 { animation: rise .9s 1.1s ease-out both }
@media (prefers-reduced-motion: reduce) { * { animation: none !important } }
</style>
<defs><radialGradient id="g"><stop offset="0" stop-color="${c.gold}" stop-opacity=".38"/><stop offset="1" stop-color="${c.gold}" stop-opacity="0"/></radialGradient></defs>
<rect width="1200" height="380" fill="${c.bg}"/>
<circle class="glow" cx="930" cy="120" r="230" fill="url(#g)"/>
<path class="back" fill="${c.ridge1}" d="M0 300 L120 275 L240 300 L380 262 L520 285 L660 190 L780 240 L900 150 L1020 210 L1120 170 L1200 220 V380 H0Z"/>
<path class="mid" fill="${c.ridge2}" d="M0 340 L160 310 L300 335 L470 290 L620 325 L760 250 L880 300 L990 235 L1100 290 L1200 260 V380 H0Z"/>
<path class="fill" fill="${c.bg}" d="${main} V380 H0Z"/>
<polygon class="snow" fill="${c.cream}" points="930,62 975,123 950,112 932,138 915,112 901,150"/>
<path class="line" pathLength="1" fill="none" stroke="${c.gold}" stroke-width="3" stroke-linejoin="round" d="${main}"/>
<text class="t1" x="70" y="130" font-family="${serif}" font-size="76" fill="${c.cream}">Yannick Salm</text>
<text class="t2" x="72" y="178" font-family="${sans}" font-size="26" fill="${c.cream}" opacity=".85">IT-Lernender aus der Schweiz</text>
<text class="t3" x="72" y="214" font-family="${mono}" font-size="20" fill="${c.gold}">Web-Apps · Homelab · Cloudflare</text>
</svg>
`
}

const routes = [
  { n: '01', name: 'ys-planner', url: 'planner.salm.li', shot: null,
    d: ['Aufgabenverwaltung mit Boards, Knowledge Base,', 'Mail-Eingang und eigenem MCP-Server.'],
    s: 'Next.js · Supabase · Cloudflare Workers' },
  { n: '02', name: 'ys-jasstafel', url: 'jasstafel.yannicksalm.ch', shot: 'ys-jasstafel',
    d: ['Gratis Open-Source-Jasstafel fürs Handy: Punkte,', 'Weis und Striche ohne Kopfrechnen.'],
    s: 'Next.js · Supabase · PWA' },
  { n: '03', name: 'ys-workout', url: 'workout.yannicksalm.ch', shot: 'ys-workout',
    d: ['Workout-Tracker, der auch offline funktioniert.', 'Aktuell in der Beta-Phase.'],
    s: 'Next.js · Supabase · Serwist' },
  { n: '04', name: 'ys-ptone', url: 'ptone.yannicksalm.ch', shot: 'ys-ptone',
    d: ['Plattform für Personal Trainer mit Kundenverwaltung,', 'Trainingsplänen und Buchhaltung.'],
    s: 'Next.js · Supabase · Resend' },
  { n: '05', name: 'ys-status', url: 'status.yannicksalm.ch', shot: 'ys-status',
    d: ['Öffentliche Status-Seite für meine Dienste,', 'mit automatischen Health-Checks.'],
    s: 'Next.js · Supabase · Recharts' },
  { n: '06', name: 'ys-homepage', url: 'yannicksalm.ch', shot: 'ys-homepage',
    d: ['Meine Website mit Portfolio und Angeboten', 'für Webdesign und Entwicklung.'],
    s: 'Next.js · TypeScript · Cloudflare Workers' },
]

function routeArt() {
  return `<rect width="800" height="300" fill="${c.bg}"/>
<circle cx="520" cy="110" r="190" fill="url(#g)"/>
<path fill="${c.ridge1}" d="M0 230 L140 180 L280 225 L420 130 L560 200 L700 120 L800 170 V300 H0Z"/>
<path fill="${c.bg}" d="M0 280 L170 240 L300 270 L450 170 L520 40 L600 150 L690 110 L800 220 V300 H0Z"/>
<path fill="none" stroke="${c.gold}" stroke-width="3" stroke-linejoin="round" d="M0 280 L170 240 L300 270 L450 170 L520 40 L600 150 L690 110 L800 220"/>
<polygon fill="${c.cream}" points="520,40 561,97 537,88 521,112 505,88 489,110"/>`
}

function card(r) {
  const shot = r.shot && join(root, 'assets', 'shots', `${r.shot}.jpg`)
  const img = shot && existsSync(shot)
    ? `<image width="800" height="300" preserveAspectRatio="xMidYMin slice" href="data:image/jpeg;base64,${readFileSync(shot).toString('base64')}"/>`
    : routeArt()
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 540" role="img" aria-label="${esc(r.name)}: ${esc(r.d.join(' '))}">
<defs>
<clipPath id="k"><rect width="800" height="540" rx="24"/></clipPath>
<radialGradient id="g"><stop offset="0" stop-color="${c.gold}" stop-opacity=".32"/><stop offset="1" stop-color="${c.gold}" stop-opacity="0"/></radialGradient>
<linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.card}" stop-opacity="0"/><stop offset="1" stop-color="${c.card}"/></linearGradient>
</defs>
<g clip-path="url(#k)">
<rect width="800" height="540" fill="${c.card}"/>
${img}
<rect y="220" width="800" height="80" fill="url(#f)"/>
<text x="40" y="350" font-family="${sans}" font-size="38" font-weight="700" fill="${c.cream}">${esc(r.name)}</text>
<text x="760" y="349" text-anchor="end" font-family="${mono}" font-size="22" fill="${c.gold}">ROUTE ${r.n}</text>
<text x="40" y="396" font-family="${sans}" font-size="26" fill="${c.cream}" opacity=".85">${esc(r.d[0])}</text>
<text x="40" y="430" font-family="${sans}" font-size="26" fill="${c.cream}" opacity=".85">${esc(r.d[1])}</text>
<text x="40" y="478" font-family="${mono}" font-size="22" fill="${c.gold}">${esc(r.s)}</text>
<text x="40" y="512" font-family="${mono}" font-size="22" fill="${c.muted}">${esc(r.url)}</text>
</g>
<rect x="1" y="1" width="798" height="538" rx="24" fill="none" stroke="${c.line}" stroke-width="2"/>
</svg>
`
}

const gear = [
  { title: 'Täglich im Einsatz', style: 'a', items: ['TypeScript', 'Next.js', 'React', 'Tailwind', 'Supabase', 'PostgreSQL', 'Cloudflare Workers', 'Docker', 'Linux'] },
  { title: 'Regelmässig', style: 'b', items: ['Python', 'FastAPI', 'Proxmox', 'Traefik', 'Coolify', 'Zitadel', 'Zabbix', 'Bash', 'Claude Code'] },
  { title: 'Schon produktiv eingesetzt', style: 'c', items: ['shadcn/ui', 'Motion', 'PWA', 'HTML/CSS/JS', 'Astro', 'PostgREST', 'Row Level Security', 'Stripe', 'Resend', 'Twilio', 'Cloudflare Pages', 'R2', 'Cloudflare Tunnel', 'nftables', 'NFS', 'RAID1', 'GitHub Actions', 'OIDC/OAuth', 'SAML', 'MFA', 'Duplicati', 'llama.cpp', 'MCP-Server', 'Windows Server', 'Active Directory', 'PowerShell', 'ESP32', '3D-Druck'] },
]

function gearSvg() {
  const W = 1200, pad = 40, h = 48, gap = 12, fs = 22, cw = fs * 0.6, px = 18
  const st = {
    a: { fill: c.gold, stroke: c.gold, text: c.bg },
    b: { fill: 'none', stroke: c.gold, text: c.cream },
    c: { fill: 'none', stroke: c.line, text: c.muted },
  }
  let y = 56, body = '', i = 0
  for (const g of gear) {
    body += `<text x="${pad}" y="${y}" font-family="${sans}" font-size="26" font-weight="600" fill="${c.cream}">${esc(g.title)}</text>\n`
    y += 20
    let x = pad
    for (const it of g.items) {
      const w = Math.ceil(it.length * cw + px * 2)
      if (x + w > W - pad) { x = pad; y += h + gap }
      const s = st[g.style]
      body += `<g class="b" style="animation-delay:${(i++ * 0.03).toFixed(2)}s"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${s.fill}" stroke="${s.stroke}" stroke-width="2"/><text x="${x + w / 2}" y="${y + 31}" text-anchor="middle" font-family="${mono}" font-size="${fs}" fill="${s.text}">${esc(it)}</text></g>\n`
      x += w + gap
    }
    y += h + 56
  }
  const H = y - 16
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Skills: ${esc(gear.flatMap((g) => g.items).join(', '))}">
<style>
@keyframes in { from { opacity: 0 } to { opacity: 1 } }
.b { animation: in .5s ease-out both }
@media (prefers-reduced-motion: reduce) { .b { animation: none !important } }
</style>
<rect width="${W}" height="${H}" rx="24" fill="${c.card}" stroke="${c.line}" stroke-width="2"/>
${body}</svg>
`
}

writeFileSync(join(out, 'header.svg'), header())
for (const r of routes) writeFileSync(join(out, `route-${r.name}.svg`), card(r))
writeFileSync(join(out, 'gear.svg'), gearSvg())
console.log('SVGs erzeugt')
