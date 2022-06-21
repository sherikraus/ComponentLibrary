import {fixture, expect, html, oneEvent} from '@open-wc/testing';
import '../components/generics/expand-results/index.js';

describe('expand-results', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`<expand-results shown="10" total="30"></expand-results>`);

    expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`<expand-results shown="6" total="13"></expand-results>`);
    expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  it('Should have accurate subtext', async () => {
    const el = await fixture(html`<expand-results shown="6" total="13"></expand-results>`);
    const root = el.shadowRoot;
    const subText = root.querySelector('.subtext');

    expect(subText.textContent).to.contain('Showing 6 of 13');
  });

  it('should show more results after click', async () => {
    const el = await fixture(html`<expand-results shown="6" total="13"></expand-results>`);
    const button = el.shadowRoot.querySelector('auro-button');
    const subText = el.shadowRoot.querySelector('.subtext');

    const listener = oneEvent(el, 'click');

    button.click();
    await listener;

    expect(subText.textContent).to.contain('Showing 13 of 13');
  });

  it('should show initial state after two clicks', async () => {
    const el = await fixture(html`<expand-results shown="6" total="13"></expand-results>`);
    const button = el.shadowRoot.querySelector('auro-button');
    const subText = el.shadowRoot.querySelector('.subtext');

    let listener = oneEvent(el, 'click');
    button.click();
    await listener;
    expect(el.showingAll).to.equal(true);

    listener = oneEvent(el, 'click');
    button.click();
    await listener;
    expect(el.showingAll).to.equal(false);

    expect(subText.textContent).to.contain('Showing 6 of 13');
  });
});
