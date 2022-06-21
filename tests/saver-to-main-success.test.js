import {fixture, expect, html} from '@open-wc/testing';
import '../components/merchandising/saver-to-main-success';

describe('saver-to-main-success-test', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <saver-to-main-success></saver-to-main-success>
    `);

    await expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
    <saver-to-main-success></saver-to-main-success>
  `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  it('should be able to shift the image to the right', async () => {
    const el = await fixture(html`
      <saver-to-main-success imageRight></saver-to-main-success>
    `);

    const imageRight = el.shadowRoot.querySelector('slot[name="image-right"]  .upsell-image-section');
    const imageLeft = el.shadowRoot.querySelector('slot[name="image-left"]  .upsell-image-section');

    await expect(imageRight.style.display).to.equal('');
    await expect(imageLeft.style.display).to.equal('none');
  });
});
