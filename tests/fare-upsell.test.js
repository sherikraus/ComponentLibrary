import {fixture, expect, html} from '@open-wc/testing';
import '../components/merchandising/fare-upsell/index.js';

describe('fare-upsell', () => {
  it('should be accessible', async () => {
    const el = await fixture(html`
        <fare-upsell first price="280" totalPrice="560" upgradeLink="#" roundTrip></fare-upsell>
    `);

    await expect(el).to.be.accessible();
  });

  it('should not offer free lounge', async () => {
    const el = await fixture(html`
        <fare-upsell first price="280" totalPrice="560" upgradeLink="#" loungeAd roundTrip></fare-upsell>
    `);
    expect(el.freeLoungeEligible('')).to.equal(null);
    expect(el.freeLoungeEligible('IAH')).to.have.property('departure', false);
    expect(el.freeLoungeEligible('IAH')).to.have.property('layover', false);
    expect(el.freeLoungeEligible('IAH|MCO')).to.have.property('departure', false);
    expect(el.freeLoungeEligible('IAH|MCO')).to.have.property('layover', false);
  });

  it('should offer free lounge', async () => {
    const el = await fixture(html`
        <fare-upsell first price="280" totalPrice="560" upgradeLink="#" loungeAd roundTrip></fare-upsell>
    `);
    expect(el.freeLoungeEligible('SEA|LAX')).to.have.property('departure', true);
    expect(el.freeLoungeEligible('SEA|LAX')).to.have.property('layover', true);
    expect(el.freeLoungeEligible('SEA')).to.have.property('departure', true);
    expect(el.freeLoungeEligible('SEA')).to.have.property('layover', false);
    expect(el.freeLoungeEligible('SEA|LAX|DFW')).to.have.property('departure', true);
    expect(el.freeLoungeEligible('SEA|LAX|DFW')).to.have.property('layover', true);
  });
});
