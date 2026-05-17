// 33 Immortals Build Guide — sidebar, theme toggle, search.

(function () {
  const THEME_KEY = 'guide-theme';

  // ----- Theme -----
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = t === 'dark' ? '☀ Light' : '☾ Dark';
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (!saved) {
      saved = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyTheme(saved);
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      applyTheme(next);
    });
  }

  // ----- Mobile sidebar -----
  function initMobileToggle() {
    const toggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (!toggle || !sidebar) return;
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    sidebar.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => sidebar.classList.remove('open'));
    });
  }

  // ----- Active link highlight -----
  function initActiveLink() {
    const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-group a').forEach(a => {
      const href = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
      if (href === here) a.classList.add('active');
    });
  }

  // ----- Search -----
  async function initSearch() {
    const input = document.getElementById('site-search');
    const results = document.getElementById('search-results');
    if (!input || !results) return;

    let index = [];
    try {
      const res = await fetch('assets/search-index.json');
      index = await res.json();
    } catch (e) {
      return;
    }

    function render(matches) {
      if (!matches.length) {
        results.innerHTML = '<div class="search-result" style="color:var(--text-muted)">No matches</div>';
        results.classList.add('open');
        return;
      }
      results.innerHTML = matches.slice(0, 20).map(m =>
        `<a class="search-result" href="${m.href}">${escapeHtml(m.heading)}<span class="res-page">${escapeHtml(m.page)}</span></a>`
      ).join('');
      results.classList.add('open');
    }

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { results.classList.remove('open'); return; }
      const matches = index.filter(item =>
        item.heading.toLowerCase().includes(q) || item.page.toLowerCase().includes(q)
      );
      render(matches);
    });

    input.addEventListener('focus', () => {
      if (input.value.trim().length >= 2) {
        input.dispatchEvent(new Event('input'));
      }
    });

    document.addEventListener('click', e => {
      if (!results.contains(e.target) && e.target !== input) {
        results.classList.remove('open');
      }
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') { input.blur(); results.classList.remove('open'); }
    });
  }

  // ----- Items (catalog renderer + pill tooltips) -----

  let _itemsPromise = null;

  function loadItems() {
    if (!_itemsPromise) {
      _itemsPromise = Promise.all([
        fetch('assets/items.json').then(r => r.json()),
        fetch('assets/icons.json').then(r => r.json()),
      ]).then(([items, icons]) => buildIndex(items, icons)).catch(err => {
        console.warn('[items] failed to load:', err);
        return null;
      });
    }
    return _itemsPromise;
  }

  function buildIndex(items, icons) {
    const bySlug = {};
    for (const r of items.relics)   { bySlug[r.slug] = { ...r, kind: 'relic', icon: icons[r.slug] }; }
    for (const p of items.perks)    { bySlug[p.slug] = { ...p, kind: 'perk',  icon: icons[p.slug] }; }
    for (const u of items.upgrades) { bySlug[u.slug] = { ...u, kind: 'upgrade', icon: icons[u.slug] }; }
    return { items, icons, bySlug };
  }

  // ----- Catalog renderers -----

  function renderCard(entry, icons) {
    const icon = icons[entry.slug];
    const iconHtml = icon
      ? `<img class="entity-icon entity-icon-card" src="${icon.path}" alt="${escapeHtml(entry.name)}" loading="lazy">`
      : '';

    let rarityHtml = '';
    if (entry.kind === 'relic') {
      rarityHtml = `<span class="rarity-badge rarity-${entry.rarity}">${capitalize(entry.rarity)}</span>`;
    }

    const blessedHtml = entry.blessed
      ? `<p class="card-blessed">${escapeHtml(entry.blessed)}</p>`
      : '';
    const noteHtml = entry.note
      ? `<p class="card-note">${escapeHtml(entry.note)}</p>`
      : '';

    return `<article class="card" id="${entry.slug}">
      <h3 class="card-title">${iconHtml}${escapeHtml(entry.name)} ${rarityHtml}</h3>
      <p class="card-effect">${escapeHtml(entry.effect)}</p>${blessedHtml}${noteHtml}
    </article>`;
  }

  function renderUpgradeBlock(entry, icons) {
    const icon = icons[entry.slug];
    const pillImg = icon ? `<img class="pill-icon" src="${icon.path}" alt="" loading="lazy">` : '';
    const namePill = `<span class="pill pill-upgrade">${pillImg}${escapeHtml(entry.name)}</span>`;
    const noteHtml = entry.note ? `\n<p class="upgrade-note">${escapeHtml(entry.note)}</p>` : '';
    return `<div class="upgrade-entry" id="upgrade-${entry.slug}"><p>${namePill} — ${escapeHtml(entry.effect)}</p>${noteHtml}</div>`;
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function initItems() {
    const containers = document.querySelectorAll('[data-render]');
    if (!containers.length) return;

    loadItems().then(data => {
      if (!data) {
        containers.forEach(el => {
          el.innerHTML = '<p class="card-note">Could not load item data.</p>';
        });
        return;
      }
      const { items, icons } = data;

      containers.forEach(el => {
        const type = el.dataset.render;

        if (type === 'relics') {
          const cat = el.dataset.category;
          const entries = items.relics.filter(r => r.category === cat);
          el.innerHTML = entries.map(r => renderCard({ ...r, kind: 'relic' }, icons)).join('\n');

        } else if (type === 'perks') {
          el.innerHTML = items.perks.map(p => renderCard({ ...p, kind: 'perk' }, icons)).join('\n');

        } else if (type === 'upgrades') {
          const weapon = el.dataset.weapon;
          const entries = items.upgrades.filter(u => u.weapon === weapon);
          el.innerHTML = entries.map(u => renderUpgradeBlock(u, icons)).join('\n');
        }
      });

      // Handle deep-link into a late-rendered card
      if (location.hash) {
        const target = document.getElementById(location.hash.slice(1));
        if (target) target.scrollIntoView({ block: 'start' });
      }
    });
  }

  // ----- Pill tooltips -----

  function initPillTooltips() {
    const tip = document.createElement('div');
    tip.className = 'pill-tooltip';
    tip.id = 'pill-tip';
    tip.setAttribute('role', 'tooltip');
    tip.hidden = true;
    document.body.appendChild(tip);

    let activeEl = null;
    let showTimer = null;
    let hideTimer = null;
    const warnedSlugs = new Set();

    function slugFromPill(pill) {
      const img = pill.querySelector('img.pill-icon');
      if (!img) return null;
      const src = img.getAttribute('src') || '';
      const base = src.split('/').pop().replace(/\.[^.]+$/, '');
      return base || null;
    }

    function pillLink(entry) {
      if (entry.kind === 'perk')    return `perks.html#${entry.slug}`;
      if (entry.kind === 'relic')   return `relics.html#${entry.slug}`;
      if (entry.kind === 'upgrade') return `${entry.weapon}.html#upgrade-${entry.slug}`;
      return null;
    }

    function pillLinkLabel(entry) {
      if (entry.kind === 'perk')    return 'View on Perks';
      if (entry.kind === 'relic')   return 'View on Relics';
      if (entry.kind === 'upgrade') return `View on ${entry.weaponLabel}`;
      return 'View';
    }

    function showTip(pill) {
      const slug = slugFromPill(pill);
      if (!slug) return;

      loadItems().then(data => {
        if (!data || activeEl !== pill) return;
        const { bySlug, icons } = data;
        const entry = bySlug[slug];

        if (!entry) {
          if (!warnedSlugs.has(slug)) {
            console.warn('[pill-tooltip] no data for slug:', slug);
            warnedSlugs.add(slug);
          }
          return;
        }

        const icon = icons[slug];
        const iconHtml = icon
          ? `<img src="${icon.path}" alt="" aria-hidden="true">`
          : '';

        const blessedHtml = entry.blessed
          ? `<p class="pill-tooltip-blessed">Blessed: ${escapeHtml(entry.blessed)}</p>`
          : '';

        const href = pillLink(entry);
        const linkHtml = href
          ? `<a class="pill-tooltip-link" href="${href}" tabindex="-1">${pillLinkLabel(entry)} ↗</a>`
          : '';

        tip.innerHTML = `
          <div class="pill-tooltip-name">${iconHtml}${escapeHtml(entry.name)}</div>
          <p class="pill-tooltip-effect">${escapeHtml(entry.effect)}</p>
          ${blessedHtml}${linkHtml}`;
        tip.hidden = false;
        tip.setAttribute('data-interactive', '');
        pill.setAttribute('aria-describedby', 'pill-tip');
        positionTip(pill);
      });
    }

    function positionTip(pill) {
      const r = pill.getBoundingClientRect();
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const gap = 8;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let left = r.left + r.width / 2 - tw / 2;
      let top  = r.bottom + gap;

      // Flip above if clipped at bottom
      if (top + th > vh - 8) top = r.top - th - gap;
      // Clamp horizontal
      left = Math.max(8, Math.min(left, vw - tw - 8));

      tip.style.left = left + 'px';
      tip.style.top  = top  + 'px';
    }

    function hideTip(pill) {
      clearTimeout(hideTimer);
      tip.hidden = true;
      tip.removeAttribute('data-interactive');
      if (pill) pill.removeAttribute('aria-describedby');
      activeEl = null;
    }

    function scheduleHide(pill) {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => hideTip(pill), 150);
    }

    document.addEventListener('pointerover', e => {
      const pill = e.target.closest('.pill');
      if (!pill || pill === activeEl) return;
      clearTimeout(showTimer);
      activeEl = pill;
      showTimer = setTimeout(() => showTip(pill), 120);
    });

    document.addEventListener('pointerout', e => {
      const pill = e.target.closest('.pill');
      if (!pill) return;
      clearTimeout(showTimer);
      if (!tip.contains(e.relatedTarget)) {
        scheduleHide(pill);
      }
    });

    tip.addEventListener('pointerenter', () => clearTimeout(hideTimer));
    tip.addEventListener('pointerleave', () => scheduleHide(activeEl));

    document.addEventListener('focusin', e => {
      const pill = e.target.closest('.pill');
      if (!pill) return;
      activeEl = pill;
      showTip(pill);
    });

    document.addEventListener('focusout', e => {
      const pill = e.target.closest('.pill');
      if (pill) hideTip(pill);
    });

    document.addEventListener('scroll', () => hideTip(activeEl), true);
    window.addEventListener('resize',   () => hideTip(activeEl));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && activeEl) {
        hideTip(activeEl);
        activeEl = null;
      }
    });

    // Make pills keyboard-focusable
    document.querySelectorAll('.pill').forEach(pill => {
      if (!pill.hasAttribute('tabindex')) pill.setAttribute('tabindex', '0');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileToggle();
    initActiveLink();
    initSearch();
    initItems();
    initPillTooltips();
  });
})();
