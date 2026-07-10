// Écran d'accueil : une seule page, 4 sélecteurs + modes spéciaux + bouton "Trouve une idée".
import { useState } from 'react'
import SelecteurChips from '../composants/SelecteurChips'
import Illustration from '../composants/Illustration'
import { AGES, LIEUX, HUMEURS, TEMPS, QUOTA_GRATUIT } from '../data/vocab'

export default function Accueil({
  criteres, setCriteres,
  mode, onMode,
  ideesRestantes, estPremium, modeTest,
  onChercher,
}) {
  const maj = (cle) => (val) => setCriteres((c) => ({ ...c, [cle]: val }))
  const pret = criteres.age && criteres.lieu && criteres.humeur && criteres.temps
  const [graineMascotte] = useState(() => Math.random().toString(36).slice(2))

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

      {/* Modes spéciaux (un seul à la fois) */}
      <div className="grid grid-cols-3 gap-2 mb-7">
        <ModeToggle
          actif={mode === 'epuise'}
          onClick={() => onMode('epuise')}
          emoji="😮‍💨"
          label="Épuisé·e"
        />
        <ModeToggle
          actif={mode === 'pluie'}
          onClick={() => onMode('pluie')}
          emoji="🌧️"
          label="Il pleut"
        />
        <ModeToggle
          actif={mode === 'solo'}
          onClick={() => onMode('solo')}
          emoji="🧩"
          label="En solo"
        />
      </div>

      {/* Les 4 questions */}
      <SelecteurChips
        titre="Quel âge a l'enfant ?"
        options={AGES}
        valeur={criteres.age}
        onChange={maj('age')}
      />

      <SelecteurChips
        titre="Vous êtes où ?"
        options={LIEUX}
        valeur={criteres.lieu}
        onChange={maj('lieu')}
        colonnes={3}
        vertical
      />

      <SelecteurChips
        titre="L'humeur de l'enfant ?"
        options={HUMEURS}
        valeur={criteres.humeur}
        onChange={maj('humeur')}
        colonnes={2}
        vertical
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
          {modeTest ? (
            <p className="text-center text-xs font-bold text-soleil mt-2">
              ✨ Accès test illimité — merci de tester 🙏
            </p>
          ) : !estPremium ? (
            <p className="text-center text-xs text-nuit/50 mt-2">
              {ideesRestantes > 0
                ? `${ideesRestantes} idée${ideesRestantes > 1 ? 's' : ''} gratuite${ideesRestantes > 1 ? 's' : ''} aujourd'hui`
                : `Limite du jour atteinte — reviens demain`}
            </p>
          ) : null}
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
        'rounded-2xl px-2 py-2.5 font-body font-bold border-2 transition-all active:scale-[0.97]',
        'flex flex-col items-center justify-center gap-1 text-center',
        actif
          ? 'bg-nuit text-papier border-nuit'
          : 'bg-white text-nuit/70 border-creme2',
      ].join(' ')}
    >
      <span className="text-xl leading-none">{emoji}</span>
      <span className="text-xs leading-tight">{label}</span>
    </button>
  )
}
