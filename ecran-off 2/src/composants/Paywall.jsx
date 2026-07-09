// Limite freemium atteinte. Placeholder à brancher sur Stripe (comme Soïa) plus tard.
import { QUOTA_GRATUIT } from '../data/vocab'
import Illustration from './Illustration'

export default function Paywall({ onAccueil }) {
  return (
    <div className="anim-pop bg-white rounded-xl2 shadow-carte px-6 py-8 text-center">
      <div className="h-32 mb-3 flex justify-center"><Illustration type="soir" seed="soir" className="max-h-full max-w-full" /></div>
      <h2 className="font-display font-bold text-2xl text-nuit mb-2">
        Tes {QUOTA_GRATUIT} idées du jour, c'est fait !
      </h2>
      <p className="font-body text-nuit/70 leading-snug mb-6">
        Belle journée sans écran. Reviens demain pour {QUOTA_GRATUIT} nouvelles idées gratuites…
        ou passe en illimité pour ne jamais tomber en panne d'inspiration.
      </p>

      <button
        type="button"
        disabled
        className="w-full rounded-2xl bg-soleil/50 text-white font-display font-semibold text-lg py-4 mb-3 cursor-not-allowed"
      >
        Passer en illimité (bientôt)
      </button>
      <button
        type="button"
        onClick={onAccueil}
        className="w-full rounded-2xl bg-white border-2 border-creme2 text-nuit font-body font-bold py-3"
      >
        Retour à l'accueil
      </button>

      <p className="text-xs text-nuit/40 mt-5">
        Abonnement famille à venir — paiement Stripe à connecter.
      </p>
    </div>
  )
}
