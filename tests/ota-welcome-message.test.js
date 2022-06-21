import {fixture, expect, html} from '@open-wc/testing';
import '../components/merchandising/ota-welcome-message/index.js';
import expectSlotWorks from './utils/expectSlotWorks.js';

describe('ota-welcome-message', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <ota-welcome-message></ota-welcome-message>
    `);

    await expect(el).to.be.accessible();
  });

  it('should show customs vendor message', async () => {
    const el = await fixture(html`
        <ota-welcome-message vendor="kayak"></ota-welcome-message>
    `);

    const root = el.shadowRoot;
    const title = root.querySelector('.ota-main-text');
    await expect(title.textContent).to.contain('Kayak');
  });

  it('should accept slots', async () => {
    await expectSlotWorks('ota-welcome-message', 'ota-sub-text');
  });

  it('should set vendor based on queryString in url', async () => {
    // Set query string in url without reloading browser
    const params = new URLSearchParams(location.search);
    params.set('META', 'GOO_CS_X');
    window.history.replaceState({}, '', `${location.pathname}?${params}`);

    const el = await fixture(html`
      <ota-welcome-message></ota-welcome-message>
    `);

    // Make sure that text changed from default to the query string vendor
    const root = el.shadowRoot;
    const mainText = root.querySelector('.ota-main-text');
    await expect(mainText).to.contain.text('Google');

    // clean up query strings
    window.history.replaceState({}, '', location.pathname);
  });

  it('should catch the error in query string parsing', async () => {
    // Set query string in url without reloading browser
    const params = new URLSearchParams(location.search);
    params.set('META', 'LOL_IM_A_HEADER_FAIL_ME_PLS');
    window.history.replaceState({}, '', `${location.pathname}?${params}`);

    const el = await fixture(html`
      <ota-welcome-message></ota-welcome-message>
    `);

    // Make sure that text changed from default to the query string vendor
    const root = el.shadowRoot;
    const mainText = root.querySelector('.ota-main-text');
    await expect(mainText).to.contain.text('Welcome, Aboard!');

    // clean up query strings
    window.history.replaceState({}, '', location.pathname);
  });
});
