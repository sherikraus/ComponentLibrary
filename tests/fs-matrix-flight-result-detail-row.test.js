// import {fixture, expect, html} from '@open-wc/testing';
// import '../components/flight-results/fs-matrix-flight-result-detail-row/index.js';

// describe('fs-matrix-flight-result-detail-row', () => {
//   it('should be accessible', async () => {
//     const el = await fixture(html`
//       <fs-matrix-flight-result-detail-row
//       Amenities='["wifi", "power", "ife"]'
//       ></fs-matrix-flight-result-detail-row>
//     `);
//     await expect(el).to.be.accessible();
//   });


//   it('should render all basic information', async () => {
//     const el = await fixture(html`
//       <fs-matrix-flight-result-detail-row
//             Carrier="AS"
//             FlightNumber="1010"
//             DepartureStation='SEA'
//             ArrivalStation='EWR'
//             DepartureTime="10:10 AM"
//             ArrivalTime="11:40 AM"
//             Amenities='["wifi", "power", "ife"]'
//             NextDayDeparture
//             NextDayArrival>
//       </fs-matrix-flight-result-detail-row>
//     `);
//     const root = el.shadowRoot;
//     const carrier = root.querySelector('airline-helper');
//     const flightNumber = root.querySelector('#flight-number');
//     const departureTime = root.querySelector('#departure-time');
//     const arrivalTime = root.querySelector('#arrival-time');
//     const amenities = root.querySelector('#ammenities');
//     await expect(carrier.getAttribute('iata')).to.contain('AS');
//     await expect(flightNumber.textContent).to.contain('1010');
//     await expect(departureTime.textContent).to.contain('10:10 AM');
//     await expect(departureTime.classList.contains('nextDay')).to.equal(true);
//     await expect(arrivalTime.textContent).to.contain('11:40 AM');
//     await expect(arrivalTime.classList.contains('nextDay')).to.equal(true);
//     await expect(amenities.childElementCount).to.equal(3);
//   });
//   it('should be accessible on IE', async () => {
//     window.MSInputMethodContext = true;
//     document.documentMode = true;
//     const el = await fixture(html`
//       <fs-matrix-flight-result-detail-row
//       Amenities='["wifi", "power", "ife"]'
//       index="1"
//       ></fs-matrix-flight-result-detail-row>
//       `);
//     await expect(el).to.be.accessible();
//     window.MSInputMethodContext = null;
//     document.documentMode = null;
//   });
// });
