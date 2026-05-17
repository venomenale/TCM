(function () {
  'use strict';

  function init() {
    var id = new URLSearchParams(window.location.search).get('id');
    var product = id && window.TCM_PRODUCTS
      ? window.TCM_PRODUCTS.filter(function (p) { return p.id === id; })[0]
      : null;

    if (!product) { renderNotFound(); return; }
    document.title = product.nom + ' | TCM Japanimation';
    renderProduct(product);
    renderRelated(product);
  }

  function renderProduct(p) {
    var el = document.getElementById('product-container');
    if (!el) return;
    var lic      = licInfo(p.licence);
    var typeObj  = typeInfo(p.type);
    var avail    = availInfo(p.disponibilite);
    var price    = formatPrice(p.prix);
    var waMsg    = encodeURIComponent('Bonjour TCM Japanimation ! Je suis intéressé(e) par : ' + p.nom + ' (Réf. ' + p.id + '). Est-il encore disponible ? Merci !');

    el.innerHTML = [
      '<nav class="breadcrumb" aria-label="Fil d\'Ariane">',
        '<a href="index.html">Accueil</a><span aria-hidden="true"> / </span>',
        '<a href="catalogue.html">Catalogue</a><span aria-hidden="true"> / </span>',
        '<a href="catalogue.html?licence=' + p.licence + '">' + esc(lic.label) + '</a><span aria-hidden="true"> / </span>',
        '<span aria-current="page">' + esc(p.nom) + '</span>',
      '</nav>',
      '<div class="product-detail">',
        '<div class="product-detail__visual" data-licence="' + p.licence + '">',
          '<span class="product-detail__icon" aria-hidden="true">' + lic.icon + '</span>',
          p.nouveau ? '<span class="badge badge--primary product-detail__new">Nouveau</span>' : '',
        '</div>',
        '<div class="product-detail__info">',
          '<div class="product-detail__tags">',
            '<a href="catalogue.html?licence=' + p.licence + '" class="detail-tag detail-tag--lic">' + lic.icon + ' ' + esc(lic.label) + '</a>',
            '<span class="detail-tag">' + esc(typeObj.label) + '</span>',
          '</div>',
          '<h1 class="product-detail__name">' + esc(p.nom) + '</h1>',
          '<div class="product-detail__price-row">',
            '<span class="product-detail__price">' + price + '</span>',
            '<span class="badge ' + avail.cls + ' product-detail__avail">' + avail.label + '</span>',
          '</div>',
          '<p class="product-detail__desc">' + esc(p.description) + '</p>',
          p.disponibilite !== 'rupture'
            ? ['<div class="product-detail__ctas">',
                '<a href="https://wa.me/3242222888?text=' + waMsg + '" class="btn btn--primary btn--lg" target="_blank" rel="noopener noreferrer">',
                  svgWA() + ' Réserver via WhatsApp',
                '</a>',
                '<a href="tel:+3242222888" class="btn btn--ghost btn--lg">',
                  svgPhone() + ' 04 222 28 88',
                '</a>',
              '</div>'].join('')
            : '<p class="detail-rupture">Produit actuellement en rupture. Contactez-nous pour être alerté du retour en stock.</p>',
          '<div class="product-detail__notice">',
            svgInfo(),
            'Boutique physique uniquement — Rue de la Cathédrale 73, 4000 Liège. Réservation gratuite et sans engagement.',
          '</div>',
        '</div>',
      '</div>',
      '<button class="btn btn--ghost product-back" onclick="history.length > 1 ? history.back() : window.location.href=\'catalogue.html\'">',
        '← Retour au catalogue',
      '</button>',
    ].join('');
  }

  function renderRelated(p) {
    var el = document.getElementById('related-grid');
    if (!el || !window.TCM_PRODUCTS) return;
    var related = window.TCM_PRODUCTS
      .filter(function (x) { return x.licence === p.licence && x.id !== p.id; })
      .slice(0, 4);
    if (!related.length) { document.getElementById('related-section') && (document.getElementById('related-section').hidden = true); return; }
    var lic = licInfo(p.licence);
    el.innerHTML = related.map(function (r) {
      return [
        '<article class="product-card">',
          '<a href="produit.html?id=' + enc(r.id) + '" class="product-card__link">',
            '<div class="product-card__visual" data-licence="' + r.licence + '">',
              '<span class="product-card__icon" aria-hidden="true">' + lic.icon + '</span>',
              availBadge(r.disponibilite),
            '</div>',
            '<div class="product-card__body">',
              '<span class="product-card__lic-tag">' + lic.icon + ' ' + esc(lic.label) + '</span>',
              '<h3 class="product-card__name">' + esc(r.nom) + '</h3>',
              '<div class="product-card__footer">',
                '<span class="product-card__price">' + formatPrice(r.prix) + '</span>',
                '<span class="product-card__btn">Voir →</span>',
              '</div>',
            '</div>',
          '</a>',
        '</article>',
      ].join('');
    }).join('');
  }

  function renderNotFound() {
    var el = document.getElementById('product-container');
    if (!el) return;
    el.innerHTML = '<div class="product-not-found"><span class="products-empty__icon">🔍</span><h1>Produit introuvable</h1><p>Ce produit n\'existe pas ou a été retiré.</p><a href="catalogue.html" class="btn btn--primary">Voir le catalogue</a></div>';
  }

  function availInfo(d) {
    return { 'en-stock': { label: 'En stock', cls: 'badge--green' }, 'precommande': { label: 'Précommande', cls: 'badge--accent' }, 'rupture': { label: 'Rupture', cls: 'badge--surface' } }[d]
      || { label: d, cls: 'badge--surface' };
  }
  function availBadge(d) {
    var i = availInfo(d);
    return '<span class="product-card__avail badge ' + i.cls + '">' + i.label + '</span>';
  }
  function licInfo(id)  { return find(window.TCM_LICENCES || [],  id) || { label: id, icon: '📦' }; }
  function typeInfo(id) { return find(window.TCM_TYPES    || [],  id) || { label: id }; }
  function find(arr, id){ return arr.filter(function(x){ return x.id===id; })[0]; }
  function enc(s)  { return encodeURIComponent(s); }
  function esc(s)  { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function formatPrice(n) { return n.toFixed(2).replace('.',',')+' €'; }

  function svgWA() { return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>'; }
  function svgPhone() { return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'; }
  function svgInfo() { return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'; }

  document.addEventListener('DOMContentLoaded', init);
})();
