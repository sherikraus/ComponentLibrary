import {fixture, expect, html} from '@open-wc/testing';
import '../components/flight-search/fs-drawer/index.js';
import expectSlotWorks from './utils/expectSlotWorks.js';

describe('fs-drawer', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
    <fs-drawer></fs-drawer>
  `);
    await expect(el).to.be.accessible();
  });

  it('should show custom slots', async () => {
    await expectSlotWorks('fs-drawer', 'upsell-content');
  });

  it('should be openable', async () => {
    const openEl = await fixture(html`
    <fs-drawer open price="70" roundtrip>
    </fs-drawer>`);
    await expect(openEl).to.be.accessible();
    const root = openEl.shadowRoot;
    root.querySelector('.upsell-close').click();
    await expect(root.querySelector('.upsell .upsell-open')).to.be.not.equal(undefined);
  });
});

