import {fixture, expect, html} from '@open-wc/testing';
import '../components/flight-search/fs-time-range-row/index.js';

describe('fs-time-range-row', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <fs-time-range-row departureTimeMatch flight=1></fs-time-range-row>
    `);
    await expect(el).to.be.accessible();
  });

  it('should not be accessible', async () => {
    const el = await fixture(html`
      <fs-time-range-row flight="1"></fs-time-range-row>
    `);
    await expect(el).to.be.not.be.accessible;
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
      <fs-time-range-row departureTimeMatch flight=1></fs-time-range-row>
    `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  it('should show Preferred times', async () => {
    const el = await fixture(html`
      <fs-time-range-row departureTimeMatch flight=1></fs-time-range-row>
    `);
    const root = el.shadowRoot;
    const time = root.querySelectorAll('.timeRange')[0];
    await expect(time.textContent).to.contain('Preferred times');
  });

  it('should show Preferred times are unavailable', async () => {
    const el = await fixture(html`
       <fs-time-range-row flight="1"></fs-time-range-row>
     `);
    const root = el.shadowRoot;
    const time = root.querySelectorAll('.timeRange')[0];
    await expect(time.textContent).to.contain(
        'Preferred times are not available. All flight times are shown below.',
    );
  });

  it('should show Additional times', async () => {
    const el = await fixture(html`
      <fs-time-range-row previousTimeMatch flight="0"></fs-time-range-row>
    `);
    const root = el.shadowRoot;
    const time = root.querySelectorAll('.timeRange')[0];
    await expect(time.textContent).to.contain('Additional times');
  });
});
