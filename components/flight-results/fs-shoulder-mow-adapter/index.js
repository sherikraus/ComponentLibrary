import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '../fs-shoulder';

class FsShoulderMowAdapter extends LitElement {
  static get properties() {
    return {
      model: {type: Array},
      leg: {type: Number},
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
    this.model.map((shoulderDay, idx) => {
      const date = shoulderDay.DepartureDate.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3/$1/$2').split('/');

      if (date[1].length == 1) {
        date[1] = '0' + date[1];
      }
      if (date[2].length == 1) {
        date[2] = '0' + date[2];
      }

      const displayedPrice = !!shoulderDay.Miles ?
        `${this.milesFormatter(shoulderDay.Miles)}+` :
        shoulderDay.DisplayPrice;

      result.push({
        id: 0,
        date: date.join('/'),
        price: displayedPrice,
        selected: false || idx === 3,
        enabled: !Boolean(shoulderDay.IsDisabled || shoulderDay.DisplayPrice == 0),
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
            ${isIE11() ? html`<style>${unsafeCSS(FsShoulderMowAdapter.styles)}</style>` : ''}
            ${this.minifiedModel? html`
            <fs-shoulder days=${JSON.stringify(this.minifiedModel)} placement="mow" 
            resultId=${this.resultId}></fs-shoulder>
            ` : html``}
        `;
  }
}

if (!customElements.get('fs-shoulder-mow-adapter')) {
  customElements.define('fs-shoulder-mow-adapter', FsShoulderMowAdapter);
}
