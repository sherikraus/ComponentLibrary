import {fixture, expect, html} from '@open-wc/testing';
import '../components/flight-changes/bundled-price-cell/index.js';

describe('bundled-price-cell', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <bundled-price-cell priceDifference="199.99" milesDifference="2500"></bundled-price-cell>>
    `);
    expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
      <bundled-price-cell priceDifference="199.99" milesDifference="2500"></bundled-price-cell>
    `);
    expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  it('Should show _per person_ for non Companion Fares', async () => {
    const el = await fixture(html`<bundled-price-cell priceDifference="600"></bundled-price-cell>`);
    const root = el.shadowRoot;
    const subText = root.querySelector('.secondaryText');

    expect(subText.textContent).to.contain('per person');
  });

  it('Should show _total_ for Companion Fares', async () => {
    const el = await fixture(html`<bundled-price-cell priceDifference="67.50" companionFare></bundled-price-cell>`);
    const root = el.shadowRoot;
    const subText = root.querySelector('.secondaryText');
    expect(subText.textContent).to.contain('total');
  });

  it('Should show credit when negative price', async () => {
    const el = await fixture(html`<bundled-price-cell priceDifference="-12.50"></bundled-price-cell>`);
    const root = el.shadowRoot;
    const priceLabel = root.querySelector('.primaryText');

    expect(priceLabel.textContent).to.contain('credit');
  });
});
