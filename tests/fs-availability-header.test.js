import {fixture, expect, html} from '@open-wc/testing';
import '../components/flight-search/fs-availability-header/index.js';

describe('fs-availability-header', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <fs-availability-header headerText="Test"></fs-availability-header>
    `);

    await expect(el).to.be.accessible();
  });

  it('should show custom message', async () => {
    const el = await fixture(html`
        <fs-availability-header headerText="Available Flights"></fs-availability-header>
    `);

    const root = el.shadowRoot;
    const title = root.querySelector('h1');
    await expect(title.textContent).to.contain('Available Flights');
  });
  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
        <fs-availability-header headerText="Available Flights"></fs-availability-header>
      `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });
});
