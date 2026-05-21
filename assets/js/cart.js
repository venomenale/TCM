/* ════════════════════════════════════════════════════════════════
   TCM CART — drop-in side drawer
   Usage:
     - Include <link rel="stylesheet" href="cart.css"> in <head>
     - Include <script src="cart.js" defer></script> at end of <body>
     - In the nav, add a button: <button class="nav-cart" data-cart-trigger>...</button>
       (the script will create one automatically if not present)
     - Anywhere on the page, add a button with data-cart-add="..." attrs:
       <button data-cart-add data-name="..." data-licence="..." data-price="29.99" data-licence-key="poke">+</button>
   ════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const STORAGE_KEY = 'tcm-cart-v1';
  const FREE_SHIPPING_THRESHOLD = 50;

  /* ════════ STATE ════════ */
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (e) { cart = [] }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    refreshCount();
  }

  /* ════════ ICONS ════════ */
  const ICONS = {
    cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.6"></circle><circle cx="18" cy="20" r="1.6"></circle><path d="M2 3h3l2.5 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.5L22 7H6"></path></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"></line><line x1="6" y1="18" x2="18" y2="6"></line></svg>`,
    box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"></path><path d="m3 8 9 5 9-5"></path><path d="M12 13v8"></path></svg>`,
    pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="14" height="11"></rect><polyline points="15 8 19 8 22 12 22 17 15 17"></polyline><circle cx="6" cy="20" r="2"></circle><circle cx="18" cy="20" r="2"></circle></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`
  };

  /* ════════ BUILD UI ════════ */
  function ensureTrigger() {
    let trigger = document.querySelector('[data-cart-trigger]');
    if (!trigger) {
      const navLinks = document.querySelector('.nav-links');
      if (!navLinks) return null;
      const li = document.createElement('li');
      li.innerHTML = `<button class="nav-cart" data-cart-trigger aria-label="Voir mon panier">${ICONS.cart}<span class="cart-count empty">0</span></button>`;
      const pill = navLinks.querySelector('.pill');
      if (pill) navLinks.insertBefore(li, pill.parentElement);
      else navLinks.appendChild(li);
      trigger = li.querySelector('[data-cart-trigger]');
    } else if (!trigger.querySelector('.cart-count')) {
      trigger.innerHTML = `${ICONS.cart}<span class="cart-count empty">0</span>`;
    }
    return trigger;
  }

  function buildDrawer() {
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="cart-overlay" data-cart-overlay></div>
      <aside class="cart-drawer" data-cart-drawer aria-hidden="true">
        <header class="cart-head">
          <h3>Mon panier <span data-cart-summary>0 article</span></h3>
          <button class="cart-close" data-cart-close aria-label="Fermer">${ICONS.close}</button>
        </header>
        <div class="cart-body" data-cart-body></div>
        <footer class="cart-foot" data-cart-foot hidden>
          <div class="cart-subtotal">
            <span>Sous-total</span>
            <span class="cart-subtotal-val" data-cart-subtotal>0,00 €</span>
          </div>
          <div class="cart-shipping-note" data-cart-shipping>
            <span class="dot"></span>
            <span data-cart-shipping-text>Plus que 50,00 € pour la livraison offerte</span>
          </div>
          <button class="cart-checkout" data-cart-checkout>
            Procéder au paiement
            ${ICONS.arrow}
          </button>
          <button class="cart-pickup" data-cart-pickup>
            ${ICONS.pin}
            Click &amp; Collect — Retrait à Liège
          </button>
        </footer>
      </aside>`;
    document.body.appendChild(wrap);
  }

  /* ════════ RENDER ════════ */
  function refreshCount() {
    const total = cart.reduce((s, i) => s + i.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = total;
      el.classList.toggle('empty', total === 0);
    });
  }

  function fmt(n) {
    return n.toFixed(2).replace('.', ',') + ' €';
  }

  function render() {
    const body = document.querySelector('[data-cart-body]');
    const foot = document.querySelector('[data-cart-foot]');
    const summary = document.querySelector('[data-cart-summary]');
    if (!body) return;

    const total = cart.reduce((s, i) => s + i.qty, 0);
    if (summary) summary.textContent = total === 0 ? 'Panier vide' : `${total} article${total > 1 ? 's' : ''}`;

    if (cart.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">${ICONS.box}</div>
          <h4>Votre panier est vide.</h4>
          <p>Parcourez le catalogue pour découvrir nos boosters, displays et figurines.</p>
        </div>`;
      foot.hidden = true;
      return;
    }

    foot.hidden = false;

    let html = '';
    cart.forEach((item, idx) => {
      html += `
        <article class="cart-item" data-c="${item.licenceKey || 'mint'}" data-idx="${idx}">
          <div class="cart-item-thumb">${ICONS.box}</div>
          <div class="cart-item-info">
            <span class="cart-item-licence">${item.licence}</span>
            <h5 class="cart-item-name">${item.name}</h5>
            <div class="cart-item-qty">
              <button data-q="-" aria-label="Diminuer">−</button>
              <span class="qty-val">${item.qty}</span>
              <button data-q="+" aria-label="Augmenter">+</button>
            </div>
          </div>
          <div class="cart-item-right">
            <span class="cart-item-price">${fmt(item.price * item.qty)}</span>
            <button class="cart-item-remove" data-remove>Retirer</button>
          </div>
        </article>`;
    });

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      html += `
        <div class="cart-promo">
          ${ICONS.truck}
          <span>Livraison <strong>offerte</strong> en Belgique 🎉</span>
        </div>`;
    }
    body.innerHTML = html;

    document.querySelector('[data-cart-subtotal]').textContent = fmt(subtotal);
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    const shipText = document.querySelector('[data-cart-shipping-text]');
    if (shipText) {
      shipText.textContent = remaining > 0
        ? `Plus que ${fmt(remaining)} pour la livraison offerte`
        : 'Livraison offerte débloquée ✓';
    }
  }

  /* ════════ ACTIONS ════════ */
  function add(item) {
    const existing = cart.find(i => i.name === item.name);
    if (existing) existing.qty += 1;
    else cart.push({ ...item, qty: 1 });
    save();
    render();
    open();
    pulse();
  }

  function changeQty(idx, delta) {
    if (!cart[idx]) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) {
      animateRemove(idx);
    } else {
      save();
      render();
    }
  }

  function animateRemove(idx) {
    const el = document.querySelector(`.cart-item[data-idx="${idx}"]`);
    if (el) {
      el.classList.add('removing');
      setTimeout(() => {
        cart.splice(idx, 1);
        save(); render();
      }, 280);
    } else {
      cart.splice(idx, 1);
      save(); render();
    }
  }

  function pulse() {
    const t = document.querySelector('[data-cart-trigger]');
    if (!t) return;
    t.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }],
      { duration: 450, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
  }

  /* ════════ OPEN / CLOSE ════════ */
  function open() {
    document.querySelector('[data-cart-drawer]').classList.add('on');
    document.querySelector('[data-cart-drawer]').setAttribute('aria-hidden', 'false');
    document.querySelector('[data-cart-overlay]').classList.add('on');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    document.querySelector('[data-cart-drawer]').classList.remove('on');
    document.querySelector('[data-cart-drawer]').setAttribute('aria-hidden', 'true');
    document.querySelector('[data-cart-overlay]').classList.remove('on');
    document.body.style.overflow = '';
  }

  /* ════════ INIT ════════ */
  function init() {
    ensureTrigger();
    buildDrawer();

    document.addEventListener('click', e => {
      if (e.target.closest('[data-cart-trigger]')) { open(); return }
      if (e.target.closest('[data-cart-close]'))   { close(); return }
      if (e.target.matches('[data-cart-overlay]')) { close(); return }

      const adder = e.target.closest('[data-cart-add]');
      if (adder) {
        e.preventDefault();
        add({
          name:        adder.dataset.name        || 'Produit',
          licence:     adder.dataset.licence     || 'TCM',
          licenceKey:  adder.dataset.licenceKey  || 'mint',
          price:       parseFloat(adder.dataset.price) || 0
        });
        return;
      }

      const qtyBtn = e.target.closest('.cart-item-qty button');
      if (qtyBtn) {
        const idx = +qtyBtn.closest('.cart-item').dataset.idx;
        changeQty(idx, qtyBtn.dataset.q === '+' ? 1 : -1);
        return;
      }

      const remBtn = e.target.closest('[data-remove]');
      if (remBtn) {
        const idx = +remBtn.closest('.cart-item').dataset.idx;
        animateRemove(idx);
        return;
      }

      if (e.target.closest('[data-cart-checkout]')) {
        alert("Paiement à venir — pour l'instant, passe à la boutique 😉");
      }
      if (e.target.closest('[data-cart-pickup]')) {
        alert('Click & Collect — retire ta commande à Liège dès que prête !');
      }
    });

    document.querySelectorAll('.arr-card').forEach(card => {
      const btn = card.querySelector('.arr-add');
      if (!btn || btn.dataset.cartAdd !== undefined) return;
      const licence = card.querySelector('.arr-licence')?.textContent.trim() || 'TCM';
      const name    = card.querySelector('.arr-name')?.textContent.trim() || 'Produit';
      const priceTxt = card.querySelector('.arr-price')?.textContent || '0';
      const priceMatch = priceTxt.replace(/\s/g, '').match(/(\d+[,.]?\d*)\s*€?$/);
      const price = priceMatch ? parseFloat(priceMatch[1].replace(',', '.')) : 0;
      btn.dataset.cartAdd  = '';
      btn.dataset.name     = name;
      btn.dataset.licence  = licence;
      btn.dataset.licenceKey = card.dataset.c || 'mint';
      btn.dataset.price    = price;
    });

    refreshCount();
    render();

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.querySelector('[data-cart-drawer]')?.classList.contains('on')) {
        close();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.TCMCart = { add, open, close, get state() { return [...cart] } };
})();
