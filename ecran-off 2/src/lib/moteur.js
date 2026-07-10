// Moteur : filtre la bibliothèque selon les critères du parent, puis tire au sort.

/**
 * Filtre les activités.
 * @param {Array} activites - la bibliothèque complète
 * @param {Object} criteres - { ageRep, lieu, humeur, dureeMax, effortFaibleSeulement }
 * @returns {Array} activités correspondantes
 */
export function filtrer(activites, criteres) {
  const { ageRep, lieu, humeur, dureeMax, effortFaibleSeulement, soloSeulement } = criteres
  return activites.filter((a) => {
    if (ageRep != null && !(a.age.min <= ageRep && ageRep <= a.age.max)) return false
    if (lieu && !a.lieux.includes(lieu)) return false
    if (humeur && !a.humeurs.includes(humeur)) return false
    if (dureeMax != null && a.duree.min > dureeMax) return false
    if (effortFaibleSeulement && a.effortParent !== 'faible') return false
    if (soloSeulement && a.autonomie === 'non') return false
    return true
  })
}

/**
 * Tire une activité au hasard parmi les candidates, en évitant celles déjà vues.
 * Si toutes ont été vues, on repart d'une ardoise vierge (et on renvoie quand même une idée).
 * @param {Array} candidates - activités filtrées
 * @param {string[]} vues - ids déjà proposés
 * @returns {{ activite: Object|null, vuesReset: boolean }}
 */
export function tirer(candidates, vues = []) {
  if (candidates.length === 0) return { activite: null, vuesReset: false }

  const dejaVues = new Set(vues)
  let pool = candidates.filter((a) => !dejaVues.has(a.id))
  let vuesReset = false

  if (pool.length === 0) {
    // tout a été vu pour ces critères : on autorise les répétitions
    pool = candidates
    vuesReset = true
  }

  const activite = pool[Math.floor(Math.random() * pool.length)]
  return { activite, vuesReset }
}

/**
 * Indique si le matériel est "déjà à la maison" (tout est courant ou aucun matériel).
 */
export function materielDejaLa(activite) {
  if (activite.sansMateriel) return true
  return activite.materiel.length > 0 && activite.materiel.every((m) => m.courant)
}
