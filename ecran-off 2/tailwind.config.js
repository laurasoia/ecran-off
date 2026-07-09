/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // palette alignée sur les illustrations de Laura (pop, chaleureuse)
        papier: '#FDF6F0',   // crème de fond, adoucie
        nuit: '#33303E',     // encre (texte)
        soleil: '#E87058',   // corail — accent principal
        rose: '#E275A4',
        turquoise: '#2EBCA1',
        violet: '#6A71D3',
        herbe: '#66A967',
        miel: '#F3D43D',
        corail: '#F2917A',
        creme2: '#FBDCC9',   // pêche doux pour cartes/pastilles
      },
      fontFamily: {
        display: ['Fredoka', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: { xl2: '1.75rem' },
      boxShadow: {
        carte: '0 10px 30px -12px rgba(51, 48, 62, 0.25)',
        bouton: '0 6px 0 0 rgba(51, 48, 62, 0.18)',
      },
    },
  },
  plugins: [],
}
