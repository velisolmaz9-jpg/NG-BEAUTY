# NG BEAUTY — Site vitrine

Site vitrine du Beauty Studio **NG BEAUTY** (Seynod / Annecy), spécialisé dans la beauté du regard et les extensions de cils. Site statique en HTML / CSS / JS, sans dépendance ni framework.

## Structure du projet

```
/
├── index.html          Accueil
├── prestations.html    Liste complète des prestations
├── about.html          À propos (Nisa / le studio)
├── gallery.html        Réalisations (mosaïque + lightbox)
├── contact.html         Adresse, horaires, carte
├── legal.html           Mentions légales
├── privacy.html         Politique de confidentialité
├── cgv.html              Conditions générales de vente
├── css/
│   └── style.css        Design system complet (variables, typographies, sections, responsive)
├── js/
│   └── script.js         Header au scroll, menu mobile, animations, lightbox
└── assets/               Logos, favicon, visuels placeholder
```

## Lancer le site en local

Aucune installation n'est nécessaire. Ouvrez `index.html` dans un navigateur, ou lancez un petit serveur local :

```bash
python3 -m http.server 8000
```

Puis rendez-vous sur `http://localhost:8000`.

## Logo officiel

Le logo NG BEAUTY fourni par le client est l'asset de marque utilisé partout sur le site (jamais recréé) :

| Fichier | Contenu | Utilisé pour |
|---|---|---|
| `assets/logo.png` | Logo complet, couleurs d'origine (noir + or), fond transparent | En-tête une fois la page défilée (fond clair) |
| `assets/logo-white.png` | Logo complet, texte recoloré en ivoire (or inchangé), fond transparent | En-tête au repos, hero, footer (fonds sombres) |
| `assets/logo-mark.png` / `logo-mark-white.png` | Monogramme seul (arc, étoiles, « NG »), recadré depuis le même fichier | Badge décoratif sur la photo « À propos » |
| `assets/favicon-32.png`, `favicon-512.png`, `apple-touch-icon.png` | Monogramme seul sur fond noir arrondi | Favicon / icône d'écran d'accueil |

Ces fichiers sont générés à partir du logo original fourni (recadrage et, pour les variantes « white », une recoloration du texte noir en ivoire afin de rester lisible sur fond sombre — le dessin, les proportions et la couleur or ne sont jamais modifiés). Si le logo évolue, il suffit de remplacer `assets/logo.png` (fond transparent, couleurs d'origine) et de régénérer les variantes claires/sombres et le favicon à partir de ce nouveau fichier.

## ⚠️ À compléter avant mise en ligne

Aucune information (tarif, horaire, avis) n'a été inventée : seules les données transmises ont été utilisées. Les éléments suivants sont en **placeholder** et doivent être remplacés :

### 1. Photos et vidéos

Tous les visuels sont actuellement des placeholders SVG (fond sombre, encadré doré). Remplacez les fichiers suivants dans `assets/` par de vraies photos/vidéos, **en conservant le même nom de fichier** (ou mettez à jour le `src` correspondant dans le HTML) :

| Fichier à remplacer | Utilisé pour | Format conseillé |
|---|---|---|
| `assets/hero-portrait-wide.svg` → `.jpg` | Visuel principal du hero (page d'accueil) | Paysage, min. 1800×1100 |
| `assets/about-1.svg` → `.jpg` | Photo du studio | Portrait, min. 1000×1200 |
| `assets/about-2.svg` → `.jpg` | Portrait de Nisa | Portrait, min. 1000×1200 |
| `assets/gallery-1.svg` à `gallery-9.svg` → `.jpg` | Mosaïque « Réalisations », collage d'accueil et cartes « Prestations » | Carré ou portrait, min. 900×900 |
| `assets/gallery-video-1.svg` → `.mp4` | Vidéo verticale dans la galerie | Vertical 9:16 |
| `assets/avatar-1.svg` à `avatar-3.svg` → `.jpg` | Photos rondes (avis clientes, mini-stack du hero) | Carré, min. 300×300 |
| `assets/final-cta-bleed.svg` → `.jpg` | Visuel de la section de réservation finale | Portrait, min. 900×1050 |
| `assets/og-image.svg` → `.jpg` | Image de partage réseaux sociaux | 1200×630 |

Si vous passez en `.jpg`/`.mp4`, pensez à mettre à jour l'extension dans les balises `src=""` et `data-src=""` correspondantes.

### 2. Avis clients

Les avis affichés sur `index.html` (section « Elles nous font confiance ») sont des emplacements `[Avis à insérer depuis Planity]`. Remplacez-les par les avis réels visibles sur la fiche Planity, avec le prénom de la cliente si disponible.

### 3. Mentions légales, confidentialité, CGV

Les pages `legal.html`, `privacy.html` et `cgv.html` contiennent des zones `[À compléter]` (SIRET, hébergeur, responsable de publication, conditions d'annulation...). Une relecture juridique est recommandée avant mise en ligne.

### 4. Domaine et SEO

Le domaine `https://www.ngbeauty-annecy.fr` est utilisé comme placeholder dans les balises `canonical` et Open Graph de chaque page. Remplacez-le par le nom de domaine réel une fois choisi, et mettez à jour `robots.txt` / `sitemap.xml` en conséquence.

## Liens externes utilisés

- Réservation : [planity.com/ng-beauty-annecy](https://www.planity.com/ng-beauty-annecy)
- Instagram : [@ngbeauty._](https://www.instagram.com/ngbeauty._/)

## Bonnes pratiques déjà en place

- **Responsive** mobile-first, sans débordement horizontal.
- **Accessibilité** : `alt` sur les images, `aria-label` sur les boutons icônes, navigation clavier.
- **Performance** : aucune dépendance externe hors polices Google Fonts, images en `loading="lazy"`.
- **Animations douces** : apparition au scroll, micro-interactions, respect de `prefers-reduced-motion`.
