// Un groupe de "chips" tappables pour choisir une valeur (âge, lieu, humeur, temps).

export default function SelecteurChips({ titre, options, valeur, onChange, colonnes = 'auto' }) {
  const grille =
    colonnes === 2 ? 'grid-cols-2'
    : colonnes === 3 ? 'grid-cols-3'
    : 'flex flex-wrap'

  return (
    <fieldset className="mb-6">
      <legend className="font-display font-semibold text-lg text-nuit mb-3">{titre}</legend>
      <div className={`gap-2.5 ${colonnes === 'auto' ? 'flex flex-wrap' : `grid ${grille}`}`}>
        {options.map((opt) => {
          const actif = valeur === opt.id
          const colore = actif && opt.couleur
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={actif}
              onClick={() => onChange(opt.id)}
              style={colore ? { backgroundColor: opt.couleur, borderColor: opt.couleur } : undefined}
              className={[
                'rounded-2xl px-4 py-3 text-left transition-all duration-150 border-2',
                'active:scale-[0.97]',
                colore
                  ? 'text-white shadow-carte'
                  : actif
                  ? 'bg-nuit text-papier border-nuit shadow-carte'
                  : 'bg-white text-nuit border-creme2 hover:border-soleil',
              ].join(' ')}
            >
              <span className="flex items-center gap-2">
                {opt.emoji && <span className="text-xl leading-none">{opt.emoji}</span>}
                <span className="font-body font-bold leading-tight">{opt.label}</span>
              </span>
              {opt.sous && (
                <span className={`block text-xs mt-0.5 ${actif ? 'text-white/70' : 'text-nuit/50'}`}>
                  {opt.sous}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
