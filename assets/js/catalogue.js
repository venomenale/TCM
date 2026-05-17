/**
 * TCM Japanimation — Catalogue JS
 * Filtres croisés asynchrones + lazy-loading images
 * À développer à l'étape 2
 */

'use strict';

// Import des données (sera remplacé par fetch API)
import { PRODUCTS, LICENCES, TYPES, DISPONIBILITES } from './data/products.js';

// TODO étape 2 :
// - Lire les paramètres URL (?licence=pokemon&type=display&disponibilite=en-stock)
// - Filtrer PRODUCTS selon les params actifs
// - Rendre les cartes produit avec lazy-loading
// - Gérer les filtres interactifs (checkbox / pills) avec debounce
// - Mettre à jour l'URL sans rechargement (history.pushState)

export { PRODUCTS, LICENCES, TYPES, DISPONIBILITES };
