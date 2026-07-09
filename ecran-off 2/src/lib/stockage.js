// Stockage local : mémoire des activités vues + compteur d'idées gratuites du jour.
// Même logique que le compteur freemium de Soïa.

const CLE_VUES = 'ecranoff_vues'
const CLE_QUOTA = 'ecranoff_quota'

function aujourdHui() {
  return new Date().toISOString().slice(0, 10) // 'YYYY-MM-DD'
}

function lire(cle, defaut) {
  try {
    const brut = localStorage.getItem(cle)
    return brut ? JSON.parse(brut) : defaut
  } catch {
    return defaut
  }
}

function ecrire(cle, valeur) {
  try {
    localStorage.setItem(cle, JSON.stringify(valeur))
  } catch {
    /* mode privé / quota plein : on ignore silencieusement */
  }
}

// --- Activités déjà vues -------------------------------------------------

export function getVues() {
  return lire(CLE_VUES, [])
}

export function ajouterVue(id) {
  const vues = getVues()
  if (!vues.includes(id)) {
    vues.push(id)
    ecrire(CLE_VUES, vues)
  }
}

export function reinitialiserVues() {
  ecrire(CLE_VUES, [])
}

// --- Quota gratuit du jour ----------------------------------------------

function getQuotaBrut() {
  const q = lire(CLE_QUOTA, { date: aujourdHui(), count: 0 })
  if (q.date !== aujourdHui()) {
    // nouveau jour → on remet le compteur à zéro
    return { date: aujourdHui(), count: 0 }
  }
  return q
}

export function ideesUtiliseesAujourdHui() {
  return getQuotaBrut().count
}

export function incrementerQuota() {
  const q = getQuotaBrut()
  q.count += 1
  ecrire(CLE_QUOTA, q)
  return q.count
}

/**
 * @param {number} quota - nombre d'idées gratuites par jour
 * @param {boolean} estPremium - l'utilisateur a-t-il un abonnement actif
 */
export function quotaAtteint(quota, estPremium) {
  if (estPremium) return false
  return ideesUtiliseesAujourdHui() >= quota
}
