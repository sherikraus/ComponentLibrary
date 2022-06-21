import {fixture, expect, html} from '@open-wc/testing';
import '../components/flight-search/modals/fs-modal-baggage-fees';

describe('fs-modal-baggage-fees', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<fs-modal-baggage-fees></fs-modal-baggage-fees>`);
  });
  it('should be accessible', async () => {
    await expect(element).to.be.accessible();
  });
  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    await expect(element).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });
});
