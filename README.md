# DZ CATERING - Site Web Officiel

Plateforme web moderne et haut de gamme pour les services de traiteur, banquets et événements de prestige (**DZ CATERING**).

---

## 📐 Architecture Responsive & Système de Mesures (Identique au Standard Urfa Sofrası)

Ce projet intègre l'architecture responsive éprouvée garantissant un affichage parfait sur tous les types d'écrans :

### 1. Système de Dimensionnement Proportionnel (Fluid Font Scaling)
Le fichier `src/app/globals.css` calcule automatiquement la taille de base :
- **Mobiles (< 640px) :** `font-size: 15px` pour un confort de lecture optimal.
- **Tablettes (640px - 1023px) :** `font-size: 16px`.
- **Laptops & Écrans Bureaux (1024px - 1919px) :**
  ```css
  font-size: calc(13px + 0.35vw);
  ```
  Permet d'étendre harmonieusement tous les éléments et marges sans avoir besoin de breakpoints superflus.
- **Grands Écrans & 4K (>= 1920px) :** Plafonné à `19.5px` avec container `max-w-7xl` pour préserver le centrage et la netteté du design.

### 2. Points de Rupture (Breakpoints Standard Tailwind v4)
- `sm:` : 640px
- `md:` : 768px
- `lg:` : 1024px (Transition Menu Desktop / Mobile)
- `xl:` : 1280px (Grille des formules à 3 colonnes confortables)
- `2xl:` : 1536px

### 3. Règles d'Espacement & Hauteurs
- **Dégagement Header Fixe :** `pt-32 sm:pt-40 lg:pt-48`
- **Containers Centrés :** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

---

## 🛠️ Stack Technique

- **Framework :** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling :** Tailwind CSS v4 avec polices Google Fonts (*Plus Jakarta Sans* & *Playfair Display*)
- **Smooth Scroll :** Lenis
- **Animations :** Framer Motion
- **Icônes :** Lucide React

---

## 🚀 Démarrage Rapide

Pour lancer le serveur de développement :

```bash
npm run dev
```

Puis ouvrez votre navigateur sur `http://localhost:3000` (ou le port attribué).
