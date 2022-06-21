import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../../shared/utility';
import styles from './styles-css';
import '@alaskaairux/auro-hyperlink';
import '../../../flight-results/fs-matrix-faretype-cell';
import '@alaskaairux/auro-interruption/dist/auro-dialog';
import '@alaskaairux/auro-icon';

class FSModalSaverToMainUpsell extends LitElement {
  static get properties() {
    return {
      price: {type: String},
      roundTrip: {type: Boolean},
      acceptHandler: {type: String},
      cancelHandler: {type: String},
      mow: {type: Boolean},
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

  handleCancel() {
    this.dispatchEvent(new CustomEvent('saverCancel', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  handleAccept() {
    this.dispatchEvent(new CustomEvent('saverAccept', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  showModalBasic() {
    const upsell = this.shadowRoot.querySelector('#compare-saver-to-main-modal');
    upsell.removeAttribute('open');
    upsell.setAttribute('open', '');
  }

  hideModalBasic() {
    const upsell = this.shadowRoot.querySelector('#compare-saver-to-main-modal');
    upsell.removeAttribute('open');
  }

  showModal(elName, event) {
    const upsell = this.shadowRoot.querySelector(elName);
    event.stopPropagation();
    upsell.removeAttribute('open');
    upsell.setAttribute('open', '');
  }

  render() {
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(FSModalCompareFares.styles)}</style>` : ''}
            <auro-dialog id="compare-saver-to-main-modal" modal lg>
              <span slot="header" class="header-slot-text">Get more with Main</span>
              <div slot="content">
                <span class="header-description">
                    Saver fare has restrictions, even for Mileage Plan&trade;
                    Elite members. Main gives you more options and flexibility.
                </span>
                <table class="auro_table">
                  <thead>
                  <tr>
                  <th></th>
                  <th></th>
                  <th class="primary-heading saver"><span class="youSelected">You selected</span><br/>Saver</th>
                  <th class="primary-heading main">Main</th>
                </tr>
                <tr style="background-color: unset;">
                  <th class="nopadding"></th>
                  <th class="nopadding"></th>
                  <th class="nopadding secondary-heading saver"><div></div></th>
                  <th class="nopadding secondary-heading main"><div></div></th>
                </tr>
                  </thead>
                  <tbody>
                    <tr class="fare-comparison-details">
                      <td>
                        <auro-icon category="in-flight" name="seat"></auro-icon>
                      </td>
                      <td>
                        Seat Selection
                      </td>
                      <td class="center saver">Limited<sup>1</sup></td>
                      <td class="center main">
                        <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                      </td>
                    </tr>
                    <tr class="fare-comparison-details">
                      <td>
                        <auro-icon category="in-flight" name="boarding"></auro-icon>
                      </td>
                      <td>
                        Boarding and overhead bin access<sup>2</sup>
                      </td>
                      <td class="center saver">Last</td>
                      <td class="center main">
                        <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                      </td>
                    </tr>
                    <tr class="fare-comparison-details">
                      <td>
                        <auro-icon category="in-flight" name="elite"></auro-icon>
                      </td>
                      <td>
                        Mileage Plan&trade; Elite Benefits
                      </td>
                      <td class="center saver">Limited<sup>3</sup></td>
                      <td class="center main">
                        <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                      </td>
                    </tr>
                    <tr class="fare-comparison-details">
                      <td>
                        <auro-icon category="terminal" name="flight-changes"></auro-icon>
                      </td>
                      <td> 
                        Flight Changes (including same-day)<sup>4</sup>
                      </td>
                      <td class="center saver">
                        <auro-icon category="interface" name="x-lg"></auro-icon>
                      </td>
                      <td class="center main">
                        <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="upsell-content">
                  <span class="subtext">For only</span>
                  <span class="price">$${this.price}</span>
                  <span class="subtext color--secondary">more</span>
                </div>
                
                <div class="buttons">
                  <auro-button secondary class="top" onclick="${this.cancelHandler}" @click=${this.handleCancel}>
                    <span class="button-content">Continue with Saver</span>
                  </auro-button>
                  <div class="spacer"></div>
                  <auro-button class="bottom" onclick="${this.acceptHandler}" @click=${this.handleAccept}>
                    <span class="button-content">Select Main</span>
                  </auro-button>
                </div>
                <div class="fine-print">
                  <ol>
                    <li>Seats unavailable during purchase will be assigned in the main cabin at 
                      the gate. This option is not recommended for parties of two or more.</li>
                    <li>Passengers are allowed one carry-on + one personal item. Overhead bin 
                      space is on a first-come, first-served basis. Elite Mileage Plan passengers 
                      keep Elite boarding status.</li>
                    <li>Elite members do not receive preferred seating or upgrade benefits with Saver fares.
                       On all fares including Saver, Elites receive bonus miles, baggage allowances, 
                      check-in benefits, and priority boarding. All other Saver fare rules 
                      and restrictions apply to MVP&reg;, MVP&reg; Gold, and MVP&reg; Gold 75k Mileage 
                      Plan members.</li>
                    <li>Our 24-hour cancellation policy applies to all fares. Otherwise Saver fares
                      may not be changed or canceled. A difference in fare may apply to changes made including
                      Main and First Class fares. A $50 fee applies to same-day confirmed changes.</li>
                  </ol>
                </div>
              </div>
            </auro-dialog>
            ${!this.mow ? html`
            <auro-hyperlink role="button" href="#" 
              @click=${(event) => this.showModal('#compare-saver-to-main-modal', event)}>
            Compare Fare Types</auro-hyperlink>
            ` : ''}

        `;
  }
}

if (!customElements.get('fs-modal-saver-to-main-upsell')) {
  customElements.define('fs-modal-saver-to-main-upsell', FSModalSaverToMainUpsell);
}
