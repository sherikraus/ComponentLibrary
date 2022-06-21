import {fixture, expect, html, elementUpdated} from '@open-wc/testing';
import '../components/retain/login-form/index.js';
import sinon from 'sinon';

describe('login-form', () => {
  let spy;
  before(() => {
    spy = sinon.stub(window, 'fetch');
  });
  after(() => {
    spy.restore();
  });
  it('should be accessible', async () => {
    const el = await fixture(html`
        <login-form 
            headerText="Sign in to continue" 
            resetUsernameLink= "https://www.alaskaair.com/userreset/forgotuserid"
            resetPasswordLink = "https://www.alaskaair.com/userreset/resetpassword"
            mpJoinLink = "https://www.alaskaair.com/myaccount/join"
            postUrl="/">
        </login-form>
    `);
    await expect(el).to.be.accessible();
  });

  it('1. should be accessible on IE', async () => {
    window.MSInputMethodContext = true;
    document.documentMode = true;
    const el = await fixture(html`
          <login-form headerText="Sign in to continue" ></login-form>
  `);
    await expect(el).to.be.accessible();
    window.MSInputMethodContext = null;
    document.documentMode = null;
  });

  it('2. should show display header text', async () => {
    const el = await fixture(html`
      <login-form headerText="Sign in to continue" ></login-form>
    `);
    const root = el.shadowRoot;
    const header = root.querySelector(`[data-cy='testLoginHeader']`);
    expect(header.textContent).to.contain('Sign in to continue');
  });

  it('3. should set username reset link', async () => {
    const el = await fixture(html`
        <login-form 
            headerText="Sign in to continue" 
            resetUsernameLink= "https://www.alaskaair.com/userreset/forgotuserid">
        </login-form>
    `);
    const root = el.shadowRoot;
    const usernameResetLink = root.querySelector(`[data-cy='testResetUsernameLink']`);
    expect(usernameResetLink.getAttribute('href')).to.equal('https://www.alaskaair.com/userreset/forgotuserid');
  });

  it('4. should set password reset link', async () => {
    const el = await fixture(html`
        <login-form 
            headerText="Sign in to continue" 
            resetPasswordLink= "https://www.alaskaair.com/userreset/resetpassword">
        </login-form>
    `);
    const root = el.shadowRoot;
    const passwordResetLink = root.querySelector(`[data-cy='testResetPasswordLink']`);
    expect(passwordResetLink.getAttribute('href')).to.equal('https://www.alaskaair.com/userreset/resetpassword');
  });

  it('5. should set join MP link', async () => {
    const el = await fixture(html`
        <login-form 
            headerText="Sign in to continue"
            mpJoinLink = "https://www.alaskaair.com/myaccount/join">
        </login-form>
    `);
    const root = el.shadowRoot;
    const joinMPLink = root.querySelector(`[data-cy='testJoinMPLink']`);
    expect(joinMPLink.getAttribute('href')).to.equal('https://www.alaskaair.com/myaccount/join');
  });

  it('6. should set error summary', async () => {
    const el = await fixture(html`
        <login-form 
          headerText="Sign in to continue" 
          resetUsernameLink= "https://www.alaskaair.com/userreset/forgotuserid"
          resetPasswordLink = "https://www.alaskaair.com/userreset/resetpassword"
          mpJoinLink = "https://www.alaskaair.com/myaccount/join"
          postUrl="https://www.alaskaair.com/SSO/signin"
          errorSummary='["Wrong Info!", "Your Account Is Locked!"]'>
        </login-form>
    `);
    const root = el.shadowRoot;
    const errorSummary = root.querySelector(`[data-cy='testErrorSummaryText']`);
    expect(errorSummary.textContent).to.contain('Wrong Info!');
    expect(errorSummary.textContent).to.contain('Your Account Is Locked!');
  });

  // it('7. should submit form data via button', async () => {
  //   function mockApiResponse() {
  //     return {json: () => {
  //       return {'body': {},
  //         'status': 200, 'headers': {'Content-type': 'application/json'}};
  //     }};
  //   };
  //   spy.resolves(mockApiResponse());
  //   const el = await fixture(html`
  //       <login-form
  //           headerText="Sign in to continue"
  //           resetUsernameLink= "https://www.alaskaair.com/userreset/forgotuserid"
  //           resetPasswordLink = "https://www.alaskaair.com/userreset/resetpassword"
  //           mpJoinLink = "https://www.alaskaair.com/myaccount/join"
  //           postUrl="www.test.com/send/here">
  //       </login-form>
  //   `);
  //   const expectedUrl = 'www.test.com/send/here';
  //   const expectedOptions = {method: 'POST', body: '{"CheckboxRememberMe":false}'};
  //   const root = el.shadowRoot;
  //   root.querySelector(`[data-cy='testLoginSubmitButton']`).click();
  //   expect(spy.calledWith(expectedUrl, expectedOptions)).to.be.true;
  // });

  // it('8. should submit form data via enter in Password field', async () => {
  //   function mockApiResponse() {
  //     return {json: () => {
  //       return {'body': {},
  //         'status': 200, 'headers': {'Content-type': 'application/json'}};
  //     }};
  //   };
  //   spy.resolves(mockApiResponse());
  //   const el = await fixture(html`
  //       <login-form
  //           headerText="Sign in to continue"
  //           resetUsernameLink= "https://www.alaskaair.com/userreset/forgotuserid"
  //           resetPasswordLink = "https://www.alaskaair.com/userreset/resetpassword"
  //           mpJoinLink = "https://www.alaskaair.com/myaccount/join"
  //           postUrl="www.test.com/send/here">
  //       </login-form>
  //   `);
  //   const expectedUrl = 'www.test.com/send/here';
  //   const expectedOptions = {method: 'POST', body: '{"CheckboxRememberMe":false}'};
  //   const root = el.shadowRoot;
  //   const passwordInput = root.querySelector(`[data-cy='testLoginPasswordInput']`);
  //   await elementUpdated(el);
  //   passwordInput.dispatchEvent( new KeyboardEvent('keyup', {'keyCode': 13}) );
  //   expect(spy.calledWith(expectedUrl, expectedOptions)).to.be.true;
  // });

  it('9. should set error returned', async () => {
    function mockApiResponse() {
      return {json: () => {
        return {'summaryError': 'The sign-in information entered does not match our records. Please try again.',
          'status': 200, 'headers': {'Content-type': 'application/json'}};
      }};
    };
    spy.resolves(mockApiResponse());
    const el = await fixture(html`
        <login-form 
            headerText="Sign in to continue" 
            resetUsernameLink= "https://www.alaskaair.com/userreset/forgotuserid"
            resetPasswordLink = "https://www.alaskaair.com/userreset/resetpassword"
            mpJoinLink = "https://www.alaskaair.com/myaccount/join"
            postUrl="www.test.com/send/here">
        </login-form>
    `);
    const expectedUrl = 'www.test.com/send/here';
    const expectedOptions = {method: 'POST',
      body: '{"UserIdOrMPNumber":"abc","UserPassword":"123","CheckboxRememberMe":false}'};
    const expectedError = 'The sign-in information entered does not match our records. Please try again.';
    const root = el.shadowRoot;
    root.querySelector(`[data-cy='testLoginUsernameInput']`).value = 'abc';
    root.querySelector(`[data-cy='testLoginPasswordInput']`).value = '123';
    root.querySelector(`[data-cy='testLoginSubmitButton']`).click();
    await elementUpdated(el);
    await elementUpdated(el);
    await elementUpdated(el);
    expect(spy.calledWith(expectedUrl, expectedOptions)).to.be.true;
    const errorSummary = root.querySelector(`[data-cy='testErrorSummaryText']`);
    expect(errorSummary.textContent).to.contain(expectedError);
  });

  it('10. should catch error thrown', async () => {
    spy.rejects(new Error('test error'));
    const el = await fixture(html`
        <login-form 
            headerText="Sign in to continue" 
            resetUsernameLink= "https://www.alaskaair.com/userreset/forgotuserid"
            resetPasswordLink = "https://www.alaskaair.com/userreset/resetpassword"
            mpJoinLink = "https://www.alaskaair.com/myaccount/join"
            postUrl="www.test.com/send/here">
        </login-form>
    `);
    const root = el.shadowRoot;
    root.querySelector(`[data-cy='testLoginSubmitButton']`).click();
    await elementUpdated(el);
    await elementUpdated(el);
    const errorSummary = root.querySelector(`[data-cy='testErrorSummaryText']`);
    expect(errorSummary.textContent).to.contain('Something went wrong on our end. Please try again.');
  });

  // it('11. should set processing status', async () => {
  //   function mockApiResponse() {
  //     return {json: () => {
  //       return {'body': {},
  //         'status': 200, 'headers': {'Content-type': 'application/json'}};
  //     }};
  //   };
  //   spy.resolves(mockApiResponse());
  //   const el = await fixture(html`
  //       <login-form
  //           headerText="Sign in to continue"
  //           resetUsernameLink= "https://www.alaskaair.com/userreset/forgotuserid"
  //           resetPasswordLink = "https://www.alaskaair.com/userreset/resetpassword"
  //           mpJoinLink = "https://www.alaskaair.com/myaccount/join"
  //           postUrl="www.test.com/send/here">
  //       </login-form>
  //   `);
  //   const expectedUrl = 'www.test.com/send/here';
  //   const expectedOptions = {method: 'POST', body: '{"CheckboxRememberMe":false}'};
  //   const root = el.shadowRoot;
  //   const submitButton = root.querySelector(`auro-button[data-cy='testLoginSubmitButton']`);
  //   submitButton.click();
  //   expect(spy.calledWith(expectedUrl, expectedOptions)).to.be.true;
  //   await elementUpdated(el);
  //   await elementUpdated(el);
  //   expect(submitButton.textContent).to.contain('Processing...');
  // });
});
