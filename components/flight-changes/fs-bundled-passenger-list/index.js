import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '@alaskaairux/auro-header';

class PassengerList extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      listLabel: {type: String},
      listItems: {type: Array},
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--auro-font-family-default);
        font-weight: var(--auro-text-body-default-weight);
        font-size: var(--auro-text-body-size-default);
        color: var(--auro-color-text-primary-on-light);
      }
      .list {
        padding: 0 0 var(--auro-size-lg) var(--auro-size-xxs);
      }
      li {
        padding: 0 0 var(--auro-size-xxs) 0;
      }
      ol {
        padding-left: var(--auro-size-lg);
        margin: 0;
      }
    `;
  }

  createRenderRoot() {
    if (isIE11()) {
      /**
       * Render template without shadow DOM for IE. Note that shadow DOM features like
       * encapsulated CSS and slots are unavailable.
       */
      return this;
    }
    return super.createRenderRoot();
  }

  render() {
    return html`${isIE11() ?
        html`<style>
            ${unsafeCSS(PassengerList.styles)}
          </style>` :
        ``}
      <div class="list">
        <auro-header level="5" display="400" id="list-header" type="px" margin="top" size="none">
          ${this.listLabel}
        </auro-header>
        <ol>
          ${this.listItems.map((name, idx) => html`
            <li id="list-item-${idx}">${name}</li>
          `)}
        </ol>
      </div>
    `;
  }
}

if (!customElements.get('fs-bundled-passenger-list')) {
  customElements.define('fs-bundled-passenger-list', PassengerList);
}
