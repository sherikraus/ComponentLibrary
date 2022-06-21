import {fixture, expect, html} from '@open-wc/testing';
import '../components/flight-results/fs-matrix-faretype-cell/index.js';

describe('fs-matrix-faretype-cell', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <fs-matrix-faretype-cell></fs-matrix-faretype-cell>
    `);
    await expect(el).to.be.accessible();
  });

  // it('should render first class fare type information', async () => {
  //   const el = await fixture(html`
  //       <fs-matrix-faretype-cell fareType="first">
  //       </fs-matrix-flight-result>
  //   `);
  //   const root = el.shadowRoot;
  //   const fareContainer = root.querySelector('#fare-container');
  //   await expect(fareContainer.classList.contains('fare-first')).to.equal(true);
  // });
  // it('should render saver fare label information', async () => {
  //   const el = await fixture(html`
  //       <fs-matrix-faretype-cell label="only 3 left at" fareType="saver">
  //       </fs-matrix-flight-result>
  //   `);
  //   const root = el.shadowRoot;
  //   const fareLabel = root.querySelector('#fare-label');

  //   await expect(fareLabel.textContent).to.equal('\n          Most restricted\n        ');
  // });
  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
        <fs-matrix-faretype-cell label="only 3 left at" fareType="main">
        </fs-matrix-flight-result>
      `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });
});
