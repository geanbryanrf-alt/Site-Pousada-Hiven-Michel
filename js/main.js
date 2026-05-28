// =====================================================================
// RIO HAVEN POUSADA HOSTEL — MAIN JAVASCRIPT v1.0
// =====================================================================

import './components/Header.js';
import './components/MobileMenu.js';
import './components/Footer.js';
import './components/WaFloat.js';
import './components/MobileCta.js';

const WA = '5521978730606';

function waLink(msg) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}

// ── HEADER SCROLL ────────────────────────────────────────────────────
function initHeader() {
  const h = document.querySelector('.header');
  if (!h) return;
  const update = () => {
    if (window.scrollY > 50) {
      h.classList.add('scrolled');
      h.classList.remove('transparent');
    } else {
      h.classList.remove('scrolled');
      h.classList.add('transparent');
    }
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

// ── MOBILE MENU ──────────────────────────────────────────────────────
function initMobileMenu() {
  const btn = document.querySelector('.header__hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ── SCROLL ANIMATIONS ────────────────────────────────────────────────
function initAnimations() {
  const els = document.querySelectorAll('.anim, .anim-l, .anim-r');
  if (!els.length) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );
  els.forEach(el => obs.observe(el));
}

// ── FAQ ACCORDION ────────────────────────────────────────────────────
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ── ACCOMMODATION FILTER ─────────────────────────────────────────────
function initFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('[data-cat]');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const f = tab.dataset.filter;
      cards.forEach(card => {
        const show = f === 'all' || card.dataset.cat === f;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// ── PHOTO GALLERY ─────────────────────────────────────────────────────
function initGallery() {
  const items = [...document.querySelectorAll('[data-gallery]')]
    .filter(item => item.offsetParent !== null);
  if (!items.length) return;

  const photos = [];
  const seen = new Set();
  items.forEach(item => {
    const img = item.querySelector('img');
    const src = img?.getAttribute('src') || '';
    if (!src || seen.has(src)) return;
    seen.add(src);
    photos.push({
      src: img?.getAttribute('src') || '',
      alt: img?.getAttribute('alt') || '',
      caption: item.querySelector('span')?.textContent || img?.getAttribute('alt') || ''
    });
  });

  if (!photos.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.innerHTML = `
    <div class="gallery-lightbox__dialog">
      <div class="gallery-lightbox__frame">
        <img src="" alt="">
        <button class="gallery-lightbox__close" type="button" aria-label="Fechar galeria">x</button>
        <button class="gallery-lightbox__nav gallery-lightbox__nav--prev" type="button" aria-label="Foto anterior">&lsaquo;</button>
        <button class="gallery-lightbox__nav gallery-lightbox__nav--next" type="button" aria-label="Proxima foto">&rsaquo;</button>
      </div>
      <div class="gallery-lightbox__caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const photo = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.gallery-lightbox__caption');
  let current = 0;

  const render = () => {
    photo.src = photos[current].src;
    photo.alt = photos[current].alt;
    caption.textContent = `${photos[current].caption} (${current + 1}/${photos.length})`;
  };

  const open = index => {
    current = index;
    render();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  const move = step => {
    current = (current + step + photos.length) % photos.length;
    render();
  };

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.getAttribute('src') || '';
      const photoIndex = photos.findIndex(photo => photo.src === src);
      open(photoIndex >= 0 ? photoIndex : Number(item.dataset.index || index));
    });
  });

  lightbox.querySelector('.gallery-lightbox__close').addEventListener('click', close);
  lightbox.querySelector('.gallery-lightbox__nav--prev').addEventListener('click', () => move(-1));
  lightbox.querySelector('.gallery-lightbox__nav--next').addEventListener('click', () => move(1));
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) close();
  });

  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
  });
}

// ── ACCOMMODATION CAROUSEL ────────────────────────────────────────────
function initAccommodationCarousel() {
  const carousel = document.querySelector('.accom-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.accom-carousel__track');
  const slides = [...carousel.querySelectorAll('.accom-carousel__slide')];
  const dotsWrap = carousel.querySelector('.accom-carousel__dots');
  const prev = carousel.querySelector('.accom-carousel__nav--prev');
  const next = carousel.querySelector('.accom-carousel__nav--next');
  if (!track || !slides.length || !dotsWrap) return;

  let current = 0;
  const dots = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'accom-carousel__dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ver foto ${index + 1}`);
    dot.addEventListener('click', () => goTo(index));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === current));
    dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === current));
  }

  prev?.addEventListener('click', () => goTo(current - 1));
  next?.addEventListener('click', () => goTo(current + 1));

  // ── Swipe touch support ──
  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 50;

  carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].clientX;
    const delta = touchStartX - touchEndX;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      goTo(delta > 0 ? current + 1 : current - 1);
    }
  }, { passive: true });

  goTo(0);
}

// ── RESERVATION FORM ─────────────────────────────────────────────────
function initReservationForm() {
  const form = document.querySelector('#form-reserva');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const g = id => (form.querySelector('#' + id)?.value || '').trim();
    const experiences = [...form.querySelectorAll('input[name="exp"]:checked')]
      .map(c => c.value).join(', ') || 'Nenhuma';

    const msg =
      `Olá! Me chamo ${g('r-nome')} e vim pelo site da Rio Haven. 🌊

📅 Check-in: ${g('r-checkin')}
📅 Check-out: ${g('r-checkout')}
👥 Hóspedes: ${g('r-hospedes')}
🛏️ Acomodação: ${g('r-acomo')}
✈️ Motivo da viagem: ${g('r-motivo')}
🎯 Experiências de interesse: ${experiences}
${g('r-msg') ? `📝 Mensagem: ${g('r-msg')}` : ''}

Gostaria de consultar disponibilidade e valores. Obrigado!`;

    window.open(waLink(msg), '_blank');
  });
}

// ── EVENTS FORM ──────────────────────────────────────────────────────
function initEventsForm() {
  const form = document.querySelector('#form-eventos');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const g = id => (form.querySelector('#' + id)?.value || '').trim();

    const msg =
      `Olá! Vim pela página de eventos da Rio Haven. Me chamo ${g('e-nome')}.

🎪 Evento: ${g('e-evento')}
📅 Entrada: ${g('e-checkin')}
📅 Saída: ${g('e-checkout')}
👥 Hóspedes: ${g('e-hospedes')}
🚗 Possui veículo: ${g('e-veiculo')}
🎯 Interesse em passeio: ${g('e-passeio')}
${g('e-msg') ? `📝 Mensagem adicional: ${g('e-msg')}` : ''}

Gostaria de consultar disponibilidade para hospedagem próxima ao Riocentro.`;

    window.open(waLink(msg), '_blank');
  });
}

// ── WHATSAPP FLOAT ───────────────────────────────────────────────────
function initWAFloat() {
  const btn = document.querySelector('.wa-float__btn');
  if (!btn) return;
  btn.href = waLink('Olá! Vim pelo site da Rio Haven e gostaria de consultar disponibilidade para hospedagem.');
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
}

// ── MOBILE CTA ───────────────────────────────────────────────────────
function initMobileCTA() {
  const btn = document.querySelector('#mobile-cta-wa');
  if (!btn) return;
  btn.href = waLink('Olá! Vim pelo site da Rio Haven e gostaria de consultar disponibilidade.');
  btn.target = '_blank';
}

// ── ACTIVE NAV LINK ──────────────────────────────────────────────────
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header__nav-link, .mobile-menu__link').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── PAGE TRANSITIONS ─────────────────────────────────────────────────
function initTransitions() {
  document.body.classList.add('loaded');

  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')
      || href.startsWith('tel') || href.includes('wa.me') || href === '') return;

    a.addEventListener('click', ev => {
      ev.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity .25s ease';
      setTimeout(() => { window.location.href = href; }, 260);
    });
  });
}

// ── SMOOTH COUNTERS (optional visual detail) ─────────────────────────
function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      let count = 0;
      const step = Math.ceil(target / 50);
      const timer = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + (el.dataset.suffix || '');
        if (count >= target) clearInterval(timer);
      }, 30);
    });
    obs.observe(el);
  });
}

// ── INIT ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    customElements.whenDefined('app-header'),
    customElements.whenDefined('app-mobile-menu'),
    customElements.whenDefined('app-footer'),
    customElements.whenDefined('app-wa-float'),
    customElements.whenDefined('app-mobile-cta')
  ]).then(() => {
    initHeader();
    initMobileMenu();
    initAnimations();
    initFAQ();
    initFilter();
    initAccommodationCarousel();
    initGallery();
    initReservationForm();
    initEventsForm();
    initWAFloat();
    initMobileCTA();
    initActiveNav();
    initTransitions();
    initCounters();
  });
});
