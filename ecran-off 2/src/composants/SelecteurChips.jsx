// Un groupe de "chips" tappables pour choisir une valeur (âge, lieu, humeur, temps).

export default function SelecteurChips({ titre, options, valeur, onChange, colonnes = 'auto', vertical = false }) {
  const grilleClass =
    colonnes === 2 ? 'grid grid-cols-2'
    : colonnes === 3 ? 'grid grid-cols-3'
    : 'flex flex-wrap'

  return (
    <fieldset className="mb-6">
      <legend className="font-display font-semibold text-lg text-nuit mb-3">{titre}</legend>
      <div className={`gap-2.5 ${grilleClass}`}>
        {options.map((opt) => {
          const actif = valeur === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={actif}
              onClick={() => onChange(opt.id)}
              className={[
                'rounded-2xl border-2 transition-all duration-150 active:scale-[0.97]',
                vertical
                  ? 'px-3 py-4 flex flex-col items-center justify-center text-center gap-1.5'
                  : 'px-4 py-3 text-left',
                actif
                  ? 'bg-nuit text-papier border-nuit shadow-carte'
                  : 'bg-white text-nuit border-creme2 hover:border-soleil',
              ].join(' ')}
            >
              {vertical ? (
                <>
                  {opt.emoji && <span className="text-3xl leading-none">{opt.emoji}</span>}
                  <span className="font-body font-bold leading-tight">{opt.label}</span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-2">
                    {opt.emoji && <span className="text-xl leading-none">{opt.emoji}</span>}
                    <span className="font-body font-bold leading-tight">{opt.label}</span>
                  </span>
                  {opt.sous && (
                    <span className={`block text-xs mt-0.5 ${actif ? 'text-papier/70' : 'text-nuit/50'}`}>
                      {opt.sous}
                    </span>
                  )}
                </>
              )}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
