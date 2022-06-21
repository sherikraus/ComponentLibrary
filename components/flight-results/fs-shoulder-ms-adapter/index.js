import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '../fs-shoulder';

class FsShoulderMSAdapter extends LitElement {
  static get properties() {
    return {
      model: {type: Array},
      searchDate: {type: String},
      minifiedModel: {type: Array},
      resultId: {type: Number},
    };
  }

  static get styles() {
    return css`
      :host {
      }
    `;
  }

  unmarshalModel() {
    const result = [];
    this.model.forEach((day) => {
      result.push({
        id: 0,
        date: day.DepartureDate,
        price: '$' + Math.ceil(day.Price),
        selected: day.DepartureDate == this.searchDate,
        enabled: day.Price != 0,
      });
    });
    this.minifiedModel = result;
    return result;
  }

  milesFormatter(number) {
    return Math.abs(number) > 999 ?
        Math.sign(number)*((Math.abs(number)/1000).toFixed(1)) + 'k' :
        Math.sign(number)*Math.abs(number);
  }

  firstUpdated() {
    this.unmarshalModel();

    // for keyboard users, focus on the selected pane
    this.addEventListener('focusin', (evt) => {
      if (evt.target.getAttribute('class') === 'focus-visible') {
        const slots = this.shadowRoot.querySelector('fs-shoulder').shadowRoot.querySelectorAll('auro-pane');
        slots.forEach((slot) => {
          if (slot.getAttribute('selected') !== null) {
            slot.focus();
          }
        });
      }
    });
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
    return html`
      ${isIE11() ? html`<style>${unsafeCSS(FsShoulderMSAdapter.styles)}</style>` : ''}
      ${this.minifiedModel? html`
      <fs-shoulder days=${JSON.stringify(this.minifiedModel)} placement="ms" 
      resultId=${this.resultId}></fs-shoulder>
      ` : html``}
    `;
  }
  updated(changedProperties) {
    if (changedProperties.has('searchDate')) {
      this.unmarshalModel();
      const slots = this.shadowRoot.querySelector('fs-shoulder').shadowRoot.querySelectorAll('auro-pane');
      slots.forEach((slot) => {
        if (slot.getAttribute('selected') !== null) {
          slot.focus();
        }
      });
    }
  }
}
if (!customElements.get('fs-shoulder-ms-adapter')) {
  customElements.define('fs-shoulder-ms-adapter', FsShoulderMSAdapter);
}
