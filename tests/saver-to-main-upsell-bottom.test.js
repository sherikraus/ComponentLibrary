import {fixture, expect, html} from '@open-wc/testing';
import '../components/merchandising/saver-to-main-upsell-bottom/index.js';
import expectSlotWorks from './utils/expectSlotWorks.js';

describe('saver-to-main-upsell-bottom', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
    <saver-to-main-upsell-bottom></saver-to-main-upsell-bottom>
  `);
    await expect(el).to.be.accessible();
  });

  it('should show custom slots', async () => {
    await expectSlotWorks('saver-to-main-upsell-bottom', 'upsell-title');
    await expectSlotWorks('saver-to-main-upsell-bottom', 'upsell-message-secondary');
    await expectSlotWorks('saver-to-main-upsell-bottom', 'upsell-message-content');
    await expectSlotWorks('saver-to-main-upsell-bottom', 'upsell-price-content');
    await expectSlotWorks('saver-to-main-upsell-bottom', 'upgrade-action');
    await expectSlotWorks('saver-to-main-upsell-bottom', 'decline-action');
  });

  it('should show price', async () => {
    const el = await fixture(html`
    <saver-to-main-upsell-bottom open price="70" roundtrip>
    </saver-to-main-upsell-bottom>`);
    const root = el.shadowRoot;
    const price = root.querySelector('.upsell-price');
    expect(price.textContent).to.contain('70');
  });

  it('should set upgrade link', async () => {
    const el = await fixture(html`
      <saver-to-main-upsell-bottom open price="70" roundtrip
      upgradeLink="/test/link">
      </saver-to-main-upsell-bottom>
    `);
    const root = el.shadowRoot;
    const upgradeLink = root.querySelector(`[data-cy='testUpgradeLink']`);
    expect(upgradeLink.getAttribute('href')).to.equal('/test/link');
  });

  it('should be openable', async () => {
    const openEl = await fixture(html`
    <saver-to-main-upsell-bottom open price="70" roundtrip>
    </saver-to-main-upsell-bottom>`);
    await expect(openEl).to.be.accessible();
    const root = openEl.shadowRoot;
    root.querySelector('.upsell-close').click();
    await expect(root.querySelector('.upsell .upsell-open')).to.be.not.equal(undefined);
  });
});

