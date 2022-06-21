// import '../components/flight-search/fs-matrix-results/index.js';
// import {expect, fixture} from '@open-wc/testing';
// import {jsonBlob} from './artifacts/fs-matrix-results-json-blob';
// import '../components/generics/import-auro-components/index.js';

// describe('fs-matrix-results', () => {
//   // timeout issue

//   /* it('viewing expand results', async () => {
//     const el = await fixture(jsonBlob);
//     const root = el.shadowRoot;
//     const button = root.querySelector('expand-results');
//     const expandResults = root.querySelector('#toggleResults');
//     await expect(expandResults.buttonText).to.contain('Show more results');
//     await expect(expandResults.outerHTML).to.equal(
//         '<expand-results id="toggleResults" shown="10" total="15">\n        </expand-results>');

//     const clickPromise = oneEvent('click');
//     button.click();
//     await clickPromise;
//     await elementUpdated();

//     await expect(expandResults.buttonText).to.contain('Show fewer results');
//     await expect(expandResults.outerHTML).to.equal(
//         '<expand-results id="toggleResults" shown="10" total="15">\n           </expand-results>');
//   });*/
//   it('should show the compare-fares-tabbed modal when user clicks the fare cells in fs-matrix-results', async () => {
//     const el = await fixture(jsonBlob);
//     const root = el.shadowRoot;

//     const fareTypeCells = root.querySelectorAll('fs-matrix-faretype-cell');
//     expect(fareTypeCells.length).to.equal(3);

//     const button = fareTypeCells[0].shadowRoot.querySelector('#fare-container');
//     button.click();

//     // tests that the modal is actually open
//     const header = document.querySelector('auro-dialog[open="true"] span[slot="header"]');
//     expect(header.textContent).contains('Compare Fares');
//   });
// });
