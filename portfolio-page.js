import { LitElement, html, css }from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";


export class PortfolioPage extends DDDSuper(LitElement){
    static get tag() {
        return "portfolio-page";
    }

    constructor() {
        super();
        this.title = "";
    }

    static get properties() {
        return {
            ...super.properties,
            title: { type: String },
        };
    }
    static get styles() {
        return [super.styles, css`
          :host {
            display: block;
            padding: var(--ddd-spacing-6, 24px);
            background-color: var(--ddd-theme-default-white, white);
            box-sizing: border-box;
            scroll-margin-top: 80px;
          }

          h2 {
            font-size: var(--ddd-font-size-xl, 2rem);
            color: var(--ddd-theme-default-black, black);
            margin-bottom: var(--ddd-spacing-4, 16px);
          }
        `];
    }   
    
    render() {
        return html`
          <section>
            <h2>${this.title}</h2>
            <slot></slot>
          </section>
        `;
    }
    
    
}
globalThis.customElements.define(PortfolioPage.tag, PortfolioPage);
