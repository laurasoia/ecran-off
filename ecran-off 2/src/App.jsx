import { useState, useMemo, useCallback } from 'react'
import biblio from './data/activites.json'
import { AGES, TEMPS, QUOTA_GRATUIT, MODE_TEST } from './data/vocab'
import { filtrer, tirer } from './lib/moteur'
import {
  getVues, ajouterVue,
  ideesUtiliseesAujourdHui, incrementerQuota, quotaAtteint,
} from './lib/stockage'
import Accueil from './ecrans/Accueil'
import Activite from './ecrans/Activite'
import Paywall from './composants/Paywall'

const ACTIVITES = biblio.activites

export default function App() {
  const [ecran, setEcran] = useState('accueil') // 'accueil' | 'activite' | 'paywall'
  const [criteres, setCriteres] = useState({ age: null, lieu: null, humeur: null, temps: null })
  const [epuise, setEpuise] = useState(false)
  const [pluie, setPluie] = useState(false)
  const [activite, setActivite] = useState(null)

  // recalcul affiché du quota (re-render quand on tire)
  const [tick, setTick] = useState(0)
  const estPremium = false // à brancher plus tard (Stripe / compte famille)
  const illimite = estPremium || MODE_TEST // pas de plafond pendant les tests
  const ideesRestantes = useMemo(
    () => Math.max(0, QUOTA_GRATUIT - ideesUtiliseesAujourdHui()),
    [tick]
  )

  // Construit les critères "techniques" attendus par le moteur
  const construireCriteres = useCallback(() => {
    const ageRep = AGES.find((a) => a.id === criteres.age)?.rep ?? null
    const dureeMax = TEMPS.find((t) => t.id === criteres.temps)?.max ?? null
    const lieu = pluie ? 'maison' : criteres.lieu
    return { ageRep, lieu, humeur: criteres.humeur, dureeMax, effortFaibleSeulement: epuise }
  }, [criteres, pluie, epuise])

  const proposerUneIdee = useCallback(() => {
    if (quotaAtteint(QUOTA_GRATUIT, illimite)) {
      setEcran('paywall')
      return
    }
    const candidates = filtrer(ACTIVITES, construireCriteres())
    const { activite: choisie } = tirer(candidates, getVues())
    if (choisie) {
      ajouterVue(choisie.id)
      incrementerQuota()
      setTick((t) => t + 1)
    }
    setActivite(choisie)
    setEcran('activite')
  }, [construireCriteres, estPremium])

  const partager = useCallback(async () => {
    if (!activite) return
    const texte = `${activite.partage}\n\n— trouvé sur Écran OFF`
    try {
      if (navigator.share) {
        await navigator.share({ text: texte, title: 'Écran OFF' })
      } else {
        await navigator.clipboard.writeText(texte)
        alert('Texte copié ! Tu peux le coller où tu veux.')
      }
    } catch {
      /* l'utilisateur a annulé le partage : rien à faire */
    }
  }, [activite])

  const retourAccueil = useCallback(() => setEcran('accueil'), [])

  if (ecran === 'paywall') {
    return (
      <main className="min-h-screen px-5 pt-10">
        <div className="max-w-md mx-auto">
          <Paywall onAccueil={retourAccueil} />
        </div>
      </main>
    )
  }

  if (ecran === 'activite') {
    return (
      <main>
        <Activite
          activite={activite}
          onAutre={proposerUneIdee}
          onAccueil={retourAccueil}
          onPartage={partager}
        />
      </main>
    )
  }

  return (
    <main>
      <Accueil
        criteres={criteres}
        setCriteres={setCriteres}
        epuise={epuise}
        setEpuise={setEpuise}
        pluie={pluie}
        setPluie={setPluie}
        ideesRestantes={ideesRestantes}
        estPremium={estPremium}
        modeTest={MODE_TEST}
        onChercher={proposerUneIdee}
      />
    </main>
  )
}
