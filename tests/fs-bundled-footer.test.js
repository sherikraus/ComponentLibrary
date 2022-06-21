import {fixture, expect, html} from '@open-wc/testing';
import '../components/flight-changes/footer-advisory';

describe('footer-advisory', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
    <footer-advisory
        footerAdvisories='["Inflight Wi-Fi availability is subject to..", "Amounts are quoted per person in.."]'>
    </footer-advisory>
    `);
    await expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
  <footer-advisory
    footerAdvisories='["Inflight Wi-Fi availability is subject to..", "Amounts are quoted per person in.."]'>
  </footer-advisory>
      `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });


  it('should show custom message', async () => {
    const el = await fixture(html`
        <footer-advisory 
          footerAdvisories='["Inflight Wi-Fi availability is subject to..", "Amounts are quoted per person in.."]'>
        </footer-advisory>
    `);

    const root = el.shadowRoot;
    await expect(root.textContent).to.contain('Inflight');
  });
});
