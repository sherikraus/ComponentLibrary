import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import styles from './styles-css';

class HelloWorld extends LitElement {
  static get properties() {
    return {
      isCool: {type: Boolean},
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

  render() {
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(HelloWorld.styles)}</style>` : ''}
            <marquee class="heading">fly to Adak, premium home of santa</marquee>
            <img class="image" src="/assets/adk.jpg" />
        `;
  }
}

if (!customElements.get('hello-world')) {
  customElements.define('hello-world', HelloWorld);
}
