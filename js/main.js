// =====================================================================
// RIO HAVEN POUSADA HOSTEL — MAIN JAVASCRIPT v1.0
// =====================================================================

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
  const btn  = document.querySelector('.header__hamburger');
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
  const tabs  = document.querySelectorAll('.filter-tab');
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
  initHeader();
  initMobileMenu();
  initAnimations();
  initFAQ();
  initFilter();
  initReservationForm();
  initEventsForm();
  initWAFloat();
  initMobileCTA();
  initActiveNav();
  initTransitions();
  initCounters();
});
