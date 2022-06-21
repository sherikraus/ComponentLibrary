import {css, html, LitElement} from 'lit-element';
import stylesCss from './styles-css.js';

class [componentName] extends LitElement {
  static get properties() {
    return {
      isCool: {type: Boolean},
    };
  }

  static get styles() {
    return css`${stylesCss}`;
  }

  render() {
    return html`
            <div>Hello World! I am ${this.isCool ? '':'not'} cool</div>
        `;
  }
}

if (!customElements.get('[componentElementName]')) {
  customElements.define('[componentElementName]', [componentName]);
}
