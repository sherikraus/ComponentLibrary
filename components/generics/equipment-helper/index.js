import {css, html, LitElement, unsafeCSS} from 'lit-element';

import {isIE11} from '../../shared/utility';
import cacheFetch from '../../shared/cacheFetch';

class EquipmentHelper extends LitElement {
  static get properties() {
    return {
      code: {type: String},
      equipment: {type: Object},
      url: {type: Boolean},
      index: {type: String},
    };
  }

  static get styles() {
    return css`
      :host {
        font-size: 16px;
        font-family: var(--auro-font-family-default);
        color: var(--auro-color-text-secondary-on-light);
      }
      .equipment {
        display: inline-block;
      }
      .equipment-name {
        padding-left: var(--auro-size-xxs);
        min-width: 27px;
        text-align: right;
      }

      .url-name {
        font-size: 12px;
      }
      
    `;
  }

  async firstUpdated() {
    try {
      const equipmentJson = await cacheFetch(`https://www.alaskaair.com/shopping/ETInfo/Equipment?iata=${this.code}`, {responseParser: ((res) => res.json() )});
      this.equipment = equipmentJson;
    } catch (err) {
      console.error('Error fetching equipment ', this.code, err);
    }
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
    let name = 'N/A';
    let url = '';

    if (this.equipment) {
      name = this.equipment.name;
      if (this.url) {
        url = this.equipment.url;
      }
    }


    return html`
            ${isIE11() ? html`<style>${unsafeCSS(EquipmentHelper.styles)}</style>` : ''}
            <div class="airport" id="${this.index}">
              <div class="auro util_body--sm airport-name" title="${name}">
                ${this.url ? html`
                  <a href=${url} class="url-name">
                    ${url !== '' ? html`View Info` : html``}
                  </a>
                ` : html`
                  ${name}
                `}
              </div>
            </div>
        `;
  }
}

if (!customElements.get('equipment-helper')) {
  customElements.define('equipment-helper', EquipmentHelper);
}
