import {fixture, expect, html, elementUpdated} from '@open-wc/testing';
import sinon from 'sinon';
import '../components/retain/cms-partial';

describe('cms-partial', () => {
  let fetchStub;
  before(() => {
    fetchStub = sinon.stub(window, 'fetch');
  });
  after(() => {
    fetchStub.restore();
  });
  beforeEach(() => {
    fetchStub.resolves({ok: true, text: async () => ''});
  });
  it('should be accessible', async () => {
    const el = await fixture(html`<cms-partial path="my/cc-ad"></cms-partial>`);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it('should be accessible in IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`<cms-partial path="my/cc-ad"></cms-partial>`);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });
  it('should load a html/js/css partial', async () => {
    fetchStub.resolves({ok: true, text: async () => '<div class="inspire">fly in the clouds</div>'});
    const el = await fixture(html`<cms-partial path="my/inspiration"></cms-partial>`);
    await elementUpdated(el);
    const root = el.shadowRoot;
    const ad = root.querySelector('.inspire');
    expect(fetchStub).to.be.calledWith('//www.alaskaair.com/content/partial/my/inspiration', {credentials: 'omit'});
    expect(ad.innerHTML).to.contain('fly in the clouds');
  });
  it('should load a personalized partial', async () => {
    fetchStub.resolves({ok: true, text: async () => '<div class="ad">buy!</div>'});
    const el = await fixture(html`<cms-partial personalized path="my/cc-ad"></cms-partial>`);
    await elementUpdated(el);
    const root = el.shadowRoot;
    const ad = root.querySelector('.ad');
    expect(fetchStub).to.be.calledWith('//www.alaskaair.com/content/partial/my/cc-ad', {credentials: 'include'});
    expect(ad.innerHTML).to.contain('buy!');
  });
  it('should handle when fetch fails', async () => {
    fetchStub.rejects();
    const el = await fixture(html`<cms-partial path="💥"></cms-partial>`);
    await elementUpdated(el);
    const root = el.shadowRoot;
    expect(root.textContent).to.be.empty;
  });
  it('should handle a fetch error', async () => {
    fetchStub.resolves({ok: false});
    const el = await fixture(html`<cms-partial path="my/404"></cms-partial>`);
    await elementUpdated(el);
    const root = el.shadowRoot;
    expect(root.textContent).to.be.empty;
  });
});
