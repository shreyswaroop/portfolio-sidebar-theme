import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";


export class PortfolioSidebar extends DDDSuper(LitElement) {
  static get tag() {
    return "portfolio-sidebar";
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        width: 200px;
        height: 100vh;
        background-color: var(--ddd-theme-default-beaverBlue, #1e407c);
        color: white;
        font-family: var(--ddd-font-navigation, sans-serif);
        padding: var(--ddd-spacing-4);
        box-sizing: border-box;
      }
    `];
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define(PortfolioSidebar.tag, PortfolioSidebar);
