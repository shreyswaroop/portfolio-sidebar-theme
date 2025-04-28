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
      activeScreen: {type: String},
    };
  }
  constructor() {
    super();
    this.activeScreen = "";
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
      padding: var(--ddd-spacing-4, 16px);
      display: flex;
      flex-direction: column;
    }

    nav a {
      background: black;
      color: white;
      text-align: left;
      padding: var(--ddd-spacing-2, 8px) 0;
      font-size: var(--ddd-font-size-md, 1rem);
      cursor: pointer;
    }
    main {
      flex: 1;
      overflow-y: auto;
      padding: var(--ddd-spacing-4, 16px);
      background-color: var(--ddd-theme-default-white, #ffffff);
    }
   `;
  }


  render() {
    return html`
      <nav>
        <a href="#about" @click="${(e) => this._handleLinkClick(e, 'about')}">About</a>
        <a href="#projects" @click="${(e) => this._handleLinkClick(e, 'projects')}">Projects</a>
        <a href="#experience" @click="${(e) => this._handleLinkClick(e, 'experience')}">Experience</a>
        <a href="#work" @click="${(e) => this._handleLinkClick(e, 'work')}">Work</a>
        <a href="#contact" @click="${(e) => this._handleLinkClick(e, 'contact')}">Contact</a>
      </nav>
      <main>
        <slot></slot>
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
    }
  }

  firstUpdated() {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      this._scrollToScreen(hash);
    }
  }
}

customElements.define("portfolio-sidebar-theme", PortfolioSidebarTheme);

