import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Écran OFF',
        short_name: 'Écran OFF',
        description: "L'appli qui remplace l'appli — des idées d'activités pour éloigner les enfants des écrans.",
        theme_color: '#FF7A45',
        background_color: '#FFF4E8',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        // met en cache l'app + la bibliothèque pour un usage hors-ligne complet
        globPatterns: ['**/*.{js,css,html,svg,png,json,woff2}']
      }
    })
  ]
})
