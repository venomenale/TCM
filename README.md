# TCM Japanimation — Site Web

Site vitrine + catalogue pour la boutique TCM Japanimation à Liège.

## Stack
- HTML5 sémantique
- CSS3 (custom properties, mobile-first)
- JavaScript ES2022 Vanilla (modules asynchrones)

## Structure
```
/
├── index.html              # Accueil
├── catalogue.html          # Catalogue produits
├── produit.html            # Fiche produit (template)
├── mentions-legales.html   # Mentions légales + RGPD
├── assets/
│   ├── css/
│   │   ├── main.css        # Variables, reset, layout
│   │   ├── header.css      # Navigation + mobile menu
│   │   ├── footer.css      # Footer légal
│   │   ├── home.css        # Page d'accueil
│   │   ├── catalogue.css   # Grille + filtres
│   │   └── product.css     # Fiche produit
│   ├── js/
│   │   ├── main.js         # Core utils + store status
│   │   ├── nav.js          # Navigation mobile
│   │   ├── catalogue.js    # Filtres + lazy-loading
│   │   ├── rgpd.js         # Consentement cookies
│   │   └── data/
│   │       └── products.js # Données catalogue (mock)
│   └── img/
│       ├── licences/       # Logos licences
│       └── products/       # Photos produits
├── robots.txt
└── .htaccess
```
