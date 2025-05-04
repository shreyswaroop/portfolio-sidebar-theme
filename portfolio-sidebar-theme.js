/**
 * Copyright 2025 shreyswaroop
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `portfolio-sidebar-theme`
 * 
 * @demo index.html
 * @element portfolio-sidebar-theme
 */
export class PortfolioSidebarTheme extends DDDSuper(I18NMixin(LitElement)) {
  static get properties() {
    return {
      activeScreen: { type: String },
      showScrollTop: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.activeScreen = "";
    this.showScrollTop = false;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        height: 100vh;
      }

      nav {
        width: 200px;
        background-color: var(--ddd-theme-default-beaverBlue, #1e407c);
        color: white;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      nav a {
        background: transparent;
        color: white;
        padding: 12px;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s;
      }

      main {
        flex: 1;
        overflow-y: auto;
        padding: var(--ddd-spacing-6, 32px);
        background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
      }

      .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--ddd-theme-default-beaverBlue, #1e407c);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        transition: background 0.3s;
        z-index: 1000;
      }

      .scroll-top:hover {
        background-color: var(--ddd-theme-default-beaverBlue, #1c3f7a);
      }

      .download-resume-btn {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #222;
        color: white;
        padding: 12px 20px;
        border-radius: 20px;
        text-decoration: none;
        transition: background 0.3s;
        z-index: 1000;
      }

      .download-resume-btn:hover {
        background: #444;
      }

      .profile-pic {
        width: 180px;
        height: 180px;
        object-fit: cover;
        border-radius: 50%;
        display: block;
        margin: 0 auto 20px auto;
      }
    `;
  }

  render() {
    return html`
      <nav>
        <a href="#home" @click="${(e) => this._handleLinkClick(e, 'home')}">Home</a>
        <a href="#projects" @click="${(e) => this._handleLinkClick(e, 'projects')}">Projects</a>
        <a href="#experience" @click="${(e) => this._handleLinkClick(e, 'experience')}">Experience</a>
        <a href="#work" @click="${(e) => this._handleLinkClick(e, 'work')}">Work</a>
        <a href="#contact" @click="${(e) => this._handleLinkClick(e, 'contact')}">Contact</a>
      </nav>
      <main>
        <slot></slot>

        
        ${this.showScrollTop
          ? html`<button class="scroll-top" @click="${this._scrollToTop}">↑ Back to Top</button>`
          : ""}

        
        ${this.activeScreen === "projects"
          ? html`<a class="download-resume-btn" href="/resume.pdf" download target="_blank">Download Resume</a>`
          : ""}
      </main>
    `;
  }

  _handleLinkClick(e, screenId) {
    e.preventDefault();
    this._scrollToScreen(screenId);
  }

  _scrollToScreen(screenId) {
    const target = this.querySelector(`#${screenId}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${screenId}`);
      this.activeScreen = screenId;
    }
  }

  _scrollToTop() {
    this.shadowRoot.querySelector("main").scrollTo({ top: 0, behavior: "smooth" });
  }

  firstUpdated() {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      this._scrollToScreen(hash);
    }
    this.shadowRoot.querySelector("main").addEventListener("scroll", () => {
      this.showScrollTop = this.shadowRoot.querySelector("main").scrollTop > 300;
    });
  }
}

customElements.define("portfolio-sidebar-theme", PortfolioSidebarTheme);
