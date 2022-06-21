import {fixture, expect, html} from '@open-wc/testing';
import '../components/merchandising/saver-upsell-dialog';
import sinon from 'sinon';

describe('saver-upsell-dialog', () => {
  // it('should be accessible', async () => {
  //   const el = await fixture(html`
  //     <saver-upsell-dialog price="70" roundtrip="true">
  //     </saver-upsell-dialog>
  //   `);
  //   let dialog = el.shadowRoot.querySelector('auro-dialog');
  //   dialog.removeAttribute('open');
  //   dialog.setAttribute('open', 'true');
  //   await expect(el).to.be.accessible();
  // });
  it('should display price', async () => {
    const el = await fixture(html`
      <saver-upsell-dialog price="70">
      </saver-upsell-dialog>
    `);
    const root = el.shadowRoot;
    expect(root.textContent).to.contain('70');
  });
  it('should emit saverCancel event when cancel method is called', async () => {
    const eventSpy = sinon.spy();
    const el = await fixture(html`
      <saver-upsell-dialog price="70">
      </saver-upsell-dialog>
    `);
    el.addEventListener('saverCancel', eventSpy);
    el.handleCancel();
    // event is called
    expect(eventSpy.called).eq(true);
    // event is only called once
    expect(eventSpy.calledOnce).eq(true);
  });
  it('should emit saverAccept event when accept method is called', async () => {
    const eventSpy = sinon.spy();
    const el = await fixture(html`
      <saver-upsell-dialog price="70">
      </saver-upsell-dialog>
    `);
    el.addEventListener('saverAccept', eventSpy);
    el.handleAccept();
    // event is called
    expect(eventSpy.called).eq(true);
    // event is only called once
    expect(eventSpy.calledOnce).eq(true);
  });
  it('should emit saverCancel event when reject upsell button is clicked', async () => {
    const eventSpy = sinon.spy();
    const el = await fixture(html`
      <saver-upsell-dialog price="70">
      </saver-upsell-dialog>
    `);
    el.addEventListener('saverCancel', eventSpy);
    const root = el.shadowRoot;
    root.querySelector('#saver-cancel-btn').click();
    // event is called
    expect(eventSpy.called).eq(true);
    // event is only called once
    expect(eventSpy.calledOnce).eq(true);
  });
  it('should emit saverAccept event when accept upsell button is clicked', async () => {
    const eventSpy = sinon.spy();
    const el = await fixture(html`
      <saver-upsell-dialog price="70">
      </saver-upsell-dialog>
    `);
    el.addEventListener('saverAccept', eventSpy);
    const root = el.shadowRoot;
    root.querySelector('#saver-accept-btn').click();
    // event is called
    expect(eventSpy.called).eq(true);
    // event is only called once
    expect(eventSpy.calledOnce).eq(true);
  });
});
