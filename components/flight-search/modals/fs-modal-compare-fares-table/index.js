import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../../shared/utility';
import assignIconFromProperty from '../../../shared/buildIcon';
import styles from './styles-css';
import '@alaskaairux/auro-hyperlink';
import '../../../flight-results/fs-matrix-faretype-cell';
import '@alaskaairux/auro-interruption/dist/auro-dialog';
import '@alaskaairux/auro-icon';

class FSModalCompareFaresTable extends LitElement {
  constructor() {
    super();
    this.collapsed = true;
  }
  async firstUpdated() {
    this.accordionIcon = await assignIconFromProperty(this.accordionIcon, 'chevron-down');
  }

  toggleAccordion() {
    this.collapsed = !this.collapsed;
  }
  static get properties() {
    return {
      mow: {type: Boolean},
      accordionIcon: {type: String},
      collapsed: {type: Boolean},

    };
  }

  static get styles() {
    return css`
      ${styles}
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

  showModal(elName, event) {
    const upsell = this.shadowRoot.querySelector(elName);
    event.stopPropagation();
    upsell.removeAttribute('open');
    upsell.setAttribute('open', '');
  }
  showModalBasic() {
    const upsell = this.shadowRoot.querySelector('auro-dialog');
    upsell.removeAttribute('open');
    upsell.setAttribute('open', '');
  }

  render() {
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(FSModalCompareFaresTable.styles)}</style>` : ''}
              <div slot="content">
              <table class="auro_table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th class="primary-heading saver"><div>Saver</div></th>
                  <th class="primary-heading main"><div>Main</div></th>
                  <th class="primary-heading first"><div>First Class</div></th>
                </tr>
                <tr style="background-color:unset;">
                  <th></th>
                  <th></th>
                  <th class="secondary-heading saver"><div></div></th>
                  <th class="secondary-heading main"><div></div></th>
                  <th class="secondary-heading first"><div></div></th>
                </tr>
                </thead>
                <tbody>
                  <td class="center icon">
                    <auro-icon category="in-flight" name="seat"></auro-icon>
                  </td>
                  <td>Seat Selection</td>
                  <td class="center icon">
                    <auro-icon category="interface" name="x-lg"></auro-icon>
                  </td>
                  <td class="center">Main Cabin</td>
                  <td class="center">First Class Cabin</td>
                </tr>
                <tr>
                  <td class="center icon">
                    <auro-icon category="in-flight" name="boarding"></auro-icon>
                  </td>
                  <td>Boarding and overhead bin access<sup>2</sup></td>
                  <td class="center">Last</td>
                  <td class="center">General</td>
                  <td class="center">Priority</td>
                </tr>
                <tr>
                  <td class="center icon">
                    <auro-icon category="in-flight" name="elite"></auro-icon>
                  </td>
                  <td>Mileage Plan&trade; Elite Benefits</td>
                  <td class="center">Limited<sup>3</sup></td>
                  <td class="center icon">
                    <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                  </td>
                  <td class="center icon">
                    <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                  </td>
                </tr>
                <tr>
                  <td class="center icon">
                    <auro-icon category="terminal" name="flight-changes"></auro-icon>
                  </td>
                  <td>Flight Changes (including same-day)<sup>4</sup></td>
                  <td class="center icon">
                    <auro-icon category="interface" name="x-lg"></auro-icon>
                  </td>
                  <td class="center icon">
                    <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                  </td>
                  <td class="center icon">
                    <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                  </td>
                </tr>
                <tr>
                  <td class="center icon">
                    <auro-icon category="interface" name="star-stroke"></auro-icon>
                  </td>
                  <td>Miles flown = miles earned<sup>5</sup></td>
                  <td class="center icon">
                    <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                  </td>
                  <td class="center icon">
                    <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                  </td>
                  <td class="center icon">
                    <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                  </td>
                </tr>
              </tbody>
            </table>

                <div class="footnotes-container">

              <slot name="title" @click=${this.toggleAccordion}>
              ${this.collapsed ? 'Expand to read more' : 'Collapse to read less'}
                <slot name="accordion-icon" class="${this.collapsed ? 'closed' : 'open'}">
                  ${this.accordionIcon}
                </slot>
            </slot>
                             
              <div class="collapsed-content-container ${this.collapsed ? 'closed' : 'open'}">
                <span class="collapsed-content">
                  <ol class="fine-print">
                    <li>Seats unavailable during purchase will be assigned in the main cabin at 
                      the gate. This option is not recommended for parties of two or more.</li>
                    <li>Passengers are allowed one carry-on + one personal item. Overhead bin 
                      space is on a first-come, first-served basis. Elite Mileage Plan members 
                      get priority boarding.</li>
                    <li>Elite Mileage Plan members do not receive  
                      preferred seating or upgrade benefits with Saver fares. On all fares 
                      including Saver, Elites receive bonus miles, baggage allowances, 
                      check-in benefits, and priority boarding. All other Saver fare rules 
                      and restrictions apply.</li>
                      <li>Our 24-hour cancellation policy applies to all fares. Otherwise Saver 
                        fares may not be changed or canceled.
                      Differences in fare may apply to changes made to Main and First Class fares
                      . A $50 fee applies to same-day confirmed changes.
                      </li>
                    <li>Miles are awarded on qualifying fares.</li>
                </ol>
              </div>
                </div>
              </div>
        `;
  }
}

if (!customElements.get('fs-modal-compare-fares-table')) {
  customElements.define('fs-modal-compare-fares-table', FSModalCompareFaresTable);
}
