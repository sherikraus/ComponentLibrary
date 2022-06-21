import {fixture, expect, html} from '@open-wc/testing';
import '../components/merchandising/saver-to-main-dual-upsell/index.js';
import expectSlotWorks from './utils/expectSlotWorks.js';

describe('saver-to-main-dual-upsell', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <saver-to-main-dual-upsell price="22"></saver-to-main-dual-upsell>
    `);

    await expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
    <saver-to-main-dual-upsell price="22"></saver-to-main-dual-upsell>
  `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });
  it('should show custom slots', async () => {
    await expectSlotWorks('saver-to-main-dual-upsell', 'image');
    await expectSlotWorks('saver-to-main-dual-upsell', 'title-left');
    await expectSlotWorks('saver-to-main-dual-upsell', 'content-left');
    await expectSlotWorks('saver-to-main-dual-upsell', 'disclaimer-left');
    await expectSlotWorks('saver-to-main-dual-upsell', 'disclaimer-right');
    await expectSlotWorks('saver-to-main-dual-upsell', 'title-right-icon');
    await expectSlotWorks('saver-to-main-dual-upsell', 'title-right');
    await expectSlotWorks('saver-to-main-dual-upsell', 'content-right');
  });

  it('should render the price', async () => {
    const el = await fixture(html`
      <saver-to-main-dual-upsell price="22"></saver-to-main-dual-upsell>
    `);

    const root = el.shadowRoot;
    const price = root.querySelector('.upsell-price');
    expect(price.textContent).to.contain('22');
  });

  it('should show round trip in the message', async () => {
    const el = await fixture(html`
      <saver-to-main-dual-upsell price="22" roundTrip></saver-to-main-dual-upsell>
    `);

    const root = el.shadowRoot;
    const priceContent = root.querySelector('.upsell-price-content');
    expect(priceContent.textContent).to.contain('round-trip');
  });

  it('should set the button link', async () => {
    const el = await fixture(html`
      <saver-to-main-dual-upsell price="22" upgradeLink="/fake/url"></saver-to-main-dual-upsell>
    `);

    const root = el.shadowRoot;
    const hyperlinkButton = root.querySelector('auro-button');
    expect(hyperlinkButton.getAttribute('href')).to.equal('/fake/url');
  });

  it('should show custom left title', async () => {
    const el = await fixture(html`
      <saver-to-main-dual-upsell price="22">
      <div slot="title-left">Hello World</div>
      </saver-to-main-dual-upsell>
    `);

    const root = el.shadowRoot;
    const titleLeft = root.querySelector('.upsell-first .upsell-title slot');
    expect(titleLeft.assignedNodes()[0].textContent).to.contain('Hello World');
  });
});
