/**
 * TCM Japanimation — Données catalogue (mock)
 * Sera remplacé par un appel API ou un CMS headless.
 *
 * Structure d'un produit :
 * {
 *   id:           string (unique)
 *   nom:          string
 *   licence:      string   (pokemon | yugioh | onepiece | lorcana | dragonball | naruto | magicthegathering | ...)
 *   type:         string   (cartes | display | figurine | goodie | accessoire)
 *   disponibilite:string   (en-stock | precommande | rupture)
 *   prix:         number   (EUR)
 *   image:        string   (chemin relatif ou URL)
 *   rarete:       string?  (commune | peu-commune | rare | ultra-rare | secret-rare) — TCG seulement
 *   etat:         string?  (neuf | excellent | bon | usage) — cartes à l'unité
 *   description:  string
 *   tags:         string[]
 * }
 */

export const PRODUCTS = [
  {
    id: 'pok-ev-display-01',
    nom: 'Display Pokémon Écarlate & Violet — Évolutions à Paldea',
    licence: 'pokemon',
    type: 'display',
    disponibilite: 'en-stock',
    prix: 149.99,
    image: 'assets/img/products/placeholder.webp',
    description: 'Boîte de 36 boosters de l\'extension Évolutions à Paldea.',
    tags: ['display', 'booster', 'ecarlate-violet'],
  },
  {
    id: 'ygo-tin-duelist-nexus',
    nom: 'Yu-Gi-Oh! — Tin Mega-Pack Duelist Nexus',
    licence: 'yugioh',
    type: 'accessoire',
    disponibilite: 'precommande',
    prix: 34.99,
    image: 'assets/img/products/placeholder.webp',
    description: 'Tin collector avec 3 mega-packs et une carte exclusive.',
    tags: ['tin', 'collector', 'duelist-nexus'],
  },
  {
    id: 'op-display-op06',
    nom: 'One Piece Card Game — Display OP-06 Twin Champions',
    licence: 'onepiece',
    type: 'display',
    disponibilite: 'en-stock',
    prix: 109.99,
    image: 'assets/img/products/placeholder.webp',
    description: 'Display de 24 boosters de l\'extension Twin Champions.',
    tags: ['display', 'booster', 'op06'],
  },
  {
    id: 'fig-goku-masterlise',
    nom: 'Figurine Goku Super Saiyan — MegaHouse Masterlise',
    licence: 'dragonball',
    type: 'figurine',
    disponibilite: 'en-stock',
    prix: 79.99,
    image: 'assets/img/products/placeholder.webp',
    description: 'Figurine Goku Super Saiyan Blue, gamme Masterlise Ichibansho.',
    tags: ['figurine', 'goku', 'super-saiyan', 'megahouse'],
  },
];

export const LICENCES = [
  { id: 'pokemon',         label: 'Pokémon',            icon: '🔵' },
  { id: 'yugioh',          label: 'Yu-Gi-Oh!',          icon: '⚡' },
  { id: 'onepiece',        label: 'One Piece',           icon: '⚓' },
  { id: 'lorcana',         label: 'Lorcana',             icon: '✨' },
  { id: 'dragonball',      label: 'Dragon Ball',         icon: '🐉' },
  { id: 'naruto',          label: 'Naruto',              icon: '🍥' },
  { id: 'magicthegathering', label: 'Magic: TG',         icon: '🔮' },
];

export const TYPES = [
  { id: 'cartes',      label: 'Cartes à l\'unité' },
  { id: 'display',     label: 'Displays' },
  { id: 'figurine',    label: 'Figurines' },
  { id: 'goodie',      label: 'Goodies' },
  { id: 'accessoire',  label: 'Accessoires' },
];

export const DISPONIBILITES = [
  { id: 'en-stock',    label: 'En stock' },
  { id: 'precommande', label: 'Précommande' },
  { id: 'rupture',     label: 'Rupture' },
];
