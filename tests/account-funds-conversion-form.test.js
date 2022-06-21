import {fixture, expect, html, elementUpdated, oneEvent} from '@open-wc/testing';
import sinon from 'sinon';
import '../components/retain/account-funds-conversion-form';

describe('account-funds-conversion-form', () => {
  const jwtUrl = 'https://www.alaskaair.test/getjwt';
  let sandbox;
  let fetchStub;
  before(() => {
    sandbox = sinon.createSandbox();
    fetchStub = sandbox.stub(window, 'fetch');
  });
  beforeEach(() => {
    document.cookie = 'AS%5FNAME=MP=12345678';
    fetchStub.withArgs(jwtUrl).resolves({
      ok: true,
      json: async () => ({
        loggedIn: true,
        token: 'abc123',
      }),
    });
  });
  afterEach(() => {
    sandbox.resetHistory();
  });
  after(() => {
    sandbox.restore();
  });

  it('should use defaults when no properties are set', async () => {
    const el = await fixture(html`<account-funds-conversion-form />`);
    const root = el.renderRoot;

    const conversionSelect = root.querySelector(`[data-cy='conversion-selectOptions']`);
    expect(conversionSelect.textContent).to.contain('Choose an offer:');

    const agreementText = root.querySelector(`[data-cy='agreement-text']`);
    expect(agreementText.textContent).to.contain('By converting wallet funds to miles, ');

    const button = root.querySelector(`[data-cy='cta-button']`);
    expect(button.textContent).to.contain('Convert');
  });

  it('should be accessible', async () => {
    const el = await fixture(html`
      <account-funds-conversion-form
        selectorLabel="Convert"
        agreementText="By converting wallet funds to miles, I agree to the terms and conditions of this offer."
      </account-funds-conversion-form>
    `);
    await expect(el).to.be.accessible();
  });

  it('should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
      <account-funds-conversion-form
        selectorLabel="Convert"
        agreementText="By converting wallet funds to miles, I agree to the terms and conditions of this offer."
      </account-funds-conversion-form>
    `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  describe('should handle conversion options', () => {
    it('when guest is anonymous', async () => {
      document.cookie = 'AS%5FNAME=';
      fetchStub.withArgs(jwtUrl).resolves({
        ok: true,
        json: async () => ({
          loggedIn: false,
        }),
      });

      const el = await fixture(html`
        <account-funds-conversion-form
          getJwtEndpoint="${jwtUrl}"
        </account-funds-conversion-form>
      `);
      const root = el.shadowRoot;
      await elementUpdated();

      const errorMessage = root.querySelector(`[data-cy='error-message']`);
      expect(errorMessage.textContent).to.contain('Something went wrong');

      const dropdown = root.querySelector(`#conversionSelect`);
      expect(dropdown.disabled).to.equal(true);

      const button = root.querySelector(`[data-cy='cta-button']`);
      expect(button.disabled).to.equal(true);
    });
    it('when authentication request fails (fetch)', async () => {
      fetchStub.withArgs(jwtUrl).rejects();

      const el = await fixture(html`
        <account-funds-conversion-form
          getJwtEndpoint="${jwtUrl}"
        </account-funds-conversion-form>
      `);
      const root = el.shadowRoot;
      await elementUpdated();

      const errorMessage = root.querySelector(`[data-cy='error-message']`);
      expect(errorMessage.textContent).to.contain('Something went wrong');

      const dropdown = root.querySelector(`#conversionSelect`);
      expect(dropdown.disabled).to.equal(true);

      const button = root.querySelector(`[data-cy='cta-button']`);
      expect(button.disabled).to.equal(true);
    });
    it('when guest session has expired', async () => {
      fetchStub.withArgs(jwtUrl).resolves({
        ok: false,
      });

      const el = await fixture(html`
        <account-funds-conversion-form
          getJwtEndpoint="${jwtUrl}"
        </account-funds-conversion-form>
      `);
      const root = el.shadowRoot;
      await elementUpdated();

      const errorMessage = root.querySelector(`[data-cy='error-message']`);
      expect(errorMessage.textContent).to.contain('Something went wrong');

      const dropdown = root.querySelector(`#conversionSelect`);
      expect(dropdown.disabled).to.equal(true);

      const button = root.querySelector(`[data-cy='cta-button']`);
      expect(button.disabled).to.equal(true);
    });
    it('when a guest has no options', async () => {
      const url = 'https://www.alaskaair.test/getconversionamounts';
      fetchStub.withArgs(sinon.match(url), sinon.match.any).resolves({
        ok: true,
        json: async () => ({
          conversionAmounts: [],
          currentBalance: 0,
          toUnitDisplayName: 'miles',
        }),
      });
      const el = await fixture(html`
        <account-funds-conversion-form
          getJwtEndpoint="${jwtUrl}"
          getWalletConversionApiKey="apim-key"
          getWalletConversionEndpoint="${url}"
        </account-funds-conversion-form>
      `);
      const root = el.shadowRoot;
      await elementUpdated();
      const errorMessage = root.querySelector(`[data-cy='error-message']`);
      expect(errorMessage.textContent).to.contain('Insufficient Funds');
    });
    it('when a guest has less than 4 options', async () => {
      const url = 'https://www.alaskaair.test/getconversionamounts';
      fetchStub.withArgs(sinon.match(url), sinon.match.any).resolves({
        ok: true,
        json: async () => ({
          conversionAmounts: [
            {from: 0.02, to: 20},
            {from: 0.01, to: 10},
          ],
          currentBalance: 0.02,
          toUnitDisplayName: 'miles',
        }),
      });
      const el = await fixture(html`
        <account-funds-conversion-form
          getJwtEndpoint="${jwtUrl}"
          getWalletConversionApiKey="apim-key"
          getWalletConversionEndpoint="${url}"
        </account-funds-conversion-form>
      `);
      const root = el.shadowRoot;
      await elementUpdated();
      const conversionOptions = root.querySelectorAll(`#conversionSelect > option`);
      expect(conversionOptions.length).to.equal(2);
      expect(conversionOptions[0].value).to.equal('0.02');
      expect(conversionOptions[0].textContent).to.contain('$0.02 = 20 miles');
      expect(conversionOptions[1].value).to.equal('0.01');
      expect(conversionOptions[1].textContent).to.contain('$0.01 = 10 miles');
    });
    it('when a guest has default 4 options', async () => {
      const url = 'https://www.alaskaair.test/getconversionamounts';
      fetchStub.withArgs(sinon.match(url), sinon.match.any).resolves({
        ok: true,
        json: async () => ({
          conversionAmounts: [
            {from: 10.00, to: 100},
            {from: 5.00, to: 50},
            {from: 2.50, to: 25},
            {from: 1.25, to: 13},
          ],
          currentBalance: 10.00,
          toUnitDisplayName: 'miles',
        }),
      });
      const el = await fixture(html`
        <account-funds-conversion-form
          getJwtEndpoint="${jwtUrl}"
          getWalletConversionApiKey="apim-key"
          getWalletConversionEndpoint="${url}"
        </account-funds-conversion-form>
      `);
      const root = el.shadowRoot;
      await elementUpdated();
      const conversionOptions = root.querySelectorAll(`#conversionSelect > option`);
      expect(conversionOptions.length).to.equal(4);
      expect(conversionOptions[0].value).to.equal('10');
      expect(conversionOptions[0].textContent).to.contain('$10.00 = 100 miles');
      expect(conversionOptions[1].value).to.equal('5');
      expect(conversionOptions[1].textContent).to.contain('$5.00 = 50 miles');
      expect(conversionOptions[2].value).to.equal('2.5');
      expect(conversionOptions[2].textContent).to.contain('$2.50 = 25 miles');
      expect(conversionOptions[3].value).to.equal('1.25');
      expect(conversionOptions[3].textContent).to.contain('$1.25 = 13 miles');
    });
    it('when an error occurs fetching options', async () => {
      const url = 'https://www.alaskaair.test/getconversionamounts';
      fetchStub.withArgs(sinon.match(url), sinon.match.any).rejects();
      const el = await fixture(html`
        <account-funds-conversion-form
          getJwtEndpoint="${jwtUrl}"
          getWalletConversionApiKey="apim-key"
          getWalletConversionEndpoint="${url}"
        </account-funds-conversion-form>
      `);
      const root = el.shadowRoot;
      await elementUpdated();
      const errorMessage = root.querySelector(`[data-cy='error-message']`);
      expect(errorMessage.textContent).to.contain('Something went wrong');
      const dropdown = root.querySelector(`#conversionSelect`);
      expect(dropdown.disabled).to.equal(true);

      const button = root.querySelector(`[data-cy='cta-button']`);
      expect(button.disabled).to.equal(true);
    });
    it('when an error occurs on the server', async () => {
      const url = 'https://www.alaskaair.test/getconversionamounts';
      fetchStub.withArgs(sinon.match(url), sinon.match.any).resolves({
        ok: false,
      });
      const el = await fixture(html`
        <account-funds-conversion-form
          getJwtEndpoint="${jwtUrl}"
          getWalletConversionApiKey="apim-key"
          getWalletConversionEndpoint="${url}"
        </account-funds-conversion-form>
      `);
      const root = el.shadowRoot;
      // todo(test): this currently works with no params, even though the
      // docs say `elementUpdated()` should take an element parameter:
      //   await elementUpdated(el); // this breaks
      // https://open-wc.org/testing/testing-helpers.html#elementupdated
      await elementUpdated();

      const errorMessage = root.querySelector(`[data-cy='error-message']`);
      expect(errorMessage.textContent).to.contain('Something went wrong');

      const dropdown = root.querySelector(`#conversionSelect`);
      expect(dropdown.disabled).to.equal(true);

      const button = root.querySelector(`[data-cy='cta-button']`);
      expect(button.disabled).to.equal(true);
    });
  });

  describe('should handle submit', () => {
    const amountsUrl = 'https://www.alaskaair.test/getconversionamounts';
    before(() => {
      fetchStub.withArgs(sinon.match(amountsUrl), sinon.match.any).resolves({
        ok: true,
        json: async () => ({
          conversionAmounts: [
            {from: 10.00, to: 100},
            {from: 5.00, to: 50},
            {from: 2.50, to: 25},
            {from: 1.25, to: 13},
          ],
          currentBalance: 10.00,
          toUnitDisplayName: 'miles',
        }),
      });
    });
    // todo(test): the redirect here on successful submit
    // causes an actual navigation event and loses the test results.
    it('when successful redirects guest to confirmation page');
    it('when guest session expires responds with an error', async () => {
      const submitUrl = 'https://www.alaskaair.test/converttoawardmiles';
      const confirmationUrl = 'https://www.alaskaair.test/success';
      fetchStub.withArgs(sinon.match(submitUrl), sinon.match.any).rejects();
      const el = await fixture(html`
        <account-funds-conversion-form
          getJwtEndpoint="${jwtUrl}"
          getWalletConversionApiKey="apim-key"
          getWalletConversionEndpoint="${amountsUrl}"
          submitWalletConversionApiKey="apim-key"
          submitWalletConversionEndpoint="${submitUrl}"
          confirmationRedirectUrl="${confirmationUrl}"
        </account-funds-conversion-form>
      `);
      const root = el.shadowRoot;
      await elementUpdated();

      fetchStub.withArgs(jwtUrl).resolves({
        ok: false,
      });

      const dropdown = root.querySelector(`#conversionSelect`);
      expect(dropdown.value).to.equal('10');

      const button = root.querySelector(`[data-cy='cta-button']`);
      expect(button.disabled).not.to.equal(true);

      const clickPromise = oneEvent(el, 'click');
      button.click();
      await clickPromise;
      await elementUpdated();

      expect(dropdown.disabled).to.equal(true);
      expect(button.disabled).to.equal(true);
    });
    it('when an error occurs on submit (fetch)', async () => {
      const submitUrl = 'https://www.alaskaair.test/converttoawardmiles';
      const confirmationUrl = 'https://www.alaskaair.test/success';
      fetchStub.withArgs(sinon.match(submitUrl), sinon.match.any).rejects();
      const el = await fixture(html`
        <account-funds-conversion-form
          getJwtEndpoint="${jwtUrl}"
          getWalletConversionApiKey="apim-key"
          getWalletConversionEndpoint="${amountsUrl}"
          submitWalletConversionApiKey="apim-key"
          submitWalletConversionEndpoint="${submitUrl}"
          confirmationRedirectUrl="${confirmationUrl}"
        </account-funds-conversion-form>
      `);
      const root = el.shadowRoot;
      await elementUpdated();

      const dropdown = root.querySelector(`#conversionSelect`);
      expect(dropdown.value).to.equal('10');

      const button = root.querySelector(`[data-cy='cta-button']`);
      expect(button.disabled).not.to.equal(true);

      const clickPromise = oneEvent(el, 'click');
      button.click();
      await clickPromise;
      await elementUpdated();

      expect(dropdown.disabled).to.equal(true);
      expect(button.disabled).to.equal(true);
    });
    it('when an error occurs on the server', async () => {
      const submitUrl = 'https://www.alaskaair.test/converttoawardmiles';
      const confirmationUrl = 'https://www.alaskaair.test/success';
      fetchStub.withArgs(sinon.match(submitUrl), sinon.match.any).resolves({
        ok: false,
      });
      const el = await fixture(html`
        <account-funds-conversion-form
          getJwtEndpoint="${jwtUrl}"
          getWalletConversionApiKey="apim-key"
          getWalletConversionEndpoint="${amountsUrl}"
          submitWalletConversionApiKey="apim-key"
          submitWalletConversionEndpoint="${submitUrl}"
          confirmationRedirectUrl="${confirmationUrl}"
        </account-funds-conversion-form>
      `);
      const root = el.shadowRoot;
      await elementUpdated();

      const dropdown = root.querySelector(`#conversionSelect`);
      expect(dropdown.value).to.equal('10');

      const button = root.querySelector(`[data-cy='cta-button']`);
      expect(button.disabled).not.to.equal(true);

      const clickPromise = oneEvent(el, 'click');
      button.click();
      await clickPromise;
      await elementUpdated();

      expect(dropdown.disabled).to.equal(true);
      expect(button.disabled).to.equal(true);
    });
  });
});
