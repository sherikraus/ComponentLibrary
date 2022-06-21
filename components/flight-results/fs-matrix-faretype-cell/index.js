import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';

class FSMatrixFareTypeCell extends LitElement {
  static get properties() {
    return {
      label: {type: String},
      fareType: {type: String},
      id: {type: Number},
    };
  }

  static get styles() {
    return css`
      .cell-container {
        display: block;
        text-align: center;
        height: 118px;
        min-width: 186px;
        padding: 0px;
        width: 100%;
        box-sizing: content-box;
        vertical-align: middle;
        font-family: var(--auro-font-family-default);
        font-size:28px;
        line-height: 36px;
      }
      .flight-cell-price {
        color: white;
        display: inherit;
        padding-top: 40px;
      }
      .fare-saver {
        border-bottom-color: #099DC5;
        background-color: #099DC5;
        color: white;
      }
      .fare-main {
        border-bottom-color: #0074CA;
        background-color: #0074CA;
        color: white;
      }
      .fare-first {
        border-bottom-color: #00274A;
        background-color: #00274A;
        color: white;
      }
      .ondark-secondary {
        color: var(--auro-color-text-secondary-on-dark);
      }
      .ondark-primary {
        color: var(--auro-color-text-primary-on-dark);
      }
      .secondary {
        width: 100%;
        min-width: 116px;
        font-size: 12px;
        font-weight: 300;
        color: #222;
      }
      .secondary-saver {
        display: block;

        background-color: #f8fcfd;
      }
      .secondary-main {
        display: block;

        background-color: #eef4f9;
        font-weight: 600;
      }
      .secondary-first {
        display: block;
        background-color: #ecf0f3;
      }
    `;
  }


  handleFareClick(evt) {
    evt.stopPropagation();

    const modal = document.querySelector('auro-dialog');

    try {
      modal.removeChild(modal.querySelector('[slot="content"]'));
      modal.removeChild(modal.querySelector('[slot="header"]'));
    } catch (e) {
    }

    modal.setAttribute('md', true);

    const content = document.createElement('fs-modal-compare-fares-tabbed');
    content.setAttribute('slot', 'content');
    content.className = 'Compare Fares';

    const heading = document.createElement('span');
    heading.innerHTML = 'Compare Fares';
    heading.setAttribute('slot', 'header');

    modal.appendChild(heading);
    modal.appendChild(content);
    modal.setAttribute('open', true);
    modal.setAttribute('unformatted', true);
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
    let fareDecorator = '';
    switch (this.fareType) {
      case 'saver':
        fareDecorator = 'Most restricted';
        break;
      case 'main':
        fareDecorator = 'Most popular';
        break;
      case 'first':
        fareDecorator = 'Most comfortable';
        break;
    }
    return html`
      ${isIE11() ?
        html`<style>
            ${unsafeCSS(this.styles)}
          </style>` :
        ``}
      <div class="cell-container fare-${this.fareType}" id="fare-container" @click=${this.handleFareClick}>
        <span
          class="flight-cell-price auro auro_heading auro_heading--500 
              ${this.fareType === 'main' || this.fareType === 'first' ?
            'ondark-primary' :
            ''}"
          id="fare-label-${this.id}"
        >
          ${this.label}
        </span>
      </div>
      <div class="secondary">
        <span class="secondary-${this.fareType}" id="fare-label">
          ${fareDecorator}
        </span>
      </div>
    `;
  }
}

if (!customElements.get('fs-matrix-faretype-cell')) {
  customElements.define('fs-matrix-faretype-cell', FSMatrixFareTypeCell);
}

