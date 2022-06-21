import {fixture, expect, html} from '@open-wc/testing';
import '../components/merchandising/refundable-matrix-upsell/index.js';
import expectSlotWorks from './utils/expectSlotWorks.js';

describe('refundable-matrix-upsell', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <refundable-matrix-upsell price="22"></refundable-matrix-upsell>
    `);

    await expect(el).to.be.accessible();
  });

  it('should show custom slots', async () => {
    await expectSlotWorks('refundable-matrix-upsell', 'title');
    await expectSlotWorks('refundable-matrix-upsell', 'sub-title');
    await expectSlotWorks('refundable-matrix-upsell', 'item');
  });

  it('should render the price', async () => {
    const el = await fixture(html`
      <refundable-matrix-upsell mainDifference="22"></refundable-matrix-upsell>
    `);

    const root = el.shadowRoot;
    const price = root.querySelector('.price');
    expect(price.textContent).to.contain('22');
  });
});
