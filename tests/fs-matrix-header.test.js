import {fixture, expect, html} from '@open-wc/testing';
import '../components/flight-search/fs-matrix-header/index.js';

describe('fs-matrix-header', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <fs-matrix-header
        matrixLabel="Returning flight"
        displayTrips='["Seattle (SEA) to Walla Walla (ALW)"]'
      ></fs-matrix-header>
    `);
    await expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
        <fs-matrix-header
          matrixLabel="Returning flight"
          displayTrips='["Seattle (SEA) to Walla Walla (ALW)"]'
        ></fs-matrix-header>
      `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  it('should show custom choose header message', async () => {
    const el = await fixture(html`
      <fs-matrix-header
        matrixLabel="Test flight"
        displayTrips='["Seattle (SEA) to Walla Walla (ALW)"]'
      ></fs-matrix-header>
    `);
    const root = el.shadowRoot;
    const title = root.getElementById('choose-header');
    await expect(title.textContent).to.contain('Choose test flight:');
  });

  it('should show custom itinerary message', async () => {
    const el = await fixture(html`
            <fs-matrix-header
              matrixLabel="Test flight"
              displayTrips='["Test (TES) to Test (TES)"]'
            ></fs-matrix-header>
          `);
    const root = el.shadowRoot;
    const title = root.getElementById('itinerary-header');
    await expect(title.textContent).to.contain('Test (TES) to Test (TES)');
  });
});
