import { css, html, LitElement, property } from 'lit-element';
import stylesCss from './styles-css.js';
import "@alaskaairux/auro-interruption/dist/auro-dialog";
import '@alaskaairux/auro-header';
import '@alaskaairux/auro-icon';
import '@alaskaairux/auro-button';
import '@alaskaairux/auro-accordion';

export class SaverUpsellDialog extends LitElement {
  @property({type: Number})
  price: number = 0;

  @property({type: Boolean})
  roundtrip: boolean = false;

  // to be removed after ASCOM release
  @property({type: Function})
  acceptHandler: Function = null;

  // to be removed after ASCOM release
  @property({type: Function})
  cancelHandler: Function = null;

  showModalBasic() {
    // Do not display the dialog if the price is < 0
    if (this.price <= 0) {
      return;
    }
    const upsell = this.shadowRoot.querySelector('#saver-upsell-dialog');
    upsell.removeAttribute('open');
    upsell.setAttribute("open", "true");
  }

  hideModalBasic() {
    const upsell = this.shadowRoot.querySelector('#saver-upsell-dialog');
    upsell.removeAttribute('open');
  }

  handleCancel() {
    this.hideModalBasic();
    this.dispatchEvent(new CustomEvent('saverCancel', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  handleAccept() {
    this.hideModalBasic();
    this.dispatchEvent(new CustomEvent('saverAccept', {
      bubbles: true,
      cancelable: false,
      composed: true,
    }));
  }

  static override styles = css`${stylesCss}`;

  override render() {
    return html`
      <auro-dialog  id="saver-upsell-dialog" unformatted modal ondark>
        <div slot="content">
          <div class="header">
            <auro-header id="dialog-header" level="1" display="800" margin="both" size="none">Be flexible with Main</auro-header>
            <p class="header-subtext">
              Alaska Airlines' Main gives you more flexibility for your travel, 
              including the ability to change your flight and choosing where you would like to sit.
            </p>
          </div>
          
          <main class="main-content">           
            <table class="auro_table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th class="saver fare">
                    <div class="flex">
                      <div class="youSelected">Currently selected</div>
                      Saver
                      <div class="saver-border"></div>
                    </div>
                  </th>
                  <th class="main fare">
                    <div class="flex">
                      Main
                      <div class="main-border"></div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="fare-comparison-details">
                  <td class="icon">
                    <auro-icon category="in-flight" name="seat"></auro-icon>
                  </td>
                  <td class="key">Seat Selection</div></td>
                  <td class="value">
                    <auro-icon category="interface" name="x-lg"></auro-icon>
                  </td>
                  <td class="value">
                    <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                  </td>
                </tr>               
                <tr class="fare-comparison-details">
                  <td class="icon">
                    <auro-icon category="in-flight" name="boarding"></auro-icon>
                  </td>
                  <td class="key">Boarding and overhead bin access<sup>1</sup></td>
                  <td class="value">Last</td>
                  <td class="value">
                    <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                  </td>
                </tr>
                <tr class="fare-comparison-details">
                  <td class="icon">
                    <auro-icon category="in-flight" name="elite"></auro-icon>
                  </td>
                  <td class="key">Mileage Plan&trade; Elite Benefits</td>
                  <td class="value">Limited<sup>2</sup></td>
                  <td class="value">
                    <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                  </td>
                </tr>
                <tr class="fare-comparison-details">
                  <td class="icon">
                    <auro-icon category="terminal" name="flight-changes"></auro-icon>
                  </td>
                  <td class="key">Flight Changes (including same-day)<sup>3</sup></td>
                  <td class="value">
                    <auro-icon category="interface" name="x-lg"></auro-icon>
                  </td>
                  <td class="value">
                    <auro-icon category="interface" name="checkmark-lg"></auro-icon>
                  </td>
                </tr>
              </tbody>
            </table>
          </main>
          <div class="cta-container">
            <div class="price-text">
              <span class="price-subtext">For only</span>
              <span class="price-amount">$${this.price}</span>
              <span class="price-subtext color--secondary">more</span>
            </div>
            <auro-button fluid secondary onclick="${this.cancelHandler}" @click=${this.handleCancel}>Continue with Saver</auro-button>
            <auro-button fluid onclick="${this.acceptHandler}" @click=${this.handleAccept}>Upgrade to Main</auro-button>
            <!-- should be changed to this after ASCOM is released -->
            <!-- <auro-button id="saver-cancel-btn" fluid secondary @click=${this.handleCancel}>Continue with Saver</auro-button>
            <auro-button id="saver-accept-btn" fluid @click=${this.handleAccept}>Upgrade to Main</auro-button> -->
          </div>
          <hr class="divider" />          
          <div class="rules-container">
            <auro-accordion expanded lowProfile noProfile justifyLeft>
              <span slot="trigger" class="text-blue">Fare rules</span>
              <ol class="fine-print">   
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
                <li>Saver fares cannot choose seats. Seats will be assigned to you at the airport.</li>
              </ol>
            </auro-accordion>
          </div>

          <div class="img-container">
            <img class="clipped" src="https://www.alaskaair.com/-/media/19A91E79072C4435BA907B1C5E9D813A" alt="Be flexible with Main" />
          </div>
        </div>
      </auro-dialog>
    `;
  }
}

if (!customElements.get('saver-upsell-dialog')) {
  customElements.define('saver-upsell-dialog', SaverUpsellDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    'saver-upsell-dialog': SaverUpsellDialog;
  }
}
