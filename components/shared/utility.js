import {html} from 'lit-element';

export function isIE11() {
  return !!window.MSInputMethodContext && !!document.documentMode;
}

export function wrapWithSlot(slotName, element) {
  if (isIE11()) {
    return element;
  } else {
    return html`<slot name="${slotName}">${element}</slot>`;
  }
}

export async function parseXML(xml) {
  const parser = new DOMParser();
  return parser.parseFromString(xml, 'text/xml');
}

export function isFocusVisibleSupported() {
  try {
    document.querySelector(':focus-visible');
  } catch {
    return false;
  }
  return true;
}

// https://github.com/WICG/focus-visible#shadow-dom
export function isFocusVisiblePolyfillAvailable() {
  return window.applyFocusVisiblePolyfill != null;
}
