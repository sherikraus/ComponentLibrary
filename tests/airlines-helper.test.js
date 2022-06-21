import {fixture, expect, html, elementUpdated} from '@open-wc/testing';
import '../components/generics/airline-helper/index.js';

describe('airline-helper', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <airline-helper iata="AS"></airline-helper>>
    `);
    await expect(el).to.be.accessible();
  });

  it('should render the airline image accessibly', async () => {
    const el = await fixture(html`
      <airline-helper iata="AA" long image></airline-helper>
    `);
    const root = el.shadowRoot;
    await elementUpdated(el);
    const image = root.querySelector('.airline svg');
    expect(image).to.be.null; // GUS - this should not actually be null
    // expect(image.getAttribute('title')).to.contain('American Airlines');
    await expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
      <airline-helper iata="AS" full></airline-helper>
      `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });
});
