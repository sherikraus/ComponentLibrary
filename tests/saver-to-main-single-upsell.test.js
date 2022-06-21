import {fixture, expect, html} from '@open-wc/testing';
import '../components/merchandising/saver-to-main-single-upsell/index.js';

describe('saver-to-main-single-upsell', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <saver-to-main-single-upsell price="22"></saver-to-main-single-upsell>
    `);

    await expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
    <saver-to-main-single-upsell price="22"></saver-to-main-single-upsell>
  `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  it('should render the price', async () => {
    const el = await fixture(html`
      <saver-to-main-single-upsell price="22"></saver-to-main-single-upsell>
    `);

    const root = el.shadowRoot;
    const price = root.querySelector('.upsell-price');
    expect(price.textContent).to.contain('22');
  });

  it('should show round trip in the message', async () => {
    const el = await fixture(html`
      <saver-to-main-single-upsell price="22" roundTrip></saver-to-main-single-upsell>
    `);

    const root = el.shadowRoot;
    const priceContent = root.querySelector('.upsell-price-content');
    expect(priceContent.textContent).to.contain('round-trip');
  });

  it('should set the button link', async () => {
    const el = await fixture(html`
      <saver-to-main-single-upsell price="22" upgradeLink="/fake/url"></saver-to-main-single-upsell>
    `);

    const root = el.shadowRoot;
    const hyperlinkButton = root.querySelector('auro-button');
    expect(hyperlinkButton.getAttribute('href')).to.equal('/fake/url');
  });

  it('should be collapsable', async () => {
    const openEl = await fixture(html`
    <saver-to-main-single-upsell accordion>
    </saver-to-main-single-upsell>`);
    const root = openEl.shadowRoot;
    root.querySelector('.upsell-accordion').click();
    await expect(root.querySelector('.upsell-accordion.closed')).to.be.not.equal(undefined);
  });
});
