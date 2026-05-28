import logoUrl from '../../images/logo-rio-haven.webp';

export class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer" id="footer">
        <div class="container">
          <div class="footer__top">
            <div>
              <div class="footer__logo">
                <img src="${logoUrl}" alt="Rio Haven" class="footer__logo-img">
                <div>
                  <span class="footer__logo-name">Rio Haven</span><br>
                  <span class="footer__logo-sub">Pousada &amp; Hostel</span>
                </div>
              </div>
              <p class="footer__tagline">Hospedagem estratégica e experiências inesquecíveis no Rio de Janeiro.</p>
              <div class="footer__social">
                <a href="#" class="footer__soc-link" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                <a href="#" class="footer__soc-link" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                <a href="#" class="footer__soc-link" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a>
              </div>
            </div>
            <div>
              <h4 class="footer__col-title">Navegação</h4>
              <div class="footer__links">
                <a href="index.html" class="footer__link">Início</a>
                <a href="acomodacoes.html" class="footer__link">Acomodações</a>
                <a href="experiencias.html" class="footer__link">Experiências</a>
                <a href="eventos-riocentro.html" class="footer__link">Eventos</a>
              </div>
            </div>
            <div>
              <h4 class="footer__col-title">Acesso rápido</h4>
              <div class="footer__links">
                <a href="localizacao.html" class="footer__link">Localização</a>
                <a href="reservas.html" class="footer__link">Reservas</a>
                <a href="politicas.html" class="footer__link">Políticas</a>
              </div>
            </div>
            <div>
              <h4 class="footer__col-title">Contato</h4>
              <div class="footer__contact-item">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                <span><a href="https://wa.me/5521978730606" target="_blank">+55 21 97873-0606</a><br>WhatsApp</span>
              </div>
              <div class="footer__contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Camorim — Rio de Janeiro, RJ</span>
              </div>
            </div>
          </div>
          <div class="footer__bottom">
            <span class="footer__copy">&copy; 2025 Rio Haven Pousada &amp; Hostel. Todos os direitos reservados.</span>
            <span class="footer__disc">Disponibilidade, valores e condições sujeitos à confirmação da equipe.</span>
          </div>
        </div>
      </footer>
    `;
  }
}
if (!customElements.get('app-footer')) {
  customElements.define('app-footer', AppFooter);
}
