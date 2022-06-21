import {css, html, LitElement} from 'lit-element';
import stylesCss from './styles-css.js';
import lounges from '../../../hooks/lounges-data.js';
import '../../generics/airport-helper';
import '@alaskaairux/auro-button';
import '@alaskaairux/auro-icon';

class FareUpsell extends LitElement {
  static get properties() {
    return {
      price: {type: String},
      totalPrice: {type: String},
      upgradeLink: {type: String},
      roundTrip: {type: Boolean},
      main: {type: Boolean},
      first: {type: Boolean},
      departures: {type: String},
      luggage: {type: Boolean},
      meal: {type: Boolean},
      boarding: {type: Boolean},
      loungeAd: {type: Boolean},
    };
  }

  static get styles() {
    return css`${stylesCss}`;
  }

  fireUpgrade() {
    if (!!this.onUpgrade) {
      this.onUpgrade();
    }
    window.location.href = this.upgradeLink;
  }

  freeLoungeEligible(departures) {
    if (!departures || !this.loungeAd) {
      return null;
    }
    const stations = departures.split('|');
    return {
      departure: lounges.some((lounge)=> stations.includes(lounge.airportCode)),
      layover: lounges.some((lounge)=> stations.slice(1).includes(lounge.airportCode)),
    };
  }

  mainTemplate() {
    return html`
      <li class="icon">
        <div class="icon-container">
          <auro-icon category="in-flight" name="seat" accent customSize></auro-icon>
        </div>
        <p>You have the freedom to choose your own seats.</p>
      </li>
      <li class="icon">
        <div class="icon-container">
          <auro-icon category="interface" name="calendar" accent customSize></auro-icon>
        </div>
        <p>Plans changed? You can cancel your flight (before it departs) or change it.</p>
      </li>
      <li class="icon">
        <div class="icon-container">
          <auro-icon category="interface" name="star-stroke" accent customSize></auro-icon>
        </div>
        <p>Get all of your Elite benefits, complimentary upgrades, and Mileage Plan perks.</p>
      </li>
    `;
  }

  firstTemplate() {
    const freeLounge = this.freeLoungeEligible(this.departures);

    return html`
      ${freeLounge && freeLounge.departure ? html`
        <li class="icon">
          <div class="icon-container">
            <auro-icon category="terminal" name="lounge" accent customSize></auro-icon>
          </div>
          <p>
            Complimentary Alaska Lounge access before outgoing flight${freeLounge.layover ? ' and layovers' : null}.
          </p>
        </li>` :
        null }
      
      <li class="icon">
        <div class="icon-container">
          <auro-icon category="in-flight" name="first-class-legroom" accent customSize></auro-icon>
        </div>
        <p>Roomy seats with spacious legroom.</p>
      </li>
      ${this.luggage ? html`
        <li class="icon">
          <div class="icon-container">
            <auro-icon category="in-flight" name="luggage" accent customSize></auro-icon>
          </div>
          <p>Check in two complimentary bags.</p>
        </li>
      ` : null}
      ${this.meal ? html`
        <li class="icon">
          <div class="icon-container">
            <auro-icon category="in-flight" name="food-and-drink" accent customSize></auro-icon>
          </div>
          <p>Pre-order complimentary meals and snacks.</p>
        </li>
      ` : null}
      ${this.boarding ? html`
        <li class="icon">
          <div class="icon-container">
            <auro-icon category="in-flight" name="boarding" accent customSize></auro-icon>
          </div>
          <p>Priority boarding at check-ins.</p>
        </li>
      ` : null}
    `;
  }

  render() {
    const imageUrl = this.main ?
    'https://resource.alaskaair.net/-/media/Images/pathtopurchase/saver-flipped-sm':
    'https://resource.alaskaair.net/-/media/Images/pathtopurchase/windowseat-views';

    return html`
      <div class="upsell-container">
        <!-- Image Section -->
        <div class="image-column" style="background-image: url(${imageUrl})"></div>

        <!-- Perks Section -->
        <div class="perks-section">
          <div class="header">
            <slot name="upsell-title" class="title">
              ${this.main ? 'Keep your travel flexible with Main' : 'Travel in unrivaled comfort'}
            </slot>
            <slot name="sub-title" class="subtitle">
              ${this.first ? 'First seated. First served. First Class.' : ''}
            </slot>
          </div>
          
          <ul class="perks-list">
            ${this.first ? this.firstTemplate() : null}
            ${this.main ? this.mainTemplate() : null}
            <!-- Additional Perks -->
            <slot name="perk"></slot>
          </ul>
        </div>
      
        <div class="divider"></div>

        <!-- Price Section -->
        <div class="price-section">
          <div class="price-container">
            <div class="price-subtotal">+$${this.price} USD</div>
            <div class="text--secondary">${this.roundTrip ? 'round-trip per passenger' : 'per passenger'}</div>
          </div>
          <div class="price-total">
            <div class="text--secondary">Total $${this.totalPrice}</div>
            <div class="text--secondary">(for all passengers)</div>
          </div>
          <auro-button responsive secondary href="${this.upgradeLink}" @click="${this.fireUpgrade}">
            <slot name="upgrade-cta">Upgrade Fare</slot>
          </auro-button>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('fare-upsell')) {
  customElements.define('fare-upsell', FareUpsell);
}
