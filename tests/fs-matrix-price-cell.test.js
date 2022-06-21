import {fixture, expect, html, oneEvent} from '@open-wc/testing';
import '../components/flight-search/fs-matrix-price-cell/index.js';

describe('fs-matrix-price-cell', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <fs-matrix-price-cell></fs-matrix-price-cell>
    `);
    await expect(el).to.be.accessible();
  });


  it('should render saver fare type information', async () => {
    const el = await fixture(html`
        <fs-matrix-price-cell fareType="saver" price="99" seatsRemaining="2">
        </fs-matrix-flight-result>
    `);
    const root = el.shadowRoot;
    const fareContainer = root.querySelector('#fare-container');
    const seatsRemaining = root.querySelector('#seats-remaining');
    const price = root.querySelector('#price');

    await expect(fareContainer.classList.contains('fare-saver')).to.equal(true);
    await expect(seatsRemaining.textContent).to.equal('\n                      2\n                    ');
    await expect(price.textContent).to.equal(
        '\n                  $99\n                  \n                  \n                ');
  });
  it('should render selected fare type information', async () => {
    const el = await fixture(html`
        <fs-matrix-price-cell fareType="saver" price="99" seatsRemaining="20" selected>
        </fs-matrix-price-cell>
    `);
    const root = el.shadowRoot;
    const fareContainer = root.querySelector('#fare-container');
    const price = root.querySelector('#price');

    await expect(fareContainer.classList.contains('selected')).to.equal(true);
    await expect(price.textContent).to.equal(
        '\n                  $99\n                  \n                  \n                ');
  });
  it('should show more results after click', async () => {
    const el = await fixture(html` 
    <fs-matrix-price-cell fareType="saver" price="99" seatsRemaining="20">
      <auro-dialog></auro-dialog>
    </fs-matrix-price-cell>`);

    const button = el.shadowRoot.querySelector('input');
    const subText = el.shadowRoot.querySelector('#fare-container');

    const listener = oneEvent(el, 'click');

    button.click();
    await listener;
    expect(subText.classList.contains('selected')).to.equal(true);
  });
  it('should render N/A seat type information', async () => {
    const el = await fixture(html`
        <fs-matrix-price-cell fareType="saver" price="0" seatsRemaining="0" selected>
        </fs-matrix-price-cell>
    `);
    const root = el.shadowRoot;
    const noSeats = root.querySelector('#no-seats');

    await expect(noSeats.textContent).to.contain('N/A');
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
        <fs-matrix-price-cell fareType="saver" price="0" seatsRemaining="0" selected>
        </fs-matrix-price-cell>
      `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });
});
