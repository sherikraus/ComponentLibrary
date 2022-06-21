import {fixture, expect, html} from '@open-wc/testing';
import '../components/flight-search/fs-amenity-ife/index.js';

describe('fs-amenity-ife', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <fs-amenity-ife></fs-amenity-ife>
    `);

    await expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
      <fs-amenity-ife></fs-amenity-ife>
      `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });
});
