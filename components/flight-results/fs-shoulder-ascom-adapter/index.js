import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '../fs-shoulder';

class FsShoulderAscomAdapter extends LitElement {
  static get properties() {
    return {
      model: {type: Array},
      leg: {type: Number},
      minifiedModel: {type: Array},
    };
  }

  static get styles() {
    return css`
      :host {
          color: green;
      }
    `;
  }

  unmarshalModel() {
    const result = [];
    this.model.map((leg) => {
      const temp = [];
      leg.ShoulderDayList.ShoulderDays.map((shoulderDay) => {
        temp.push({
          id: shoulderDay.ID,
          date: shoulderDay.Date.substring(0, 10),
          price: '$' + Math.ceil(parseFloat(shoulderDay.Price)).toFixed(0),
          selected: Boolean(shoulderDay.Selected),
          enabled: Boolean(shoulderDay.Enabled && shoulderDay.Price != 0),
        });
      });
      result.push(temp);
    });

    this.minifiedModel = result[this.leg];
    return result[this.leg];
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
            ${isIE11() ? html`<style>${unsafeCSS(FsShoulderAscomAdapter.styles)}</style>` : ''}
            ${this.minifiedModel? html`
            <fs-shoulder days=${JSON.stringify(this.minifiedModel)} 
            placement="ascom" resultid=${this.leg}></fs-shoulder>
            ` : html``}
        `;
  }
}

if (!customElements.get('fs-shoulder-ascom-adapter')) {
  customElements.define('fs-shoulder-ascom-adapter', FsShoulderAscomAdapter);
}
