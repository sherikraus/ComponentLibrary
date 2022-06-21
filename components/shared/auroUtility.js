import {html} from 'lit-element';
import '@alaskaairux/auro-hyperlink';
import '@alaskaairux/auro-button';
import {isIE11} from './utility';

export function getAnchorElement(link, text) {
  if (isIE11()) {
    return html`
        <a href="${link}" target="_blank">${text}</a>
      `;
  } else {
    return html`
        <auro-hyperlink href="${link}" target="_blank">${text}</auro-hyperlink>
      `;
  }
}

export function getAnchorButtonElement(link, text, onClick) {
  if (isIE11()) {
    return html`
            <a href="${link}">
                <button @click="${onClick}">${text}</button>
            </a>
          `;
  } else {
    return html`
            <auro-button href="${link}" @click="${onClick}" responsive>${text}</auro-button>
          `;
  }
}
