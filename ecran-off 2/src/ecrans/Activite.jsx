// Écran activité : affiche la carte, ou un message bienveillant si aucun résultat.
import CarteActivite from '../composants/CarteActivite'
import Illustration from '../composants/Illustration'

export default function Activite({ activite, onAutre, onAccueil, onPartage }) {
  return (
    <div className="max-w-md mx-auto px-5 pt-6 pb-10 min-h-screen">
      <button
        type="button"
        onClick={onAccueil}
        className="font-body font-bold text-nuit/60 mb-4 inline-flex items-center gap-1"
      >
        ← Changer mes choix
      </button>

      {activite ? (
        <CarteActivite
          activite={activite}
          onAutre={onAutre}
          onAccueil={onAccueil}
          onPartage={onPartage}
        />
      ) : (
        <div className="anim-pop bg-white rounded-xl2 shadow-carte px-6 py-10 text-center">
          <div className="h-32 mb-2 flex justify-center"><Illustration type="vide" seed="vide" className="max-h-full max-w-full" /></div>
          <h2 className="font-display font-bold text-2xl text-nuit mb-2">
            Rien sous la main pour cette combinaison
          </h2>
          <p className="font-body text-nuit/70 leading-snug mb-6">
            Essaie d'allonger un peu le temps disponible, ou de changer le lieu —
            on trouvera forcément quelque chose.
          </p>
          <button
            type="button"
            onClick={onAccueil}
            className="w-full rounded-2xl bg-soleil text-white font-display font-semibold text-lg py-4"
          >
            Modifier mes choix
          </button>
        </div>
      )}
    </div>
  )
}
