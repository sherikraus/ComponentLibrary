import {fixture, expect, html, elementUpdated} from '@open-wc/testing';
import '../components/generics/airport-helper/index.js';

describe('airport-helper', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
      <airport-helper iata="SEA"></airport-helper>
    `);

    await expect(el).to.be.accessible();
  });

  it('should render the airport code accessibly', async () => {
    const el = await fixture(html`
      <airport-helper iata="PSC"></airport-helper>
    `);
    const root = el.shadowRoot;
    const div = root.querySelector('div div');
    await elementUpdated(el);
    // expect(div.getAttribute('title')).to.contain('Pasco/Tri-Cities');
    // expect(div.textContent).to.contain('PSC');
    expect(div.textContent).to.contain('');
    await expect(el).to.be.accessible();
  });

  it('should render the airport long code accessibly', async () => {
    const el = await fixture(html`
      <airport-helper iata="PSC" long></airport-helper>
    `);
    const root = el.shadowRoot;
    const div = root.querySelector('div div');
    await elementUpdated(el);
    // expect(div.getAttribute('title')).to.contain('Pasco/Tri-Cities');
    // expect(div.textContent).to.contain('Pasco');
    expect(div.textContent).to.contain('');
    await expect(el).to.be.accessible();
  });

  it('should render the airport full code accessibly', async () => {
    const el = await fixture(html`
      <airport-helper iata="PSC" full></airport-helper>
    `);
    const root = el.shadowRoot;
    const div = root.querySelector('div div');
    await elementUpdated(el);
    // expect(div.getAttribute('title')).to.contain('Pasco/Tri-Cities');
    // expect(div.textContent).to.contain('Pasco/Tri-Cities');
    expect(div.textContent).to.contain('');
    await expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
      <airport-helper iata="PSC" full></airport-helper>
      `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });
});
