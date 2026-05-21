// TCM Japanimation — Données catalogue (window globals, compatible file://)
window.TCM_LICENCES = [
  { id: 'pokemon',           label: 'Pokémon',              icon: '⚡' },
  { id: 'yugioh',            label: 'Yu-Gi-Oh!',            icon: '🃏' },
  { id: 'onepiece',          label: 'One Piece',            icon: '⚓' },
  { id: 'lorcana',           label: 'Lorcana',              icon: '✨' },
  { id: 'dragonball',        label: 'Dragon Ball',          icon: '🔮' },
  { id: 'naruto',            label: 'Naruto',               icon: '🍃' },
  { id: 'magicthegathering', label: 'Magic: The Gathering', icon: '🧙' },
];

window.TCM_TYPES = [
  { id: 'cartes',   label: 'Cartes & Boosters' },
  { id: 'figurine', label: 'Figurines' },
  { id: 'goodie',   label: 'Goodies' },
];

window.TCM_DISPONIBILITES = [
  { id: 'en-stock',    label: 'En stock',    cls: 'badge--green' },
  { id: 'precommande', label: 'Précommande', cls: 'badge--accent' },
];

window.TCM_PRODUCTS = [
  // ── POKÉMON ──────────────────────────────────────────────────
  {
    id: 'pok-display-surging-sparks',
    nom: 'Display Étincelles Déferlantes — Écarlate & Violet SV8',
    licence: 'pokemon', type: 'cartes', disponibilite: 'en-stock', prix: 179.99, nouveau: true,
    description: 'Boîte de 36 boosters de la série Étincelles Déferlantes. Pikachu EX, Raichu EX et de sublimes cartes Illustrateur Rare. Le must-have Pokémon de fin 2024, incontournable pour collectionneurs !',
    tags: ['display','surging-sparks','sv8','pikachu','raichu','ex'],
  },
  {
    id: 'pok-etb-prismatic',
    nom: 'Elite Trainer Box — Évolutions Prismatiques',
    licence: 'pokemon', type: 'cartes', disponibilite: 'en-stock', prix: 69.99, nouveau: true,
    description: '9 boosters Évolutions Prismatiques + 65 sleeves holographiques Évoli + marqueurs PV + dés + badge Dresseur. La box collector de l\'année. Stock très limité !',
    tags: ['etb','elite-trainer-box','prismatic','evoli','eevee'],
  },
  {
    id: 'pok-display-stellar-crown',
    nom: 'Display Couronne Stellaire — Écarlate & Violet SV7',
    licence: 'pokemon', type: 'cartes', disponibilite: 'en-stock', prix: 159.99, nouveau: false,
    description: '36 boosters. Terapagos EX et Pecharunt EX en vedette. Cartes Hyper Rare et Illustrateur Rare. Très apprécié des collectionneurs et joueurs compétitifs.',
    tags: ['display','stellar-crown','sv7','terapagos'],
  },
  {
    id: 'pok-display-paldean-fates',
    nom: 'Display Destins de Paldea — Pokémon Shiny',
    licence: 'pokemon', type: 'cartes', disponibilite: 'en-stock', prix: 189.99, nouveau: false,
    description: '36 boosters. Dodonex ex, Skeledirge ex, Quaquaval ex en version Shiny rare. Le set des shiny hunters — recherché partout en Europe !',
    tags: ['display','paldean-fates','shiny','dodonex','skeledirge'],
  },
  {
    id: 'pok-tin-charizard',
    nom: 'Tin Méga — Dracaufeu ex Teracristal Obsinuit',
    licence: 'pokemon', type: 'cartes', disponibilite: 'en-stock', prix: 28.99, nouveau: false,
    description: '3 boosters Écarlate & Violet + 1 carte promo exclusive Dracaufeu ex Teracristal Obsinuit. Parfaite comme cadeau ou pour débuter sa collection.',
    tags: ['tin','dracaufeu','charizard','promo','teracristal'],
  },
  {
    id: 'pok-booster-surging',
    nom: 'Booster unitaire — Étincelles Déferlantes',
    licence: 'pokemon', type: 'cartes', disponibilite: 'en-stock', prix: 4.99, nouveau: false,
    description: '10 cartes dont au moins une holographique. Tentez votre chance pour une Illustrateur Rare ou une carte EX !',
    tags: ['booster','surging-sparks','sv8'],
  },

  // ── YU-GI-OH! ────────────────────────────────────────────────
  {
    id: 'ygo-display-rarity-collection',
    nom: 'Display 25th Anniversary Rarity Collection II',
    licence: 'yugioh', type: 'cartes', disponibilite: 'en-stock', prix: 129.99, nouveau: true,
    description: '24 boosters. Célébration des 25 ans de Yu-Gi-Oh! avec rééditions en Prismatic Secret Rare et Quarter Century Secret Rare. Pour collectionneurs exigeants.',
    tags: ['display','25th-anniversary','rarity-collection','quarter-century','prismatic'],
  },
  {
    id: 'ygo-display-phantom-nightmare',
    nom: 'Display Phantom Nightmare',
    licence: 'yugioh', type: 'cartes', disponibilite: 'en-stock', prix: 89.99, nouveau: false,
    description: '24 boosters. Cartes Snake-Eye, Centur-Ion et Fiendsmith dominantes en méta. Rééditions Dragon Link et Branded très demandées.',
    tags: ['display','phantom-nightmare','snake-eye','centurion','fiendsmith'],
  },
  {
    id: 'ygo-display-legacy-destruction',
    nom: 'Display Legacy of Destruction',
    licence: 'yugioh', type: 'cartes', disponibilite: 'en-stock', prix: 99.99, nouveau: false,
    description: '24 boosters. Vaylantz, Dragon Maids et Labrynth avec de nouvelles cartes puissantes. Set incontournable pour le format compétitif.',
    tags: ['display','legacy-of-destruction','vaylantz','labrynth'],
  },
  {
    id: 'ygo-structure-fire-kings',
    nom: 'Structure Deck — Fire Kings (FR)',
    licence: 'yugioh', type: 'cartes', disponibilite: 'en-stock', prix: 12.99, nouveau: false,
    description: '43 cartes dont 5 nouvelles inédites. Archétype Fire King revisité avec de nouveaux boss monsters. Deck prêt-à-jouer idéal pour débutants.',
    tags: ['structure-deck','fire-kings','fr'],
  },
  {
    id: 'ygo-tin-mega-pack-2024',
    nom: 'Tin Méga-Pack 2024 — Édition Collector',
    licence: 'yugioh', type: 'cartes', disponibilite: 'precommande', prix: 34.99, nouveau: true,
    description: '3 méga-packs 2024 + 1 carte promo exclusive Ultra Rare. Idéal pour compléter sa collection avec des cartes récentes à prix réduit. Édition limitée.',
    tags: ['tin','mega-pack','2024','collector','promo'],
  },

  // ── ONE PIECE TCG ─────────────────────────────────────────────
  {
    id: 'op-display-op09',
    nom: 'One Piece TCG — Display OP-09 The Four Emperors',
    licence: 'onepiece', type: 'cartes', disponibilite: 'en-stock', prix: 109.99, nouveau: true,
    description: '24 boosters. Shanks, Kaido, Big Mom et Barbe-Blanche en cartes Alternate Art spectaculaires. Nouvelles cartes SP et Super Parallel exclusives à ce set !',
    tags: ['display','op09','four-emperors','shanks','kaido','big-mom'],
  },
  {
    id: 'op-display-op07',
    nom: 'One Piece TCG — Display OP-07 500 Years in the Future',
    licence: 'onepiece', type: 'cartes', disponibilite: 'en-stock', prix: 99.99, nouveau: false,
    description: '24 boosters. Arc Egghead avec Luffy Gear 5 en Premium Alternate Art. Fort potentiel collecteur et compétitif.',
    tags: ['display','op07','500-years','egghead','luffy','gear5'],
  },
  {
    id: 'op-fig-luffy-gear5',
    nom: 'Figurine Luffy Gear 5 — Ichibansho Bandai',
    licence: 'onepiece', type: 'figurine', disponibilite: 'en-stock', prix: 54.99, nouveau: true,
    description: 'Monkey D. Luffy en Gear 5 par Bandai Ichibansho. ~18 cm. Effets de fumée blancs spectaculaires et sourire iconique du Joy Boy. Finition premium.',
    tags: ['figurine','luffy','gear5','ichibansho','bandai'],
  },
  {
    id: 'op-fig-zoro-wano',
    nom: 'Figurine Roronoa Zoro — Katana Enma (Wano)',
    licence: 'onepiece', type: 'figurine', disponibilite: 'en-stock', prix: 44.99, nouveau: false,
    description: 'Zoro brandissant Enma par Banpresto, style arc Wano. ~21 cm. Pose dynamique, cicatrices et hakama fidèlement reproduits.',
    tags: ['figurine','zoro','enma','wano','banpresto'],
  },

  // ── DRAGON BALL ───────────────────────────────────────────────
  {
    id: 'db-fig-goku-ultra-instinct',
    nom: 'Figurine Goku Ultra Instinct — Masterlise Ichibansho',
    licence: 'dragonball', type: 'figurine', disponibilite: 'en-stock', prix: 89.99, nouveau: true,
    description: 'Son Goku en Ultra Instinct Dominé par MegaHouse Masterlise. 23 cm. Aura argentée chromée et socle lumineux LED. La figurine Dragon Ball de référence.',
    tags: ['figurine','goku','ultra-instinct','masterlise','megahouse','led'],
  },
  {
    id: 'db-fig-gohan-beast',
    nom: 'Figurine Gohan Beast — Ichibansho (DBS: Super Hero)',
    licence: 'dragonball', type: 'figurine', disponibilite: 'precommande', prix: 79.99, nouveau: true,
    description: 'Gohan Beast par Bandai Ichibansho. ~20 cm. Yeux violets et aura spectaculaire du film Super Hero. Livraison Q3 2026 — réservez maintenant !',
    tags: ['figurine','gohan','beast','ichibansho','super-hero','film'],
  },
  {
    id: 'db-fig-vegeta-ssj4',
    nom: 'Figurine Vegeta Super Saiyan 4 — Ichibansho GT',
    licence: 'dragonball', type: 'figurine', disponibilite: 'en-stock', prix: 69.99, nouveau: false,
    description: 'Vegeta SSJ4 par Bandai Ichibansho. ~19 cm. Cheveux rouges et fourrure noire de Dragon Ball GT. Finition de qualité.',
    tags: ['figurine','vegeta','ssj4','super-saiyan-4','gt','ichibansho'],
  },
  {
    id: 'db-fig-piccolo-orange',
    nom: 'Figurine Piccolo Forme Orange — DBS Super Hero',
    licence: 'dragonball', type: 'figurine', disponibilite: 'en-stock', prix: 39.99, nouveau: false,
    description: 'Piccolo en Forme Orange par Banpresto. 18 cm. Issue du film DBS: Super Hero. Manteau orange et dents acérées très détaillés.',
    tags: ['figurine','piccolo','orange','banpresto','super-hero'],
  },
  {
    id: 'db-goodie-boules-cristal',
    nom: 'Set 7 Boules de Cristal — Réplique Taille Réelle',
    licence: 'dragonball', type: 'goodie', disponibilite: 'en-stock', prix: 29.99, nouveau: false,
    description: 'Réplique des 7 Boules de Cristal en résine transparente. Taille réelle, étoiles gravées de 1 à 7. Parfait pour déco ou cosplay.',
    tags: ['goodie','boules-cristal','replica','cosplay'],
  },

  // ── NARUTO ────────────────────────────────────────────────────
  {
    id: 'nar-fig-naruto-sage',
    nom: 'Figurine Naruto — Mode Ermite de la Grenouille',
    licence: 'naruto', type: 'figurine', disponibilite: 'en-stock', prix: 34.99, nouveau: false,
    description: 'Naruto Uzumaki en Mode Ermite par Banpresto. 19 cm. Marquages de Sage et cape de Jiraiya. Pose dynamique.',
    tags: ['figurine','naruto','sage','ermite','banpresto'],
  },
  {
    id: 'nar-fig-itachi-anbu',
    nom: 'Figurine Itachi Uchiha — Tenue Anbu Black Ops',
    licence: 'naruto', type: 'figurine', disponibilite: 'en-stock', prix: 34.99, nouveau: true,
    description: 'Itachi en tenue Anbu par Banpresto. 17 cm. Doigts en mudra, Sharingan et Mangekyou activés. Finition sombre premium.',
    tags: ['figurine','itachi','uchiha','anbu','sharingan','banpresto'],
  },
  {
    id: 'nar-fig-kakashi',
    nom: 'Figurine Kakashi Hatake — Sharingan Révélé',
    licence: 'naruto', type: 'figurine', disponibilite: 'en-stock', prix: 32.99, nouveau: false,
    description: 'Kakashi Hatake avec livre Icha-Icha et Sharingan révélé par Banpresto. 17 cm. Un must-have pour tout fan de Naruto.',
    tags: ['figurine','kakashi','hatake','sharingan','banpresto'],
  },
  {
    id: 'nar-fig-sasuke',
    nom: 'Figurine Sasuke Uchiha — Rinnegan Adulte (Boruto)',
    licence: 'naruto', type: 'figurine', disponibilite: 'en-stock', prix: 34.99, nouveau: false,
    description: 'Sasuke adulte avec Rinnegan par Banpresto. 18 cm. Édition Boruto avec cape de la Rébellion de Kaguya.',
    tags: ['figurine','sasuke','rinnegan','boruto','banpresto'],
  },

  // ── LORCANA ───────────────────────────────────────────────────
  {
    id: 'lor-display-azurite-sea',
    nom: 'Lorcana — Display Azurite Sea (Chapitre 7)',
    licence: 'lorcana', type: 'cartes', disponibilite: 'en-stock', prix: 139.99, nouveau: true,
    description: '24 boosters Chapitre 7. Ariel, Ursula et les profondeurs de l\'océan Disney. Nouvelles cartes Enchanted aux illustrations spectaculaires.',
    tags: ['display','azurite-sea','ch7','ariel','ursula','enchanted'],
  },
  {
    id: 'lor-display-ursulas-return',
    nom: "Lorcana — Display Ursula's Return (Chapitre 5)",
    licence: 'lorcana', type: 'cartes', disponibilite: 'en-stock', prix: 119.99, nouveau: false,
    description: '24 boosters Chapitre 5. Ursula reprend le contrôle avec de nouvelles cartes Floodborn et Enchanted. Très demandé par joueurs compétitifs.',
    tags: ['display','ursulas-return','ch5','ursula','floodborn'],
  },
  {
    id: 'lor-starter-amethyst',
    nom: 'Lorcana — Starter Deck Améthyste & Émeraude',
    licence: 'lorcana', type: 'cartes', disponibilite: 'en-stock', prix: 19.99, nouveau: false,
    description: 'Deck de démarrage 60 cartes prêt-à-jouer avec Mickey et Moana. Idéal pour découvrir les mécaniques de Lorcana.',
    tags: ['starter','deck','amethyst','emeraude','debutant'],
  },

  // ── MAGIC: THE GATHERING ─────────────────────────────────────
  {
    id: 'mtg-display-final-fantasy',
    nom: 'Magic: TG — Display Final Fantasy (EN)',
    licence: 'magicthegathering', type: 'cartes', disponibilite: 'en-stock', prix: 199.99, nouveau: true,
    description: '36 boosters Draft. La collaboration événement Magic × Final Fantasy ! Cloud, Terra, Lightning et tous les boss iconiques en cartes. Stock limité — incontournable !',
    tags: ['display','final-fantasy','ff','cloud','terra','lightning'],
  },
  {
    id: 'mtg-commander-final-fantasy',
    nom: 'Magic: TG — Commander Deck Final Fantasy (FR)',
    licence: 'magicthegathering', type: 'cartes', disponibilite: 'precommande', prix: 54.99, nouveau: true,
    description: '100 cartes dont des inédites exclusives FF. Version française. Jouez Commander avec vos persos de FF VII, IX, X et XIV. Réservez avant rupture !',
    tags: ['commander','final-fantasy','fr','ff7','ff10'],
  },
  {
    id: 'mtg-display-duskmourn',
    nom: 'Magic: TG — Display Duskmourn: House of Horror (EN)',
    licence: 'magicthegathering', type: 'cartes', disponibilite: 'en-stock', prix: 149.99, nouveau: false,
    description: '36 boosters Draft. Univers horreur avec cartes hommage aux classiques du cinéma. Présences Brisées et Traque Inquiétante — brillamment exécuté.',
    tags: ['display','duskmourn','horror'],
  },
  {
    id: 'mtg-display-bloomburrow',
    nom: 'Magic: TG — Display Bloomburrow (EN)',
    licence: 'magicthegathering', type: 'cartes', disponibilite: 'en-stock', prix: 149.99, nouveau: false,
    description: '36 boosters Draft. Monde anthropomorphique d\'animaux héroïques. Acclamé par la communauté Magic comme l\'une des meilleures extensions récentes.',
    tags: ['display','bloomburrow','draft'],
  },
];
