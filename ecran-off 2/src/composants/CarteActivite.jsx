// La carte d'activité : le cœur de l'app, le moment où le parent obtient son idée.
import { materielDejaLa } from '../lib/moteur'
import Illustration, { FOND_TYPE } from './Illustration'

const LABEL_TYPE = {
  jeu: 'Jeu', creation: 'Création', mouvement: 'Bouge',
  exploration: 'Explore', calme: 'Au calme', defi: 'Défi',
}

const AUTONOMIE = {
  totale: { txt: '🧩 Il joue seul', cls: 'bg-[#E7EEFB] text-[#2E4C86]' },
  avec_lancement: { txt: '🧩 Tu lances, il continue', cls: 'bg-[#E7EEFB] text-[#2E4C86]' },
}

function Pastille({ children, vert = false }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full font-body font-bold text-xs px-3 py-1.5',
        vert ? 'bg-[#E7F4E5] text-[#2C5E2C]' : 'bg-creme2 text-nuit',
      ].join(' ')}
    >
      {children}
    </span>
  )
}

export default function CarteActivite({ activite, onAutre, onAccueil, onPartage }) {
  const dejaLa = materielDejaLa(activite)
  const fond = FOND_TYPE[activite.type] || '#FFE9D4'

  return (
    <div className="anim-pop bg-white rounded-xl2 shadow-carte overflow-hidden">
      {/* HÉRO ILLUSTRÉ */}
      <div className="relative h-44 overflow-hidden" style={{ backgroundColor: fond }}>
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <Illustration type={activite.type} seed={activite.id} className="max-h-full max-w-full" />
        </div>
        <span className="absolute top-3.5 left-3.5 font-display inline-flex items-center rounded-full bg-nuit/90 text-papier text-xs font-semibold px-3 py-1">
          {LABEL_TYPE[activite.type] || activite.type}
        </span>
        <span className="absolute top-3.5 right-3.5 inline-flex items-center rounded-full bg-white/90 text-nuit text-xs font-bold px-3 py-1">
          ⏱ {activite.duree.ideal} min · {activite.age.min}-{activite.age.max} ans
        </span>
      </div>

      <div className="px-6 pt-5 pb-2">
        <h2 className="font-display font-bold text-2xl leading-tight text-nuit">{activite.titre}</h2>
        <p className="font-body italic text-nuit/80 mt-2 leading-snug">{activite.accroche}</p>
      </div>

      <div className="px-6 py-4 space-y-5">
        {/* matériel allégé en pastilles */}
        <div className="flex flex-wrap gap-2">
          {AUTONOMIE[activite.autonomie] && (
            <span className={`inline-flex items-center gap-1.5 rounded-full font-body font-bold text-xs px-3 py-1.5 ${AUTONOMIE[activite.autonomie].cls}`}>
              {AUTONOMIE[activite.autonomie].txt}
            </span>
          )}
          {dejaLa && <Pastille vert>✅ Tu as déjà tout</Pastille>}
          {activite.sansMateriel ? (
            !dejaLa && <Pastille vert>✅ Rien à préparer</Pastille>
          ) : (
            activite.materiel.map((m, i) => (
              <Pastille key={i}>
                {m.nom}
                {!m.courant && <span className="text-nuit/40"> · à prévoir</span>}
              </Pastille>
            ))
          )}
        </div>

        {/* étapes, aérées */}
        <ol className="space-y-2.5">
          {activite.etapes.map((e, i) => (
            <li key={i} className="flex gap-3 font-body leading-snug">
              <span className="flex-none w-6 h-6 rounded-full bg-soleil text-white font-display font-semibold text-sm grid place-items-center mt-0.5">
                {i + 1}
              </span>
              <span>{e}</span>
            </li>
          ))}
        </ol>

        {/* astuce */}
        {activite.astuce && (
          <div className="bg-creme2 rounded-2xl px-4 py-3">
            <p className="font-body text-sm leading-snug">
              <span className="font-bold">💡 L'astuce : </span>
              {activite.astuce}
            </p>
          </div>
        )}
      </div>

      {/* actions */}
      <div className="px-6 pb-6 pt-1 space-y-3">
        <button
          type="button"
          onClick={onAutre}
          className="w-full rounded-2xl bg-nuit text-papier font-display font-semibold text-lg py-4 active:translate-y-0.5 transition-transform"
        >
          🎲 Une autre idée
        </button>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onPartage}
            className="flex-1 rounded-2xl bg-white border-2 border-creme2 text-nuit font-body font-bold py-3 active:scale-[0.98] transition-transform"
          >
            📲 Partager
          </button>
          <button
            type="button"
            onClick={onAccueil}
            className="flex-1 rounded-2xl bg-white border-2 border-creme2 text-nuit font-body font-bold py-3 active:scale-[0.98] transition-transform"
          >
            ↺ Changer
          </button>
        </div>
      </div>
    </div>
  )
}
