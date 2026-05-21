/**
 * TCM Japanimation — Core JS
 * Store status dynamique + utilitaires globaux
 */

'use strict';

// Horaires officiels de TCM Japanimation, Rue de la Cathédrale 73, 4000 Liège
// Format: [ouverture_h, ouverture_min, fermeture_h, fermeture_min] ou null (fermé)
const STORE_HOURS = {
  0: null,                  // Dimanche — fermé
  1: null,                  // Lundi — fermé
  2: [10, 0, 18, 30],      // Mardi
  3: [10, 0, 18, 30],      // Mercredi
  4: [10, 0, 18, 30],      // Jeudi
  5: [10, 0, 18, 30],      // Vendredi
  6: [10, 0, 18, 0],       // Samedi
};

function getStoreStatus() {
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Europe/Brussels' })
  );
  const day   = now.getDay();
  const hours = STORE_HOURS[day];

  if (!hours) return { open: false, label: 'Fermé aujourd’hui' };

  const [oH, oM, cH, cM] = hours;
  const nowMin   = now.getHours() * 60 + now.getMinutes();
  const openMin  = oH * 60 + oM;
  const closeMin = cH * 60 + cM;

  if (nowMin >= openMin && nowMin < closeMin) {
    const remaining = closeMin - nowMin;
    if (remaining <= 30) {
      return { open: true, label: `Ferme dans ${remaining} min` };
    }
    return { open: true, label: `Ouvert jusqu’à ${cH}h${String(cM).padStart(2, '0')}` };
  }

  if (nowMin < openMin) {
    return { open: false, label: `Ouvre à ${oH}h${String(oM).padStart(2, '0')}` };
  }

  return { open: false, label: 'Fermé' };
}

function updateStoreStatusUI() {
  const status = getStoreStatus();

  const dot   = document.getElementById('status-dot');
  const label = document.getElementById('status-label');
  const main  = document.getElementById('store-status-main');

  if (dot && label) {
    dot.classList.toggle('is-open',   status.open);
    dot.classList.toggle('is-closed', !status.open);
    label.textContent = status.label;
  }

  if (main) {
    main.innerHTML = `
      <div class="store-status store-status--large">
        <span class="store-status__dot ${status.open ? 'is-open' : 'is-closed'}"></span>
        <span class="store-status__label">${status.label}</span>
      </div>
    `;
  }
}

function initScrollHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1%;pointer-events:none';
  document.body.prepend(sentinel);

  new IntersectionObserver(
    ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
    { rootMargin: `-${header.offsetHeight}px 0px 0px 0px`, threshold: 0 }
  ).observe(sentinel);
}

function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

function initSkipLink() {
  const skip = document.createElement('a');
  skip.href = '#main-content';
  skip.className = 'skip-link';
  skip.textContent = 'Aller au contenu principal';
  document.body.prepend(skip);
}

document.addEventListener('DOMContentLoaded', () => {
  initSkipLink();
  initScrollHeader();
  initFooterYear();
  updateStoreStatusUI();
  setInterval(updateStoreStatusUI, 60_000);
});
