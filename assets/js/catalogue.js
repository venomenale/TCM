(function () {
  'use strict';

  var filters = { licence: '', type: '', disponibilite: '', q: '', sort: '' };
  var gridEl, countEl, activeFiltersBar, filterForm, sortSelect, sidebarEl;

  /* ---- Init ---- */
  function init() {
    gridEl          = document.getElementById('products-grid');
    countEl         = document.getElementById('products-count');
    activeFiltersBar = document.getElementById('active-filters-bar');
    filterForm       = document.getElementById('filter-form');
    sortSelect       = document.getElementById('sort-select');
    sidebarEl        = document.getElementById('filter-sidebar');
    if (!gridEl || !filterForm) return;

    var params = new URLSearchParams(window.location.search);
    filters.licence       = params.get('licence')       || '';
    filters.type          = params.get('type')          || '';
    filters.disponibilite = params.get('disponibilite') || '';
    filters.q             = params.get('q')             || '';
    filters.sort          = params.get('sort')          || '';

    buildFilterUI();
    syncFilterUI();
    applyAndRender();

    filterForm.addEventListener('change', onFilterChange);
    sortSelect && sortSelect.addEventListener('change', onSortChange);
    document.getElementById('filter-clear-btn') && document.getElementById('filter-clear-btn').addEventListener('click', clearFilters);

    // Mobile drawer
    var mobileBtn = document.getElementById('mobile-filter-btn');
    var backdrop  = document.getElementById('filter-backdrop');
    var closeBtn  = document.getElementById('filter-drawer-close');
    var applyBtn  = document.getElementById('drawer-apply-btn');
    mobileBtn  && mobileBtn.addEventListener('click',  openDrawer);
    backdrop   && backdrop.addEventListener('click',   closeDrawer);
    closeBtn   && closeBtn.addEventListener('click',   closeDrawer);
    applyBtn   && applyBtn.addEventListener('click',   closeDrawer);

    // Catalogue search
    var srch = document.getElementById('catalogue-search');
    if (srch) {
      srch.value = filters.q;
      srch.addEventListener('input', debounce(function () {
        filters.q = srch.value.trim();
        applyAndRender();
        updateURL();
        updateMobileBadge();
      }, 280));
    }
  }

  /* ---- Build filter pills ---- */
  function buildFilterUI() {
    function pills(arr, name) {
      return arr.map(function (item) {
        return '<label class="filter-pill"><input type="checkbox" name="' + name + '" value="' + item.id + '"> <span>' +
          (item.icon ? item.icon + ' ' : '') + item.label + '</span></label>';
      }).join('');
    }
    setInner('filter-licences', pills(window.TCM_LICENCES || [], 'licence'));
    setInner('filter-types',    pills(window.TCM_TYPES    || [], 'type'));
    setInner('filter-dispo',    pills(window.TCM_DISPONIBILITES || [], 'disponibilite'));
  }

  function syncFilterUI() {
    filterForm.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
      cb.checked = (filters[cb.name] === cb.value);
    });
    if (sortSelect) sortSelect.value = filters.sort;
  }

  /* ---- Events ---- */
  function onFilterChange(e) {
    var cb = e.target;
    if (cb.type !== 'checkbox') return;
    if (cb.checked) {
      // Single-select per group
      filterForm.querySelectorAll('input[name="' + cb.name + '"]').forEach(function (o) {
        if (o !== cb) o.checked = false;
      });
      filters[cb.name] = cb.value;
    } else {
      filters[cb.name] = '';
    }
    applyAndRender();
    updateURL();
    updateMobileBadge();
  }

  function onSortChange() {
    filters.sort = sortSelect.value;
    applyAndRender();
    updateURL();
  }

  function clearFilters() {
    filters = { licence: '', type: '', disponibilite: '', q: '', sort: '' };
    filterForm.querySelectorAll('input[type="checkbox"]').forEach(function (cb) { cb.checked = false; });
    if (sortSelect) sortSelect.value = '';
    var srch = document.getElementById('catalogue-search');
    if (srch) srch.value = '';
    applyAndRender();
    updateURL();
    updateMobileBadge();
  }

  /* ---- Core filter / sort / render ---- */
  function applyAndRender() {
    var results = sort(filter(window.TCM_PRODUCTS || [], filters), filters.sort);
    renderGrid(results);
    renderCount(results.length);
    renderActiveFilters();
  }

  function filter(products, f) {
    return products.filter(function (p) {
      if (f.licence       && p.licence       !== f.licence)       return false;
      if (f.type          && p.type          !== f.type)          return false;
      if (f.disponibilite && p.disponibilite !== f.disponibilite) return false;
      if (f.q) {
        var q   = f.q.toLowerCase();
        var hay = [p.nom, p.licence, p.type, p.description, (p.tags || []).join(' ')].join(' ').toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function sort(products, s) {
    var a = products.slice();
    if (s === 'price-asc')  return a.sort(function (x, y) { return x.prix - y.prix; });
    if (s === 'price-desc') return a.sort(function (x, y) { return y.prix - x.prix; });
    if (s === 'name-asc')   return a.sort(function (x, y) { return x.nom.localeCompare(y.nom, 'fr'); });
    return a;
  }

  function renderGrid(products) {
    if (!products.length) {
      gridEl.innerHTML =
        '<div class="products-empty">' +
          '<span class="products-empty__icon">🔍</span>' +
          '<h3>Aucun produit trouvé</h3>' +
          '<p>Essayez d\'autres filtres ou élargissez votre recherche.</p>' +
          '<button class="btn btn--ghost" id="empty-clear">Effacer les filtres</button>' +
        '</div>';
      var b = document.getElementById('empty-clear');
      b && b.addEventListener('click', clearFilters);
      return;
    }
    gridEl.innerHTML = products.map(cardHTML).join('');
  }

  function cardHTML(p) {
    var lic   = licInfo(p.licence);
    var avail = availBadge(p.disponibilite);
    var price = formatPrice(p.prix);
    return [
      '<article class="product-card" role="listitem">',
        '<a href="produit.html?id=' + enc(p.id) + '" class="product-card__link">',
          '<div class="product-card__visual" data-licence="' + p.licence + '">',
            '<span class="product-card__icon" aria-hidden="true">' + lic.icon + '</span>',
            avail,
            p.nouveau ? '<span class="product-card__new badge badge--primary">Nouveau</span>' : '',
          '</div>',
          '<div class="product-card__body">',
            '<span class="product-card__lic-tag">' + lic.icon + ' ' + esc(lic.label) + '</span>',
            '<h3 class="product-card__name">' + esc(p.nom) + '</h3>',
            '<div class="product-card__footer">',
              '<span class="product-card__price">' + price + '</span>',
              '<span class="product-card__btn">Voir →</span>',
            '</div>',
          '</div>',
        '</a>',
      '</article>',
    ].join('');
  }

  function availBadge(d) {
    var map = { 'en-stock': ['En stock','badge--green'], 'precommande': ['Précommande','badge--accent'], 'rupture': ['Rupture','badge--surface'] };
    var m = map[d] || [d, 'badge--surface'];
    return '<span class="product-card__avail badge ' + m[1] + '">' + m[0] + '</span>';
  }

  function renderCount(n) {
    if (!countEl) return;
    countEl.textContent = n ? n + ' produit' + (n > 1 ? 's' : '') : 'Aucun produit';
  }

  function renderActiveFilters() {
    if (!activeFiltersBar) return;
    var tags = [];
    if (filters.licence)       tags.push({ key: 'licence',       label: licInfo(filters.licence).label });
    if (filters.type)          tags.push({ key: 'type',          label: typeInfo(filters.type).label });
    if (filters.disponibilite) tags.push({ key: 'disponibilite', label: dispoInfo(filters.disponibilite).label });
    if (filters.q)             tags.push({ key: 'q',             label: '« ' + filters.q + ' »' });
    if (!tags.length) { activeFiltersBar.hidden = true; return; }
    activeFiltersBar.hidden = false;
    activeFiltersBar.innerHTML =
      '<span class="af-label">Filtres :</span>' +
      tags.map(function (t) {
        return '<button class="af-tag" data-key="' + t.key + '">' + esc(t.label) + ' ×</button>';
      }).join('') +
      '<button class="af-clear" id="af-clear-btn">Tout effacer</button>';
    activeFiltersBar.querySelectorAll('.af-tag').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-key');
        filters[key] = '';
        filterForm.querySelectorAll('input[name="' + key + '"]').forEach(function (cb) { cb.checked = false; });
        if (key === 'q') { var s = document.getElementById('catalogue-search'); if (s) s.value = ''; }
        applyAndRender(); updateURL(); updateMobileBadge();
      });
    });
    var ac = document.getElementById('af-clear-btn');
    ac && ac.addEventListener('click', clearFilters);
  }

  /* ---- URL + mobile badge ---- */
  function updateURL() {
    var p = new URLSearchParams();
    if (filters.licence)       p.set('licence',       filters.licence);
    if (filters.type)          p.set('type',          filters.type);
    if (filters.disponibilite) p.set('disponibilite', filters.disponibilite);
    if (filters.q)             p.set('q',             filters.q);
    if (filters.sort)          p.set('sort',          filters.sort);
    var s = p.toString();
    history.replaceState({}, '', s ? '?' + s : window.location.pathname);
  }

  function updateMobileBadge() {
    var n = [filters.licence, filters.type, filters.disponibilite, filters.q].filter(Boolean).length;
    var b = document.getElementById('mobile-filter-count');
    if (!b) return;
    b.textContent = n;
    b.hidden = n === 0;
  }

  /* ---- Mobile drawer ---- */
  function openDrawer() {
    if (!sidebarEl) return;
    sidebarEl.classList.add('is-drawer-open');
    document.getElementById('filter-backdrop') && (document.getElementById('filter-backdrop').hidden = false);
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!sidebarEl) return;
    sidebarEl.classList.remove('is-drawer-open');
    document.getElementById('filter-backdrop') && (document.getElementById('filter-backdrop').hidden = true);
    document.body.style.overflow = '';
  }

  /* ---- Helpers ---- */
  function licInfo(id)  { return find(window.TCM_LICENCES || [],       id) || { label: id, icon: '📦' }; }
  function typeInfo(id) { return find(window.TCM_TYPES    || [],       id) || { label: id }; }
  function dispoInfo(id){ return find(window.TCM_DISPONIBILITES || [], id) || { label: id }; }
  function find(arr, id){ return arr.filter(function(x){ return x.id === id; })[0]; }
  function enc(s)  { return encodeURIComponent(s); }
  function esc(s)  { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function formatPrice(n) { return n.toFixed(2).replace('.',',') + ' €'; }
  function setInner(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }
  function debounce(fn, ms) { var t; return function(){ clearTimeout(t); t = setTimeout(fn, ms); }; }

  document.addEventListener('DOMContentLoaded', init);
})();
