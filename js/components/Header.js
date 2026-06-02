import logoUrl from '../../images/logo-rio-haven.webp';

export class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header transparent" id="main-header">
        <div class="header__inner">
          <a href="/index.html" class="header__logo">
            <img src="${logoUrl}" alt="Rio Haven" class="header__logo-img">
            <div class="header__logo-text">
              <span class="header__logo-name">Rio Haven</span>
              <span class="header__logo-sub">Pousada &amp; Hostel</span>
            </div>
          </a>

          <nav class="header__nav" id="desktop-nav">
            <a href="/index.html" class="header__nav-link">Início</a>
            <a href="/experiencias.html" class="header__nav-link">Experiências</a>
            <a href="/fotos.html" class="header__nav-link">Fotos</a>
            <a href="/eventos-riocentro.html" class="header__nav-link">Eventos</a>
            <a href="/localizacao.html" class="header__nav-link">Localização</a>
            <a href="/reservas.html" class="header__nav-link">Contato</a>
          </nav>

          <div class="header__cta">
            <a href="https://wa.me/5521978730606?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Rio%20Haven%20e%20gostaria%20de%20consultar%20disponibilidade%20para%20hospedagem." target="_blank" rel="noopener" class="header__wa-btn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 0 0 .917.918l4.462-1.494A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 0 1-5.39-1.582l-.386-.235-2.661.89.89-2.659-.256-.406A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Reservar pelo WhatsApp
            </a>
            <button class="header__hamburger" id="hamburger-btn" aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
    `;
  }
}
if (!customElements.get('app-header')) {
  customElements.define('app-header', AppHeader);
}
