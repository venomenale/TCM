/**
 * TCM Japanimation — Navigation
 * Gestion du menu mobile + dropdowns desktop accessibles
 */

'use strict';

function initMobileNav() {
  const burger = document.getElementById('nav-burger');
  const nav    = document.getElementById('main-nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Fermer sur Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      burger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
      burger.focus();
    }
  });

  // Fermer en cliquant en dehors
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') &&
        !nav.contains(e.target) &&
        !burger.contains(e.target)) {
      burger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}

function initDropdowns() {
  const parentBtns = document.querySelectorAll('.nav__link--parent');

  parentBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Fermer tous les autres
      parentBtns.forEach((other) => {
        if (other !== btn) other.setAttribute('aria-expanded', 'false');
      });

      btn.setAttribute('aria-expanded', String(!isExpanded));
    });

    // Clavier: flèches pour naviguer dans le dropdown
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const dropdown = document.getElementById(btn.getAttribute('aria-controls'));
        const firstLink = dropdown?.querySelector('a');
        if (firstLink) {
          btn.setAttribute('aria-expanded', 'true');
          firstLink.focus();
        }
      }
    });
  });

  // Fermer dropdowns en cliquant ailleurs
  document.addEventListener('click', () => {
    parentBtns.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
  });
}

function initSearchToggle() {
  const toggle   = document.getElementById('search-toggle');
  const searchBar = document.getElementById('search-bar');
  const closeBtn  = document.getElementById('search-close');
  const input     = document.getElementById('global-search');
  if (!toggle || !searchBar) return;

  const open = () => {
    searchBar.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => input?.focus());
  };

  const close = () => {
    searchBar.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  };

  toggle.addEventListener('click', () => {
    searchBar.hidden ? open() : close();
  });

  closeBtn?.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !searchBar.hidden) close();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initDropdowns();
  initSearchToggle();
});
