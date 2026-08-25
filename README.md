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

## Visuels des prestations, galerie et CTA final (visuels illustratifs)

Les cartes de la section « Nos prestations » (accueil et `prestations.html`), la mosaïque « Réalisations » (`gallery.html`), le collage de l'accueil et le visuel de la section de réservation finale utilisent des photos recadrées depuis la planche de référence beauté fournie par le client :

| Fichier | Contenu |
|---|---|
| `assets/prestation-rehaussement.jpg` | Rehaussement de cils + teinture |
| `assets/prestation-megavolume.jpg` | Remplissage méga volume russe |
| `assets/prestation-volumerusse.jpg` | Remplissage russe |
| `assets/prestation-mixte.jpg` | Remplissage mixte |
| `assets/prestation-depose.jpg` | Dépose + shampooing |
| `assets/prestation-blanchiment.jpg` | Blanchiment dentaire — 1 séance |
| `assets/prestation-blanchiment-2.jpg` | Blanchiment dentaire — 2 séances |
| `assets/gallery-1.jpg` à `gallery-9.jpg` | Mosaïque « Réalisations », collage d'accueil |
| `assets/final-cta-bleed.jpg` | Visuel vertical de la section de réservation finale |

⚠️ **Ce sont des visuels génériques d'illustration, recadrés depuis la planche de référence** — ce ne sont ni des photos de clientes NG BEAUTY, ni des réalisations réelles du studio. Ils sont signalés comme tels via l'attribut `alt` de chaque image (« — visuel illustratif »), sans mention visible intrusive sur la page. Remplacez ces fichiers par de vraies photos du studio dès que possible, en conservant les mêmes noms.

La galerie ne contient plus de vignette vidéo factice : la case autrefois occupée par `gallery-video-1.svg` est désormais une photo (`gallery-3.jpg`). Une vraie vidéo verticale pourra être ajoutée plus tard sur n'importe quelle case de la mosaïque en utilisant `data-lightbox="video"` (déjà géré par `js/script.js`).

## ⚠️ À compléter avant mise en ligne

Aucune information (tarif, horaire, avis) n'a été inventée : seules les données transmises ont été utilisées. Les éléments suivants restent en **placeholder** et doivent être remplacés :

### 1. Photos et vidéos encore en placeholder abstrait

Ces trois visuels restent des graphismes abstraits sans photo (fond sombre, encadré doré, motif de cil stylisé) — aucune image stock ni générée n'a été utilisée à leur place :

| Fichier à remplacer | Utilisé pour | Format conseillé |
|---|---|---|
| `assets/hero-portrait-wide.svg` → `.jpg` | Visuel principal du hero (page d'accueil) — nécessite une vraie photo haute résolution | Paysage, min. 1800×1100 |
| `assets/about-1.svg` → `.jpg` | Photo du studio | Portrait, min. 1000×1200 |
| `assets/about-2.svg` → `.jpg` | Portrait de Nisa | Portrait, min. 1000×1200 |

⚠️ **`about-2.svg` (portrait de Nisa) : ne jamais remplacer par une photo stock, ni par une image générée censée représenter Nisa.** Seule une vraie photo de Nisa doit être utilisée ici. En attendant, le graphisme reste volontairement abstrait (aucun visage, réel ou généré).

Si vous passez en `.jpg`, pensez à mettre à jour l'extension dans les balises `src=""` correspondantes.

Les photos rondes (`assets/avatar-1.svg` à `avatar-3.svg`, utilisées pour les avis clientes) restent également des icônes abstraites neutres et peuvent être remplacées par de vraies photos de profil si les clientes concernées donnent leur accord — sinon, conservez une présentation neutre.

### 2. Avis clients

Les 7 avis affichés sur `index.html` (section « Elles en parlent mieux que nous ») sont les avis réels récupérés depuis la fiche Planity du studio, retranscrits tels quels (texte et emoji d'origine), avec une présentation neutre (« Cliente vérifiée », sans nom ni date ni avatar inventés). D'autres avis réels existent sur la fiche Planity au-delà de ces 7 ; ajoutez-les dans le même carrousel au fur et à mesure si vous voulez les afficher tous.

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
