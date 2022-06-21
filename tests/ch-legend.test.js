// import {fixture, expect, html} from '@open-wc/testing';
// import '../components/generics/legend/index.js';
// import expectSlotWorks from './utils/expectSlotWorks.js';

// describe('ch-legend', () => {
//   describe('ch-legend tests', async () => {
//     const el = await fixture(html`
//       <ch-legend
//         IsMixedCabinItinerary
//         HasGovernmentFare
//         HasGovernmentMixFare
//         HasGovernmentMatchFare
//         HasContractFare
//         HasContractMixFare
//         GuestPassMonitor
//         GuestPassRecommended
//         GuestPassNotRecommended
//         FirstClassUpgradeAvailable
//         FirstClassUpgradeUnavailable
//         PremiumClassUpgradeAvailable
//         PremiumClassUpgradeUnavailable
//       ></ch-legend>
//     `);

//     const icons = await el.shadowRoot.querySelector('.collapsed-content-container').firstElementChild;

//     it('should be accessible', async () => {
//       await expect(el).to.be.accessible();
//     });

//     it('should show custom slots', async () => {
//       await expectSlotWorks('ch-legend', 'accordion-icon');
//     });

//     it('should expand and collapse the accordion', async () => {
//       const slots = Array.from(el.shadowRoot.querySelectorAll('slot'));
//       const dropdown = slots.find((slot) => slot.name === 'accordion-icon');
//       const dropdownAttributes = Array.from(dropdown.attributes);
//       let hasClosedAttr = dropdownAttributes.find((attr) => attr.value === 'closed');
//       let hasOpenAttr = dropdownAttributes.find((attr) => attr.value === 'open');

//       await expect(hasClosedAttr.value).equals('closed');
//       await expect(hasOpenAttr).is.undefined;
//       await dropdown.click();
//       hasClosedAttr = dropdownAttributes.find((attr) => attr.value === 'closed');
//       hasOpenAttr = dropdownAttributes.find((attr) => attr.value === 'open');
//       await expect(hasOpenAttr.value).equals('open');
//       await expect(hasClosedAttr).is.undefined;
//     });

//     it('should have an icon for every attribute', async () => {
//       const iconCount = icons.childElementCount;
//       await expect(iconCount).to.equal(13);
//     });

//     const iconMessages = [];
//     const iconCollection = await el.shadowRoot.querySelectorAll('div.legend-advisory');
//     iconCollection.forEach((node) => {
//       if (!!node.innerText) {
//         iconMessages.push(node.innerText.trim());
//       }
//     });

//     it('Should have "Government fare"', async () => {
//       await expect(iconMessages.includes('Government fare')).to.be.true;
//     });

//     it('Should have "Government match fare"', async () => {
//       await expect(iconMessages.includes('Government match fare')).to.be.true;
//     });

//     it('Should have "Government mix fare"', async () => {
//       await expect(iconMessages.includes('Government mix fare')).to.be.true;
//     });

//     it('Should have "First Class upgrade available"', async () => {
//       await expect(iconMessages.includes('First Class upgrade available')).to.be.true;
//     });

//     it('Should have "First Class upgrade unavailable"', async () => {
//       await expect(iconMessages.includes('First Class upgrade unavailable')).to.be.true;
//     });

//     it('Should have "Premium Class upgrade available"', async () => {
//       await expect(iconMessages.includes('Premium Class upgrade available')).to.be.true;
//     });

//     it('Should have "Premium Class upgrade unavailable"', async () => {
//       await expect(iconMessages.includes('Premium Class upgrade unavailable')).to.be.true;
//     });

//     it('Should have "Recommended for standby travel, but monitor"', async () => {
//       await expect(iconMessages.includes('Recommended for standby travel, but monitor')).to.be.true;
//     });

//     it('Should have "Recommended for standby travel"', async () => {
//       await expect(iconMessages.includes('Recommended for standby travel')).to.be.true;
//     });

//     it('Should have "Not recommended for standby travel"', async () => {
//       await expect(iconMessages.includes('Not recommended for standby travel')).to.be.true;
//     });

//     it(`Should have "Mixed-cabin itinerary"`, async () => {
//       await expect(iconMessages.includes('Mixed-cabin itinerary (select for details)')).to.be.true;
//     });

//     it(`Should have "Contract itinerary"`, async () => {
//       await expect(iconMessages.some((message) => message.includes('Contract fare'))).to.be.true;
//     });

//     it(`Should have "Contract Mix itinerary"`, async () => {
//       await expect(iconMessages.includes('Contract mix fare')).to.be.true;
//     });
//   });

//   it('Successfully maps from the DTO on a tile advisory', async () => {
//     const testElement = await fixture(html`
//         <ch-legend IsMixedCabinItinerary
//         tileData='[
//           { "origin": "sea", "destination": "lax", "classOfService": "main" },
//           { "origin": "lax", "destination": "nrt", "classOfService": "premium" }
//         ]'>
//         </ch-legend>
//       `);

//     testElement.shadowRoot.firstElementChild.innerText.includes('SEA to LAX');
//   });
// });

