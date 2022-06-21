import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {isIE11} from '../../shared/utility';

class RetainHeader extends LitElement {
  static get properties() {
    return {
      isCool: {type: Boolean},
      header: {type: Object},
      footer: {type: Object},
      js: {type: Object},
      styles: {type: String},
      ready: {type: Boolean},
    };
  }

  static get styles() {
    return css`
      :host {
          color: green;
      }
    `;
  }

  firstUpdated() {
    fetch('https://apis.test.alaskaair.com/1/guestServices/admin/headerFooter/headerfooterhtml', {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': '105c5cca9dcb42cf8ed67a771ca0e07f',
        'Content-Type': 'application/json',
      },
    }).then((data) => data.json()).then((data) => {
      this.header = data['header'];
      this.footer = data['footer'];
      this.ready = true;
    });
    fetch('https://apis.test.alaskaair.com/1/guestServices/admin/headerFooter/header.css', {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': '105c5cca9dcb42cf8ed67a771ca0e07f',
        'Content-Type': 'application/json',
      },
    }).then((data) => data.text()).then((data) => {
      this.styles = data;
      this.ready = true;
    });
    fetch('https://apis.test.alaskaair.com/1/guestServices/admin/headerFooter/footer.js', {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': '105c5cca9dcb42cf8ed67a771ca0e07f',
        'Content-Type': 'application/json',
      },
    }).then((data) => data.text()).then((data) => {
      this.js = document.createElement('script');
      console.log(data.replace(/this.documen/g, 'this.shadowRoot'));
      this.js.type = 'text/javascript';
      try {
        this.js.appendChild(document.createTextNode(data.replace(/this.documen/g, 'this.shadowRoot')));
      } catch (err) {
        this.js.text = data.replace(/this.documen/g, 'this.shadowRoot');
      }
      this.shadowRoot.querySelector('#pageContainer').appendChild(this.js);
      this.ready = true;
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
    <div id="pageContainer">
            ${html`<style>${unsafeCSS(this.styles)}</style>`}
            ${this.ready ? html`${unsafeHTML(this.header)}` : ''}
            ${this.ready ? html`${unsafeHTML(this.footer)}` : ''}
    </div>
        `;
  }
}

if (!customElements.get('retain-header')) {
  customElements.define('retain-header', RetainHeader);
}
