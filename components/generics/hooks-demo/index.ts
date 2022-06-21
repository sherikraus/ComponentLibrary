import {css, html, LitElement} from 'lit-element';
import {customElement, property} from 'lit-element/lib/decorators'
import stylesCss from './styles-css.js';
import lounges from '../../../hooks/lounges-data.js';

export class hooksDemo extends LitElement {

  @property({type: Boolean})
  isCool: false;

  static override styles =css`${stylesCss}`;

  override render() {
    return html`
            <ul>
              ${lounges.map((location: { loungeCode: string; }) => html`<li>${location.loungeCode}</li>`)}
            </ul>
        `;
  }
}

if (!customElements.get('hooks-demo')) {
  customElements.define('hooks-demo', hooksDemo);
}


declare global {
  interface HTMLElementTagNameMap {
    'hooks-demo': hooksDemo;
  }
}