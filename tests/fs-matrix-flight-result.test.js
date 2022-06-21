// import {fixture, expect, html} from '@open-wc/testing';
// import '../components/flight-results/fs-matrix-flight-result/index.js';

// describe('fs-matrix-flight-result', () => {
//   // it('should be accessible', async () => {
//   //   const el = await fixture(html`
//   //     <fs-matrix-flight-result
//   //     DisplayCarrierInfo='{
//   //           "Code": "AS",
//   //           "Name": "Alaska",
//   //           "ShortName": "Alaska",
//   //           "LogoName": "AS",
//   //           "DisclosureText": ""
//   //       }'
//   //       DepartureStation='{
//   //       "Code": "SFO",
//   //       "Name": "San Francisco",
//   //       "Region": null,
//   //       "ChangeOfPlane": false
//   //       }'
//   //       ArrivalStation='{
//   //       "Code": "SFO",
//   //       "Name": "San Francisco",
//   //       "Region": null,
//   //       "ChangeOfPlane": false
//   //       }'
//   //       FlightLoadStatus='{
//   //       "ImageName": null,
//   //       "ToolTip": null
//   //       }'
//   //       DisplayFlightNumber='266'
//   //       Distance='2558'
//   //       StopAirports='[]'
//   //       Duration='05h 36m'
//   //       IsNextDayArrival="false"
//   //       IsNextDayDeparture="true"
//   //       DepartureTime='2020-06-18T17:05:00'
//   //       ArrivalTime="2020-06-18T19:18:00"
//   //       Footnotes='[{"carrier": "AS", "content": "lol", "operator": "OO"}]'
//   //     Segments='[{"Carrier":"AS","FlightNumber":742,"DepartureStation":"SEA","ArrivalStation":"SFO",
//   //     "Duration":"2h 13m","Distance":678,"DepartureTime":"7:55 pm","ArrivalTime":"10:08 pm",
//   //     "DepartureDay":"Thu, Jun 18","ArrivalDay":"Thu, Jun 18","NextDayArrival":false,"NextDayDeparture":
//   //     false,"Performance":[{"CanceledPercentage":0,"ChronicallyDelayed":false,"EquipmentCode":"320",
//   //     "EquipmentName":"Airbus A320","PercentLate30Plus":0,"PercentOntime":100,"DepartureAirportCode":
//   //     "SEA","ArrivalAirportCode":"SFO","ChangeOfPlane":false}],"StopoverInformation":["15h","37m"],
//   //     "Equipment":"320","FirstClassUpgradeAvailable":false,"FirstClassUpgradeUnavailable":false,
//   //     "Amenities":["wifi","power","ife"]},{"Carrier":"AS","FlightNumber":266,"DepartureStation":
//   //     "SFO","ArrivalStation":"EWR","Duration":"5h 36m","Distance":2558,"DepartureTime":"1:45 pm",
//   //     "ArrivalTime":"10:21 pm","DepartureDay":"Fri, Jun 19","ArrivalDay":"Fri, Jun 19","NextDayArrival":
//   //     false,"NextDayDeparture":true,"Performance":[{"CanceledPercentage":45,"ChronicallyDelayed":false,
//   //     "EquipmentCode":"73J","EquipmentName":"Boeing 737-900","PercentLate30Plus":0,"PercentOntime":54,
//   //     "DepartureAirportCode":"SFO","ArrivalAirportCode":"EWR","ChangeOfPlane":false}],
//   //     "StopoverInformation":[],"Equipment":"73J","FirstClassUpgradeAvailable":false,
//   //     "FirstClassUpgradeUnavailable":false,"Amenities":["wifi","power","ife"]}]'
//   //     ></fs-matrix-flight-result>
//   //   `);
//   //   await expect(el).to.be.accessible();
//   // });


//   // it('should render all basic information on a multi-segment trip', async () => {
//   //   /*eslint-disable */
//   //   const el = await fixture(html`
//   //       <fs-matrix-flight-result
//   //       DisplayCarrierInfo='{
//   //           "Code": "AS",
//   //           "Name": "Alaska",
//   //           "ShortName": "Alaska",
//   //           "LogoName": "AS",
//   //           "DisclosureText": ""
//   //       }'
//   //       DepartureStation='{
//   //       "Code": "SFO",
//   //       "Name": "San Francisco",
//   //       "Region": null,
//   //       "ChangeOfPlane": false
//   //       }'
//   //       ArrivalStation='{
//   //       "Code": "SFO",
//   //       "Name": "San Francisco",
//   //       "Region": null,
//   //       "ChangeOfPlane": false
//   //       }'
//   //       FlightLoadStatus='{
//   //       "ImageName": null,
//   //       "ToolTip": null
//   //       }'
//   //       DisplayFlightNumber='266'
//   //       Distance='2558'
//   //       StopAirports='[]'
//   //       Duration='05h 36m'
//   //       IsNextDayArrival="false"
//   //       IsNextDayDeparture="true"
//   //       DepartureTime='2020-06-18T17:05:00'
//   //       ArrivalTime="2020-06-18T19:18:00"
//   //       Footnotes='[{"carrier": "AS", "content": "lol", "operator": "OO"}]'
//   //       Segments='[{"Carrier":"AS","FlightNumber":1094,"DepartureStation":"SEA","ArrivalStation":"LAX",
//   //       "Duration":"02:45:00","Distance":954,"DepartureTime":"5:10 PM","ArrivalTime":"7:55 PM",
//   //       "NextDayArrival":false,"NextDayDeparture":false,"Equipment":"321","Amenities":["wifi","power",
//   //       "ife"]},{"Carrier":"AS","FlightNumber":3467,"DepartureStation":"LAX","ArrivalStation":"SFO",
//   //       "Duration":"01:30:00","Distance":337,"DepartureTime":"10:10 AM","ArrivalTime":"11:40 AM",
//   //       "NextDayArrival":false,"NextDayDeparture":true,"Equipment":"E75","Amenities":["wifi","power",
//   //       "ife"]},{"Carrier":"AS","FlightNumber":266,"DepartureStation":"SFO","ArrivalStation":"EWR",
//   //       "Duration":"05:36:00","Distance":2558,"DepartureTime":"1:45 PM","ArrivalTime":"10:21 PM",
//   //       "NextDayArrival":false,"NextDayDeparture":false,"Equipment":"73J","Amenities":["wifi","power",
//   //       "ife"]}]'
//   //   >
//   //   </fs-matrix-flight-result>
//   //   `);
//   //   /* eslint-enable */
//   //   const root = el.shadowRoot;
//   //   const segmentContainer = root.querySelector('#segmentContainer');
//   //   const details = root.querySelector('#details');
//   //   const seatMap = root.querySelector('#seatmap');
//   //   await expect(details.textContent).to.contain('Details');
//   //   await expect(seatMap.textContent).to.contain('');
//   //   await expect(segmentContainer.childElementCount).to.equal(1);
//   // });

//   // it('should render all basic information on a nonstop trip', async () => {
//   //   const el = await fixture(html`
//   //       <fs-matrix-flight-result
//   //       DisplayCarrierInfo='{
//   //           "Code": "AS",
//   //           "Name": "Alaska",
//   //           "ShortName": "Alaska",
//   //           "LogoName": "AS",
//   //           "DisclosureText": ""
//   //       }'
//   //       DepartureStation='{
//   //       "Code": "SFO",
//   //       "Name": "San Francisco",
//   //       "Region": null,
//   //       "ChangeOfPlane": false
//   //       }'
//   //       ArrivalStation='{
//   //       "Code": "SFO",
//   //       "Name": "San Francisco",
//   //       "Region": null,
//   //       "ChangeOfPlane": false
//   //       }'
//   //       FlightLoadStatus='{
//   //       "ImageName": null,
//   //       "ToolTip": null
//   //       }'
//   //       DisplayFlightNumber='266'
//   //       Distance='2558'
//   //       StopAirports='[]'
//   //       Duration='05h 36m'
//   //       IsNextDayArrival="false"
//   //       IsNextDayDeparture="true"
//   //       DepartureTime='2020-06-18T17:05:00'
//   //       ArrivalTime="2020-06-18T19:18:00"
//   //       Segments='[{"Carrier":"AS","FlightNumber":742,"DepartureStation":"SEA","ArrivalStation":"SFO",
//   //       "Duration":"2h 13m","Distance":678,"DepartureTime":"7:55 pm","ArrivalTime":"10:08 pm",
//   //       "DepartureDay":"Thu, Jun 18","ArrivalDay":"Thu, Jun 18","NextDayArrival":false,"NextDayDeparture":
//   //       false,"Performance":[{"CanceledPercentage":0,"ChronicallyDelayed":false,"EquipmentCode":"320",
//   //       "EquipmentName":"Airbus A320","PercentLate30Plus":0,"PercentOntime":100,"DepartureAirportCode":
//   //       "SEA","ArrivalAirportCode":"SFO","ChangeOfPlane":false}],"StopoverInformation":["15h","37m"],
//   //       "Equipment":"320","FirstClassUpgradeAvailable":false,"FirstClassUpgradeUnavailable":false,
//   //       "Amenities":["wifi","power","ife"]},{"Carrier":"AS","FlightNumber":266,"DepartureStation":"SFO",
//   //       "ArrivalStation":"EWR","Duration":"5h 36m","Distance":2558,"DepartureTime":"1:45 pm","ArrivalTime":
//   //       "10:21 pm","DepartureDay":"Fri, Jun 19","ArrivalDay":"Fri, Jun 19","NextDayArrival":false,
//   //       "NextDayDeparture":true,"Performance":[{"CanceledPercentage":45,"ChronicallyDelayed":false,
//   //       "EquipmentCode":"73J","EquipmentName":"Boeing 737-900","PercentLate30Plus":0,"PercentOntime":54,
//   //       "DepartureAirportCode":"SFO","ArrivalAirportCode":"EWR","ChangeOfPlane":false}],
//   //       "StopoverInformation":[],"Equipment":"73J","FirstClassUpgradeAvailable":false,
//   //       "FirstClassUpgradeUnavailable":false,"Amenities":["wifi","power","ife"]}]'
//   //       Footnotes='[{"carrier": "AS", "content": "lol", "operator": "OO"}]'
//   //   >
//   //   </fs-matrix-flight-result>
//   //   `);
//   //   const root = el.shadowRoot;
//   //   const segmentContainer = root.querySelector('#segmentContainer');
//   //   const details = root.querySelector('#details');
//   //   const seatMap = root.querySelector('#seatmap');
//   //   await expect(details.textContent).to.contain('Details');
//   //   await expect(seatMap.textContent).to.contain('');
//   //   await expect(segmentContainer.childElementCount).to.equal(1);
//   // });
//   // it('should be accessible on IE', async () => {
//   //   window.MSInputMethodContext = true;
//   //   document.documentMode = true;
//   //   const el = await fixture(html`
//   //     <fs-matrix-flight-result
//   //     DisplayCarrierInfo='{
//   //           "Code": "AS",
//   //           "Name": "Alaska",
//   //           "ShortName": "Alaska",
//   //           "LogoName": "AS",
//   //           "DisclosureText": ""
//   //       }'
//   //       DepartureStation='{
//   //       "Code": "SFO",
//   //       "Name": "San Francisco",
//   //       "Region": null,
//   //       "ChangeOfPlane": false
//   //       }'
//   //       ArrivalStation='{
//   //       "Code": "SFO",
//   //       "Name": "San Francisco",
//   //       "Region": null,
//   //       "ChangeOfPlane": false
//   //       }'
//   //       FlightLoadStatus='{
//   //       "ImageName": null,
//   //       "ToolTip": null
//   //       }'
//   //       DisplayFlightNumber='266'
//   //       Distance='2558'
//   //       StopAirports='[]'
//   //       Duration='05h 36m'
//   //       IsNextDayArrival="false"
//   //       IsNextDayDeparture="true"
//   //       DepartureTime='2020-06-18T17:05:00'
//   //       ArrivalTime="2020-06-18T19:18:00"
//   //       Segments='[{"Carrier":"AS","FlightNumber":742,"DepartureStation":"SEA","ArrivalStation":"SFO",
//   //       "Duration":"2h 13m","Distance":678,"DepartureTime":"7:55 pm","ArrivalTime":"10:08 pm",
//   //       "DepartureDay":"Thu, Jun 18","ArrivalDay":"Thu, Jun 18","NextDayArrival":false,"NextDayDeparture":
//   //       false,"Performance":[{"CanceledPercentage":0,"ChronicallyDelayed":false,"EquipmentCode":"320",
//   //       "EquipmentName":"Airbus A320","PercentLate30Plus":0,"PercentOntime":100,"DepartureAirportCode":
//   //       "SEA","ArrivalAirportCode":"SFO","ChangeOfPlane":false}],"StopoverInformation":["15h","37m"],
//   //       "Equipment":"320","FirstClassUpgradeAvailable":false,"FirstClassUpgradeUnavailable":false,
//   //       "Amenities":["wifi","power","ife"]},{"Carrier":"AS","FlightNumber":266,"DepartureStation":"SFO",
//   //       "ArrivalStation":"EWR","Duration":"5h 36m","Distance":2558,"DepartureTime":"1:45 pm","ArrivalTime":
//   //       "10:21 pm","DepartureDay":"Fri, Jun 19","ArrivalDay":"Fri, Jun 19","NextDayArrival":false,
//   //       "NextDayDeparture":true,"Performance":[{"CanceledPercentage":45,"ChronicallyDelayed":false,
//   //       "EquipmentCode":"73J","EquipmentName":"Boeing 737-900","PercentLate30Plus":0,"PercentOntime":54,
//   //       "DepartureAirportCode":"SFO","ArrivalAirportCode":"EWR","ChangeOfPlane":false}],
//   //       "StopoverInformation":[],"Equipment":"73J","FirstClassUpgradeAvailable":false,
//   //       "FirstClassUpgradeUnavailable":false,"Amenities":["wifi","power","ife"]}]'
//   //       Footnotes='[{"carrier": "AS", "content": "lol", "operator": "OO"}]'
//   //     ></fs-matrix-flight-result>
//   //     `);
//   //   await expect(el).to.be.accessible();
//   //   window.MSInputMethodContext = null;
//   //   document.documentMode = null;
//   // });
// });
