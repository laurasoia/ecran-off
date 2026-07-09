// Vocabulaire d'affichage : ce que le parent voit et tape sur l'écran d'accueil.
// Les `id` correspondent aux valeurs stockées dans activites.json.

export const LIEUX = [
  { id: 'maison', label: 'À la maison', emoji: '🏠' },
  { id: 'dehors', label: 'Dehors', emoji: '🌳' },
  { id: 'voiture', label: 'En voiture', emoji: '🚗' },
]

export const HUMEURS = [
  { id: 'afond', label: 'À fond', emoji: '⚡', sous: 'déborde d\u2019énergie', couleur: '#E87058' },
  { id: 'ronchon', label: 'Ronchon', emoji: '😤', sous: 'de mauvais poil', couleur: '#6A71D3' },
  { id: 'ennui', label: 'Ramollo', emoji: '🥱', sous: 'tourne en rond', couleur: '#56BAE2' },
  { id: 'pose', label: 'Posé', emoji: '😌', sous: 'calme ou fatigué', couleur: '#2EBCA1' },
  { id: 'inspire', label: 'Inspiré', emoji: '🎨', sous: 'envie de créer', couleur: '#E275A4' },
]

// Bandes d'âge → un âge "représentatif" utilisé pour le filtrage (min ≤ rep ≤ max).
export const AGES = [
  { id: 'tout-petit', label: '1-2 ans', rep: 2 },
  { id: 'petit', label: '3-4 ans', rep: 4 },
  { id: 'moyen', label: '5-6 ans', rep: 6 },
  { id: 'grand', label: '7-8 ans', rep: 8 },
  { id: 'pre-ado', label: '9-11 ans', rep: 10 },
]

// Temps dispo → durée max d'une activité (on garde celles dont duree.min ≤ max).
export const TEMPS = [
  { id: 'express', label: '5-10 min', max: 12 },
  { id: 'courte', label: '15-20 min', max: 22 },
  { id: 'moyenne', label: '30 min', max: 35 },
  { id: 'longue', label: '45 min +', max: 999 },
]

export const QUOTA_GRATUIT = 3 // idées gratuites par jour

// Mode test : true = accès illimité pour les testeurs (pas de paywall).
// À repasser à false le jour du lancement pour réactiver le freemium.
export const MODE_TEST = true
