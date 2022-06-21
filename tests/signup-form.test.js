import {fixture, expect, html} from '@open-wc/testing';
import '../components/retain/signup-form/index.js';
import '../components/retain/signup-form/Helpers/validationManager';
import sinon from 'sinon';
import generateForm from '../components/retain/signup-form/Helpers/generateForm';

const partialFilledForm = {
  FirstName: 'Billy',
  BirthDate: '01/01/1991',
  Gender: 'male',
  CountryCode: '1',
  PhoneNumber: '2067903684',
  Email: 'captainInsaneO@gmail.com',
  Country: 'US',
  AddressLine1: '123 Broadway',
};
const completeForm = {
  FirstName: 'Billy',
  LastName: 'Maddison',
  BirthDate: '01/01/1991',
  Gender: 'male',
  // CountryCode: "1",
  PhoneNumber: '2067903684',
  Email: 'captainInsaneO@gmail.com',
  Country: 'US',
  AddressLine1: '123 Broadway',
  ZipCode: '98126',
  City: 'Seattle',
  State: 'WA',
  PrimaryDepartureCity: 'AUS',
};
const uri = 'http://misslippys/car/is/green';
const buttonSelector = '[data-cy=\'testSignUpButton\']';

describe('login-form', async () => {
  let fetchStub;

  before(() => {
    fetchStub = sinon.stub(window, 'fetch');
  });
  beforeEach(() => {
    fetchStub.resetHistory();
  });
  after(() => {
    fetchStub.restore();
  });

  beforeEach(() => {
    fetchStub.resolves({
      response: 'Shampoo Is Better',
      json: () => 'OK',
    });
  });

  it('1. should show display buttonText text', async () => {
    const bTxt = 'Billy Likes Soda';
    const el = await fixture(html`
      <signup-form buttonText=${bTxt}></signup-form>
    `);
    const root = el.shadowRoot;

    const button = root.querySelector(`${buttonSelector}`);

    expect(button.innerHTML).to.contain(bTxt);
  });

  it('2. Should not call fetch when form is empty', async () => {
    const el = await fixture(html`
      <signup-form
        buttonText="Next"
        enrollEndpoint="http://misslippys/car/is/green"
        channel="RAIN"
      ></signup-form>
    `);
    const root = el.shadowRoot;

    const button = root.querySelector(`${buttonSelector}`);

    button.click();
    expect(fetchStub).to.have.been.callCount(0);
  });

  it('3. Should not call fetch when form is partially empty', async () => {
    const el = await fixture(html`
      <signup-form
        buttonText="Next"
        enrollEndpoint=${uri}
        channel="RAIN"
      ></signup-form>
    `);
    const root = el.shadowRoot;
    const form = generateForm(root);
    Object.keys(form).forEach((key) => {
      const el = root.getElementById(form[key].id);
      el.value = partialFilledForm[key];
    });

    const button = root.querySelector(`${buttonSelector}`);

    button.click();
    expect(fetchStub).to.have.been.callCount(0);
  });

  it('4. Should call fetch when form is complete', async () => {
    const container = await fixture(html`
      <signup-form
        buttonText="Next"
        enrollEndpoint=${uri}
        channel="RAIN"
      ></signup-form>
    `);
    const root = container.shadowRoot;
    const form = generateForm(root);

    Object.keys(form).forEach((key) => {
      if (completeForm[key]) {
        const el = root.getElementById(form[key].id);
        el.value = completeForm[key];
      }
    });

    const body = JSON.stringify({
      FirstName: 'Billy',
      MiddleName: '',
      LastName: 'Maddison',
      Gender: 'male',
      AddressLine1: '123 Broadway',
      AddressLine2: '',
      Channel: 'RAIN',
      City: 'Seattle',
      State: 'WA',
      Country: 'US',
      CountryCode: '1',
      Email: 'captainInsaneO@gmail.com',
      Organization: 'Alaska Airlines',
      PhoneNumber: '2067903684',
      PrimaryDepartureCity: 'AUS',
      Salutation: null,
      ZipCode: '98126',
      BirthDate: '01/01/1991',
    });

    const button = root.querySelector(`${buttonSelector}`);

    button.click();

    expect(fetchStub).to.have.been.callCount(1);
    expect(fetchStub).to.have.been.calledWith(uri, {
      method: 'POST',
      body,
    });
  });
});
