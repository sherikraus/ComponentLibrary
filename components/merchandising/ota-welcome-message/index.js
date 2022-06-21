import {css, html, LitElement} from 'lit-element';

const siteCoreVendorURL = 'https://resource.alaskaair.net/-/media/';
const defaultImg = '95BA88B3311443E985130BEBCB2188BD';


// EX: https://alaskaair.com/cart?META=GOO_CS_X
// EX: https://alaskaair.com/cart?META=KYK_QQ_Y
const metaCodeMap = {
  'goo': 'google',
  'kyk': 'kayak',
  'tad': 'tripadvisor',
  'bng': 'bing',
  'hpm': 'hipmonk',
};

const vendors = {
  google: {
    name: 'Google Flights',
    img: 'E04D0153F7294F52A67340DB38FF680B',
  },
  orbitz: {
    name: 'Orbitz',
    img: 'E45C9DAF353D4BD8995CA59529C46DF9',
  },
  expedia: {
    name: 'Expedia',
    img: '9A875E5533D1401D986EC96103189E69',
  },
  travelocity: {
    name: 'Travelocity',
    img: '5E6EFBF46C34473283C04A6256A0C559',
  },
  cheapTickets: {
    name: 'Cheap Tickets',
    img: '79971F9FA6FE4779842DEE207A0D6A50',
  },
  skyscanner: {
    name: 'Skyscanner',
    img: 'ACFBE7BC2E0D4A9A8BB58570B5AED21F',
  },
  kayak: {
    name: 'Kayak',
    img: '97C4012EA16F44D98C3E5C8B6EEC5078',
  },
  bing: {
    name: 'Bing',
    img: '8B45722126BA4A49AA65887E86CC1D2B',
  },
  tripadvisor: {
    name: 'Tripadvisor',
    img: '68A36DB5FA3F4CF2B500A84AABE5165C',
  },
};

class OTAWelcomeMessage extends LitElement {
  constructor() {
    super();

    // if a default vendor isn't set and a query string exists
    if (!this.vendor && window.location.href.indexOf('?') != -1) {
      this.setVendorFromQueryString();
    }
  }

  setVendorFromQueryString() {
    try {
      const querys = window.location.href.split('?')[1].split('&').map((s) => {
        const keyVal = s.split('=');
        return {key: keyVal[0], val: keyVal[1]};
      });

      const meta = querys.find((q) => q.key.toLowerCase() === 'meta');

      if (!!meta) {
        // Remove everything after partner code
        const vendorName = metaCodeMap[meta.val.split('_')[0].toLowerCase()];
        if (!!vendors[vendorName]) {
          this.vendor = vendorName;
        }
      }
    } catch (e) {
      // eat the error and let the default render
      console.error('p2p-ota-upsell-error', e);
    }
  }

  static get properties() {
    return {
      vendor: {type: String},
    };
  }

  static get styles() {
    return css`
      :host {
        background: rgb(247, 247, 247);
        border-radius: 8px;
        padding: 12px;
        display: flex;
      }

      .ota-text {
        color: rgb(34, 34, 34);
        font-family: ASCircular-Book;
        font-size: 14px;
        font-weight: 300;
        height: 20px;
        line-height: 20px;
        padding: 4px 0px 4px 12px;
      }

      .ota-main-text {
        font-weight: bold;
      }

      .image {
        height: 50px;
      }
      .image img {
        height: 46px;
        width: 46px;
        border-radius: 50%;
        border: solid 2px white;
      }
    `;
  }

  render() {
    const text = !!this.vendor ? `${vendors[this.vendor].name} Folks` : 'Aboard';
    const img = !!this.vendor ? `${siteCoreVendorURL}${vendors[this.vendor].img}`: `${siteCoreVendorURL}${defaultImg}`;
    return html`
            <div class='image'>
              <img src='${img}' alt="${!!this.vendor ? vendors[this.vendor].name : 'Alaska Air'} Logo" />
            </div>
            <div class="ota-text">
              <div class="ota-main-text">Welcome, ${text}!</div>
              <slot name="ota-sub-text">Thanks for choosing Alaska Airlines.</slot>
            </div>
        `;
  }
}

if (!customElements.get('ota-welcome-message')) {
  customElements.define('ota-welcome-message', OTAWelcomeMessage);
}
