/*
import {fixture, expect, html} from '@open-wc/testing';
import '../components/merchandising/message-banner/index.js';
import expectSlotWorks from './utils/expectSlotWorks.js';
describe('message-banner', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
    <message-banner></message-banner>
  `);
    await expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
    <message-banner></message-banner>
  `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  it('should return auro header with message', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
    <message-banner></message-banner>
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
    <message-banner></message-banner>
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
    <message-banner></message-banner>
  `);
    const actual = el.querySelector('auro-hyperlink');
    expect(actual.getAttribute('href')).to.equal('https://thegoodtraveler.org/buy/');
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  it('should show custom slots', async () => {
    await expectSlotWorks('message-banner', 'image');
    await expectSlotWorks('message-banner', 'title');
    await expectSlotWorks('message-banner', 'message');
  });
});
*/
