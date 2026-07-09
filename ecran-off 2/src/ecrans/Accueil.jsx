// Écran d'accueil : une seule page, 4 sélecteurs + modes spéciaux + bouton "Trouve une idée".
import { useState } from 'react'
import SelecteurChips from '../composants/SelecteurChips'
import Illustration from '../composants/Illustration'
import { AGES, LIEUX, HUMEURS, TEMPS, QUOTA_GRATUIT } from '../data/vocab'

export default function Accueil({
  criteres, setCriteres,
  epuise, setEpuise,
  pluie, setPluie,
  ideesRestantes, estPremium,
  onChercher,
}) {
  const maj = (cle) => (val) => setCriteres((c) => ({ ...c, [cle]: val }))
  const pret = criteres.age && criteres.lieu && criteres.humeur && criteres.temps
  const [graineMascotte] = useState(() => Math.random().toString(36).slice(2))

  // le mode pluie force "maison" : on grise le sélecteur de lieu quand il est actif
  const lieuVerrouille = pluie

  return (
    <div className="max-w-md mx-auto px-5 pb-32 pt-8">
      {/* En-tête / signature */}
      <header className="text-center mb-8">
        <div className="h-32 mb-1 flex justify-center">
          <Illustration type="mascotte" seed={graineMascotte} className="max-h-full max-w-full" />
        </div>
        <div className="inline-flex items-center gap-2 mb-1">
          <span className="font-display font-bold text-4xl text-nuit tracking-tight">Écran</span>
          <span className="font-display font-bold text-4xl text-papier bg-soleil rounded-2xl px-3 py-0.5 -rotate-2 inline-block shadow-bouton">
            OFF
          </span>
        </div>
        <p className="font-body font-bold text-nuit/60 mt-2">L'appli qui remplace l'appli.</p>
      </header>

      {/* Modes spéciaux */}
      <div className="flex gap-2.5 mb-7">
        <ModeToggle
          actif={epuise}
          onClick={() => setEpuise((v) => !v)}
          emoji="😮‍💨"
          label="Je suis épuisé·e"
        />
        <ModeToggle
          actif={pluie}
          onClick={() => setPluie((v) => !v)}
          emoji="🌧️"
          label="Il pleut"
        />
      </div>

      {/* Les 4 questions */}
      <SelecteurChips
        titre="Quel âge a l'enfant ?"
        options={AGES}
        valeur={criteres.age}
        onChange={maj('age')}
      />

      <div className={lieuVerrouille ? 'opacity-40 pointer-events-none' : ''}>
        <SelecteurChips
          titre={lieuVerrouille ? 'Où ? (mode pluie → maison)' : 'Vous êtes où ?'}
          options={LIEUX}
          valeur={pluie ? 'maison' : criteres.lieu}
          onChange={maj('lieu')}
          colonnes={3}
          vertical
        />
      </div>

      <SelecteurChips
        titre="L'humeur de l'enfant ?"
        options={HUMEURS}
        valeur={criteres.humeur}
        onChange={maj('humeur')}
        colonnes={2}
      />

      <SelecteurChips
        titre="Tu as combien de temps ?"
        options={TEMPS}
        valeur={criteres.temps}
        onChange={maj('temps')}
        colonnes={2}
      />

      {/* CTA fixe en bas */}
      <div className="fixed bottom-0 inset-x-0 bg-gradient-to-t from-papier via-papier to-transparent pt-8 pb-5 px-5">
        <div className="max-w-md mx-auto">
          <button
            type="button"
            disabled={!pret}
            onClick={onChercher}
            className={[
              'w-full rounded-2xl font-display font-semibold text-xl py-4 transition-all',
              pret
                ? 'bg-soleil text-white shadow-bouton active:translate-y-1'
                : 'bg-creme2 text-nuit/30 cursor-not-allowed',
            ].join(' ')}
          >
            ✨ Trouve une idée
          </button>
          {!estPremium && (
            <p className="text-center text-xs text-nuit/50 mt-2">
              {ideesRestantes > 0
                ? `${ideesRestantes} idée${ideesRestantes > 1 ? 's' : ''} gratuite${ideesRestantes > 1 ? 's' : ''} aujourd'hui`
                : `Limite du jour atteinte — reviens demain`}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function ModeToggle({ actif, onClick, emoji, label }) {
  return (
    <button
      type="button"
      aria-pressed={actif}
      onClick={onClick}
      className={[
        'flex-1 rounded-2xl px-3 py-2.5 text-sm font-body font-bold border-2 transition-all active:scale-[0.97]',
        actif
          ? 'bg-nuit text-papier border-nuit'
          : 'bg-white text-nuit/70 border-creme2',
      ].join(' ')}
    >
      <span className="mr-1">{emoji}</span>{label}
    </button>
  )
}
