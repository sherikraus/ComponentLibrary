import {html, LitElement} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {isIE11} from '../../shared/utility';
import 'whatwg-fetch';

class CmsPartial extends LitElement {
  static get properties() {
    return {
      partial: {type: String},
      path: {type: String},
      personalized: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.partial = '';
  }

  firstUpdated() {
    const initOptions = {
      credentials: this.personalized ? 'include' : 'omit',
    };
    let ipOverride;
    if (window.location.search &&
        window.location.search.match(/ipAddress=([^&]*)/)
    ) {
      ipOverride = window.location.search.match(/ipAddress=([^&]*)/)[1];
    }
    window.fetch(`//www.alaskaair.com/content/partial/${this.path}${(ipOverride ? `?ipAddress=${ipOverride}` : ``)}`,
        initOptions,
    )
        .then((res) => {
          if (!res.ok) return '';
          else return res.text();
        })
        .then((text) => {
          this.partial = text || '';
        })
        .catch((e) => {
        // console.error('Failed to load partial', e);
          this.partial = '';
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
    return html`${unsafeHTML(this.partial)}`;
  }
}

if (!customElements.get('cms-partial')) {
  customElements.define('cms-partial', CmsPartial);
}
