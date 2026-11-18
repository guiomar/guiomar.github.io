// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// Draw the brain-rhythm traces once, unless the visitor prefers less motion
const signal = document.querySelector('.signal');
if (signal && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  signal.classList.add('is-drawing');
}

// Media filters
const filters = document.querySelectorAll('.filters button');
filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.filter;
    filters.forEach((b) => b.setAttribute('aria-pressed', b === btn));
    document.querySelectorAll('#media-list .media-item').forEach((item) => {
      item.hidden = type !== 'all' && item.dataset.type !== type;
    });
  });
});

// Open links to other websites in a new tab
document.querySelectorAll('a[href]').forEach((a) => {
  if (a.hostname && a.hostname !== location.hostname) {
    a.target = '_blank';
    a.rel = 'noopener';
  }
});

// External links and documents open in a new tab
document.querySelectorAll('a[href]').forEach((a) => {
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
  let url;
  try { url = new URL(href, location.href); } catch (e) { return; }
  const isFile = /\.(pdf|jpe?g|png|zip|docx?|pptx?)$/i.test(url.pathname);
  if (url.origin !== location.origin || isFile) {
    a.target = '_blank';
    a.rel = 'noopener';
  }
});
