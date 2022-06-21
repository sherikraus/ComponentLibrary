import {fixture, expect, html} from '@open-wc/testing';
import '../components/merchandising/jetset-message-banner/index.js';
import expectSlotWorks from './utils/expectSlotWorks.js';

describe('jetset-message-banner', () => {
  // it('should be accessible', async () => {
  //   const el = await fixture(html`
  //   <jetset-message-banner></jetset-message-banner>
  // `);
  //   await expect(el).to.be.accessible();
  // });

  // it('should be accessible on IE', async () => {
  //   window.MSInputMethodContext = true;
  //   document.documentMode = true;
  //   const el = await fixture(html`
  //   <jetset-message-banner></jetset-message-banner>
  // `);
  //   await expect(el).to.be.accessible();
  //   window.MSInputMethodContext = null;
  //   document.documentMode = null;
  // });

  it('should return auro header with message', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
    <jetset-message-banner></jetset-message-banner>
  `);
    const actual = el.querySelector('auro-header');
    expect(actual.textContent).to.contain('On your mark, offset, go!');
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  it('should return auro hyperlink with exact button label', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
    <jetset-message-banner></jetset-message-banner>
  `);
    const actual = el.querySelector('auro-hyperlink');
    expect(actual.textContent).to.contain('Offset your flight');
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  it('should return auro hyperlink ref with right link', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
    <jetset-message-banner></jetset-message-banner>
  `);
    const actual = el.querySelector('auro-hyperlink');
    expect(actual.getAttribute('href')).to.equal('https://thegoodtraveler.org/?utm_source=alaska-checkout&utm_medium=order&utm_campaign=alaska');
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  it('should show custom slots', async () => {
    await expectSlotWorks('jetset-message-banner', 'image');
    await expectSlotWorks('jetset-message-banner', 'title');
    await expectSlotWorks('jetset-message-banner', 'message');
  });
});
