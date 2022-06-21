import {fixture, expect, html} from '@open-wc/testing';
import '../components/merchandising/quarantine-message-banner/index.js';

describe('quarantine-message-banner', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
    <quarantine-message-banner></quarantine-message-banner>
  `);
    await expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
    <quarantine-message-banner></quarantine-message-banner>
  `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  it('should have a custom message', async () => {
    const message = 'This is a test';
    const el = await fixture(html`
    <quarantine-message-banner>
      <span slot='message'>${message}</span>
    </quarantine-message-banner>
  `);
    await expect(el.textContent).contains(message);
  });
});
