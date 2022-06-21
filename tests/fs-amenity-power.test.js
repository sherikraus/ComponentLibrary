import {fixture, expect, html} from '@open-wc/testing';
import '../components/flight-search/fs-amenity-power/index.js';

describe('fs-amenity-power', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <fs-amenity-power></fs-amenity-power>
    `);

    await expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
      <fs-amenity-power></fs-amenity-power>
      `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });
});
