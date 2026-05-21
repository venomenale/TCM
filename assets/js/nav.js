/**
 * TCM Japanimation — Navigation
 * Gestion du menu mobile + dropdowns desktop accessibles
 */

'use strict';

function initMobileNav() {
  const burger = document.getElementById('nav-burger');
  const nav    = document.getElementById('main-nav');
  if (!burger || !nav) return;

  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  const open = () => {
    burger.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    burger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => {
    burger.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  overlay.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      close();
      burger.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') &&
        !nav.contains(e.target) &&
        !burger.contains(e.target) &&
        !overlay.contains(e.target)) {
      close();
    }
  });
}

function initDropdowns() {
  const parentBtns = document.querySelectorAll('.nav__link--parent');

  parentBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      parentBtns.forEach((other) => {
        if (other !== btn) other.setAttribute('aria-expanded', 'false');
      });

      btn.setAttribute('aria-expanded', String(!isExpanded));
    });

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

  document.addEventListener('click', () => {
    parentBtns.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
  });
}

function initSearchToggle() {
  const toggle    = document.getElementById('search-toggle');
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
