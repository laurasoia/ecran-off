// Illustrations de Laura, chargées depuis src/illustrations/<categorie>/*.svg
// Sélection stable par activité (même activité = même illu), variée d'une activité à l'autre.

const modules = import.meta.glob('../illustrations/**/*.svg', {
  eager: true, query: '?url', import: 'default',
})

// Regroupe les URLs par catégorie (nom du dossier)
const POOLS = {}
for (const chemin in modules) {
  const m = chemin.match(/illustrations\/([^/]+)\//)
  if (!m) continue
  ;(POOLS[m[1]] ||= []).push(modules[chemin])
}
Object.values(POOLS).forEach((arr) => arr.sort())

// Teintes de fond par type, dérivées de la palette des illustrations
export const FOND_TYPE = {
  mouvement:  '#FBD9CC',
  jeu:        '#FBEDBE',
  creation:   '#F7D6E5',
  exploration:'#CDEBE0',
  calme:      '#DCD9EF',
  defi:       '#FBE0CE',
}

function choisir(categorie, seed) {
  const pool = POOLS[categorie]
  if (!pool || pool.length === 0) return null
  let h = 0
  const s = String(seed ?? '')
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return pool[h % pool.length]
}

/**
 * @param {string} type - catégorie (mouvement, jeu, mascotte, vide, soir…)
 * @param {string|number} seed - graine de tirage (ex: activite.id)
 */
export default function Illustration({ type, seed, className = '' }) {
  const url = choisir(type, seed)
  if (!url) {
    // repli discret si aucune illu pour cette catégorie
    return <div className={className} aria-hidden="true" />
  }
  return (
    <img
      src={url}
      alt=""
      aria-hidden="true"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}
