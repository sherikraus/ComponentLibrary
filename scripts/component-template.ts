import {css, html, LitElement} from 'lit-element';
import {customElement, property} from 'lit-element/lib/decorators'
import stylesCss from './styles-css.js';

export class [componentName] extends LitElement {

  @property({type: Boolean})
  isCool: false;

  static override styles =css`${stylesCss}`;

  override render() {
    return html`
            <div>Hello World! I am ${this.isCool ? '':'not'} cool</div>
        `;
  }
}

if (!customElements.get('[componentElementName]')) {
  customElements.define('[componentElementName]', [componentName]);
}


declare global {
  interface HTMLElementTagNameMap {
    '[componentElementName]': [componentName];
  }
}