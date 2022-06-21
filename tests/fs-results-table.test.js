// import '../components/flight-search/fs-results-table/index.js';
// import '../components/generics/import-auro-components/index.js';
// import {fixture, expect, html} from '@open-wc/testing';

// describe('fs-results-table', () => {
//   describe('Basic Rendering', async () => {
//     const testElement = await fixture(html`<fs-results-table options='
//         [{
//             "Duration": "26h 16m",
//             "Footnotes": [

//             ],
//             "Segments": [{
//                     "Carrier": "AS",
//                     "FlightNumber": 405,
//                     "DepartureStation": "SEA",
//                     "ArrivalStation": "SFO",
//                     "Duration": "2h 13m",
//                     "Distance": 678,
//                     "DepartureTime": "5:05 pm",
//                     "ArrivalTime": "7:18 pm",
//                     "DepartureDay": "Thu, Jun 18",
//                     "ArrivalDay": "Thu, Jun 18",
//                     "NextDayArrival": false,
//                     "NextDayDeparture": false,
//                     "Performance": [{
//                         "CanceledPercentage": 0,
//                         "ChronicallyDelayed": false,
//                         "EquipmentCode": "321",
//                         "EquipmentName": "Airbus A321",
//                         "PercentLate30Plus": 0,
//                         "PercentOntime": 100,
//                         "DepartureAirportCode": "SEA",
//                         "ArrivalAirportCode": "SFO",
//                         "ChangeOfPlane": false
//                     }],
//                     "StopoverInformation": [
//                         "18h",
//                         "27m"
//                     ],
//                     "Equipment": "321",
//                     "FirstClassUpgradeAvailable": false,
//                     "FirstClassUpgradeUnavailable": false,
//                     "Amenities": [
//                         "wifi",
//                         "power",
//                         "ife"
//                     ]
//                 },
//                 {
//                     "Carrier": "AS",
//                     "FlightNumber": 266,
//                     "DepartureStation": "SFO",
//                     "ArrivalStation": "EWR",
//                     "Duration": "5h 36m",
//                     "Distance": 2558,
//                     "DepartureTime": "1:45 pm",
//                     "ArrivalTime": "10:21 pm",
//                     "DepartureDay": "Fri, Jun 19",
//                     "ArrivalDay": "Fri, Jun 19",
//                     "NextDayArrival": false,
//                     "NextDayDeparture": true,
//                     "Performance": [{
//                         "CanceledPercentage": 45,
//                         "ChronicallyDelayed": false,
//                         "EquipmentCode": "73J",
//                         "EquipmentName": "Boeing 737-900",
//                         "PercentLate30Plus": 0,
//                         "PercentOntime": 54,
//                         "DepartureAirportCode": "SFO",
//                         "ArrivalAirportCode": "EWR",
//                         "ChangeOfPlane": false
//                     }],
//                     "StopoverInformation": [

//                     ],
//                     "Equipment": "73J",
//                     "FirstClassUpgradeAvailable": false,
//                     "FirstClassUpgradeUnavailable": false,
//                     "Amenities": [
//                         "wifi",
//                         "power",
//                         "ife"
//                     ]
//                 }
//             ],
//             "Fares": {
//                 "MainCabinFare": {
//                     "GrandTotal": 566.2,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_0_2_1"
//                 },
//                 "SpecialFare": {
//                     "GrandTotal": 804.2,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_0_3_4"
//                 },
//                 "MainCabinSelectFare": {
//                     "GrandTotal": 387.8,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_4_4_36"
//                 },
//                 "MainCabinSelectRefundableFare": {
//                     "GrandTotal": 875.8,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_4_4_36"
//                 },
//                 "FullFlexFare": {
//                     "GrandTotal": 1184.2,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_0_4_23"
//                 },
//                 "FirstClassDealsFare": {
//                     "GrandTotal": 2775.1,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_11_4_42"
//                 },
//                 "GuestPassFare": {
//                     "GrandTotal": 1184.2,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_0_5_23"
//                 },
//                 "SaverFare": {
//                     "GrandTotal": 26,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_5_5_37"
//                 }
//             },
//             "SeatMapURL": "https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=AS,AS,405,405,SEA,6/18/2020 5:05:00 PM,SFO,6/18/2020 7:18:00 PM,321,133,False$321,SEA,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
//         }]' guesttype="" index="0"></fs-results-table>
//         `);
//     it('should be accessible', async () => {
//       await expect(testElement).is.accessible;
//     });
//   });

//   describe('Flight Info Table Assertions', async () => {
//     const testElement = await fixture(html`<fs-results-table options='
//         [{
//             "Duration": "26h 16m",
//             "Footnotes": [

//             ],
//             "Segments": [{
//                     "Carrier": "AS",
//                     "FlightNumber": 405,
//                     "DepartureStation": "SEA",
//                     "ArrivalStation": "SFO",
//                     "Duration": "2h 13m",
//                     "Distance": 678,
//                     "DepartureTime": "5:05 pm",
//                     "ArrivalTime": "7:18 pm",
//                     "DepartureDay": "Thu, Jun 18",
//                     "ArrivalDay": "Thu, Jun 18",
//                     "NextDayArrival": false,
//                     "NextDayDeparture": false,
//                     "Performance": [{
//                         "CanceledPercentage": 0,
//                         "ChronicallyDelayed": false,
//                         "EquipmentCode": "321",
//                         "EquipmentName": "Airbus A321",
//                         "PercentLate30Plus": 0,
//                         "PercentOntime": 100,
//                         "DepartureAirportCode": "SEA",
//                         "ArrivalAirportCode": "SFO",
//                         "ChangeOfPlane": false
//                     }],
//                     "StopoverInformation": [
//                         "18h",
//                         "27m"
//                     ],
//                     "Equipment": "321",
//                     "FirstClassUpgradeAvailable": false,
//                     "FirstClassUpgradeUnavailable": false,
//                     "Amenities": [
//                         "wifi",
//                         "power",
//                         "ife"
//                     ]
//                 },
//                 {
//                     "Carrier": "AS",
//                     "FlightNumber": 266,
//                     "DepartureStation": "SFO",
//                     "ArrivalStation": "EWR",
//                     "Duration": "5h 36m",
//                     "Distance": 2558,
//                     "DepartureTime": "1:45 pm",
//                     "ArrivalTime": "10:21 pm",
//                     "DepartureDay": "Fri, Jun 19",
//                     "ArrivalDay": "Fri, Jun 19",
//                     "NextDayArrival": false,
//                     "NextDayDeparture": true,
//                     "Performance": [{
//                         "CanceledPercentage": 45,
//                         "ChronicallyDelayed": false,
//                         "EquipmentCode": "73J",
//                         "EquipmentName": "Boeing 737-900",
//                         "PercentLate30Plus": 0,
//                         "PercentOntime": 54,
//                         "DepartureAirportCode": "SFO",
//                         "ArrivalAirportCode": "EWR",
//                         "ChangeOfPlane": false
//                     }],
//                     "StopoverInformation": [

//                     ],
//                     "Equipment": "73J",
//                     "FirstClassUpgradeAvailable": false,
//                     "FirstClassUpgradeUnavailable": false,
//                     "Amenities": [
//                         "wifi",
//                         "power",
//                         "ife"
//                     ]
//                 }
//             ],
//             "Fares": {
//                 "MainCabinFare": {
//                     "GrandTotal": 566.2,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_0_2_1"
//                 },
//                 "SpecialFare": {
//                     "GrandTotal": 804.2,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_0_3_4"
//                 },
//                 "MainCabinSelectFare": {
//                     "GrandTotal": 387.8,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_4_4_36"
//                 },
//                 "MainCabinSelectRefundableFare": {
//                     "GrandTotal": 875.8,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_4_4_36"
//                 },
//                 "FullFlexFare": {
//                     "GrandTotal": 1184.2,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_0_4_23"
//                 },
//                 "FirstClassDealsFare": {
//                     "GrandTotal": 2775.1,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_11_4_42"
//                 },
//                 "GuestPassFare": {
//                     "GrandTotal": 1184.2,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_0_5_23"
//                 },
//                 "SaverFare": {
//                     "GrandTotal": 26,
//                     "SeatsRemaining": "only 3 left at",
//                     "MixedCabin": false,
//                     "Cabins": [

//                     ],
//                     "Discount": false,
//                     "Segments": [

//                     ],
//                     "id": "Price_0_5_5_37"
//                 }
//             },
//             "SeatMapURL": "https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=AS,AS,405,405,SEA,6/18/2020 5:05:00 PM,SFO,6/18/2020 7:18:00 PM,321,133,False$321,SEA,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
//         }]' guesttype="" index="0"></fs-results-table>
//         `);
//     const testFlightInfoTable = await testElement.shadowRoot.querySelector('fs-matrix-flight-result');
//     const testFSMatrixFlightResult = testFlightInfoTable.shadowRoot.querySelector('auro-flight');

//     it('Renders fs-matrix-flight-result', async () => {
//       await expect(testFlightInfoTable).is.not.null;
//     });

//     it('Rendered fs-matrix-flight-result is built with correct information', async () => {
//       console.log('test matrix result: ', testFSMatrixFlightResult);
//       await expect(testFSMatrixFlightResult.departureStation).equals('SEA');
//       await expect(testFSMatrixFlightResult.departureTime).equals('5:05 pm');
//       await expect(testFSMatrixFlightResult.arrivalStation).equals('EWR');
//       await expect(testFSMatrixFlightResult.arrivalTime).equals('10:21 pm');
//     });
//   });

// //   describe('Value Tiles Rendering', async () => {
// //     const testElement = await fixture(html`<fs-results-table options='
// //         [{
// //             "Duration": "26h 16m",
// //             "Footnotes": [

// //             ],
// //             "Segments": [{
// //                     "Carrier": "AS",
// //                     "FlightNumber": 405,
// //                     "DepartureStation": "SEA",
// //                     "ArrivalStation": "SFO",
// //                     "Duration": "2h 13m",
// //                     "Distance": 678,
// //                     "DepartureTime": "5:05 pm",
// //                     "ArrivalTime": "7:18 pm",
// //                     "DepartureDay": "Thu, Jun 18",
// //                     "ArrivalDay": "Thu, Jun 18",
// //                     "NextDayArrival": false,
// //                     "NextDayDeparture": false,
// //                     "Performance": [{
// //                         "CanceledPercentage": 0,
// //                         "ChronicallyDelayed": false,
// //                         "EquipmentCode": "321",
// //                         "EquipmentName": "Airbus A321",
// //                         "PercentLate30Plus": 0,
// //                         "PercentOntime": 100,
// //                         "DepartureAirportCode": "SEA",
// //                         "ArrivalAirportCode": "SFO",
// //                         "ChangeOfPlane": false
// //                     }],
// //                     "StopoverInformation": [
// //                         "18h",
// //                         "27m"
// //                     ],
// //                     "Equipment": "321",
// //                     "FirstClassUpgradeAvailable": false,
// //                     "FirstClassUpgradeUnavailable": false,
// //                     "Amenities": [
// //                         "wifi",
// //                         "power",
// //                         "ife"
// //                     ]
// //                 },
// //                 {
// //                     "Carrier": "AS",
// //                     "FlightNumber": 266,
// //                     "DepartureStation": "SFO",
// //                     "ArrivalStation": "EWR",
// //                     "Duration": "5h 36m",
// //                     "Distance": 2558,
// //                     "DepartureTime": "1:45 pm",
// //                     "ArrivalTime": "10:21 pm",
// //                     "DepartureDay": "Fri, Jun 19",
// //                     "ArrivalDay": "Fri, Jun 19",
// //                     "NextDayArrival": false,
// //                     "NextDayDeparture": true,
// //                     "Performance": [{
// //                         "CanceledPercentage": 45,
// //                         "ChronicallyDelayed": false,
// //                         "EquipmentCode": "73J",
// //                         "EquipmentName": "Boeing 737-900",
// //                         "PercentLate30Plus": 0,
// //                         "PercentOntime": 54,
// //                         "DepartureAirportCode": "SFO",
// //                         "ArrivalAirportCode": "EWR",
// //                         "ChangeOfPlane": false
// //                     }],
// //                     "StopoverInformation": [

// //                     ],
// //                     "Equipment": "73J",
// //                     "FirstClassUpgradeAvailable": false,
// //                     "FirstClassUpgradeUnavailable": false,
// //                     "Amenities": [
// //                         "wifi",
// //                         "power",
// //                         "ife"
// //                     ]
// //                 }
// //             ],
// //             "Fares": {
// //                 "MainCabinFare": {
// //                     "GrandTotal": 566.2,
// //                     "SeatsRemaining": "only 3 left at",
// //                     "MixedCabin": false,
// //                     "Cabins": [

// //                     ],
// //                     "Discount": false,
// //                     "Segments": [

// //                     ],
// //                     "id": "Price_0_0_2_1"
// //                 },
// //                 "SpecialFare": {
// //                     "GrandTotal": 804.2,
// //                     "SeatsRemaining": "only 3 left at",
// //                     "MixedCabin": false,
// //                     "Cabins": [

// //                     ],
// //                     "Discount": false,
// //                     "Segments": [

// //                     ],
// //                     "id": "Price_0_0_3_4"
// //                 },
// //                 "MainCabinSelectFare": {
// //                     "GrandTotal": 387.8,
// //                     "SeatsRemaining": "only 3 left at",
// //                     "MixedCabin": false,
// //                     "Cabins": [

// //                     ],
// //                     "Discount": false,
// //                     "Segments": [

// //                     ],
// //                     "id": "Price_0_4_4_36"
// //                 },
// //                 "MainCabinSelectRefundableFare": {
// //                     "GrandTotal": 875.8,
// //                     "SeatsRemaining": "only 3 left at",
// //                     "MixedCabin": false,
// //                     "Cabins": [

// //                     ],
// //                     "Discount": false,
// //                     "Segments": [

// //                     ],
// //                     "id": "Price_0_4_4_36"
// //                 },
// //                 "FullFlexFare": {
// //                     "GrandTotal": 1184.2,
// //                     "SeatsRemaining": "only 3 left at",
// //                     "MixedCabin": false,
// //                     "Cabins": [

// //                     ],
// //                     "Discount": false,
// //                     "Segments": [

// //                     ],
// //                     "id": "Price_0_0_4_23"
// //                 },
// //                 "FirstClassDealsFare": {
// //                     "GrandTotal": 2775.1,
// //                     "SeatsRemaining": "only 3 left at",
// //                     "MixedCabin": false,
// //                     "Cabins": [

// //                     ],
// //                     "Discount": false,
// //                     "Segments": [

// //                     ],
// //                     "id": "Price_0_11_4_42"
// //                 },
// //                 "GuestPassFare": {
// //                     "GrandTotal": 1184.2,
// //                     "SeatsRemaining": "only 3 left at",
// //                     "MixedCabin": false,
// //                     "Cabins": [

// //                     ],
// //                     "Discount": false,
// //                     "Segments": [

// //                     ],
// //                     "id": "Price_0_0_5_23"
// //                 },
// //                 "SaverFare": {
// //                     "GrandTotal": 26,
// //                     "SeatsRemaining": "only 3 left at",
// //                     "MixedCabin": false,
// //                     "Cabins": [

// //                     ],
// //                     "Discount": false,
// //                     "Segments": [

// //                     ],
// //                     "id": "Price_0_5_5_37"
// //                 }
// //             },
// //             "SeatMapURL": "https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=AS,AS,405,405,SEA,6/18/2020 5:05:00 PM,SFO,6/18/2020 7:18:00 PM,321,133,False$321,SEA,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
// //         }]' guesttype="" index="0"></fs-results-table>
// //         `); const valueTiles = Array.from(testElement.shadowRoot.querySelectorAll('auro-valuetile'));

// //     it('Renders saver value tile', async () => {
// //       await expect(valueTiles.some((tile) => tile.hasAttributes('saver'))).to.be.true;
// //     });

// //     it('Renders main value tile', async () => {
// //       await expect(valueTiles.some((tile) => tile.hasAttributes('main'))).to.be.true;
// //     });

// //     it('Renders first value tile', async () => {
// //       await expect(valueTiles.some((tile) => tile.hasAttributes('first'))).to.be.true;
// //     });
// //   });

//   //   describe('Fare Families map properly', async () => {
//   //     const testElement = await fixture(html`<fs-results-table options='
//   //         [{
//   //             "Duration": "26h 16m",
//   //             "Footnotes": [

//   //             ],
//   //             "Segments": [{
//   //                     "Carrier": "AS",
//   //                     "FlightNumber": 405,
//   //                     "DepartureStation": "SEA",
//   //                     "ArrivalStation": "SFO",
//   //                     "Duration": "2h 13m",
//   //                     "Distance": 678,
//   //                     "DepartureTime": "5:05 pm",
//   //                     "ArrivalTime": "7:18 pm",
//   //                     "DepartureDay": "Thu, Jun 18",
//   //                     "ArrivalDay": "Thu, Jun 18",
//   //                     "NextDayArrival": false,
//   //                     "NextDayDeparture": false,
//   //                     "Performance": [{
//   //                         "CanceledPercentage": 0,
//   //                         "ChronicallyDelayed": false,
//   //                         "EquipmentCode": "321",
//   //                         "EquipmentName": "Airbus A321",
//   //                         "PercentLate30Plus": 0,
//   //                         "PercentOntime": 100,
//   //                         "DepartureAirportCode": "SEA",
//   //                         "ArrivalAirportCode": "SFO",
//   //                         "ChangeOfPlane": false
//   //                     }],
//   //                     "StopoverInformation": [
//   //                         "18h",
//   //                         "27m"
//   //                     ],
//   //                     "Equipment": "321",
//   //                     "FirstClassUpgradeAvailable": false,
//   //                     "FirstClassUpgradeUnavailable": false,
//   //                     "Amenities": [
//   //                         "wifi",
//   //                         "power",
//   //                         "ife"
//   //                     ]
//   //                 },
//   //                 {
//   //                     "Carrier": "AS",
//   //                     "FlightNumber": 266,
//   //                     "DepartureStation": "SFO",
//   //                     "ArrivalStation": "EWR",
//   //                     "Duration": "5h 36m",
//   //                     "Distance": 2558,
//   //                     "DepartureTime": "1:45 pm",
//   //                     "ArrivalTime": "10:21 pm",
//   //                     "DepartureDay": "Fri, Jun 19",
//   //                     "ArrivalDay": "Fri, Jun 19",
//   //                     "NextDayArrival": false,
//   //                     "NextDayDeparture": true,
//   //                     "Performance": [{
//   //                         "CanceledPercentage": 45,
//   //                         "ChronicallyDelayed": false,
//   //                         "EquipmentCode": "73J",
//   //                         "EquipmentName": "Boeing 737-900",
//   //                         "PercentLate30Plus": 0,
//   //                         "PercentOntime": 54,
//   //                         "DepartureAirportCode": "SFO",
//   //                         "ArrivalAirportCode": "EWR",
//   //                         "ChangeOfPlane": false
//   //                     }],
//   //                     "StopoverInformation": [

//   //                     ],
//   //                     "Equipment": "73J",
//   //                     "FirstClassUpgradeAvailable": false,
//   //                     "FirstClassUpgradeUnavailable": false,
//   //                     "Amenities": [
//   //                         "wifi",
//   //                         "power",
//   //                         "ife"
//   //                     ]
//   //                 }
//   //             ],
//   //             "Fares": {
//   //                 "MainCabinSelectFare": {
//   //                     "GrandTotal": 387.8,
//   //                     "SeatsRemaining": "only 3 left at",
//   //                     "MixedCabin": false,
//   //                     "Cabins": [

//   //                     ],
//   //                     "Discount": false,
//   //                     "Segments": [

//   //                     ],
//   //                     "id": "Price_0_4_4_36"
//   //                 },
//   //                 "FirstClassDealsFare": {
//   //                     "GrandTotal": 2775.1,
//   //                     "SeatsRemaining": "only 3 left at",
//   //                     "MixedCabin": false,
//   //                     "Cabins": [

//   //                     ],
//   //                     "Discount": false,
//   //                     "Segments": [

//   //                     ],
//   //                     "id": "Price_0_11_4_42"
//   //                 },
//   //                 "SaverFare": {
//   //                     "GrandTotal": 26,
//   //                     "SeatsRemaining": "only 3 left at",
//   //                     "MixedCabin": false,
//   //                     "Cabins": [

//   //                     ],
//   //                     "Discount": false,
//   //                     "Segments": [

//   //                     ],
//   //                     "id": "Price_0_5_5_37"
//   //                 }
//   //             },
//   //             "SeatMapURL": "https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=AS,AS,405,405,SEA,6/18/2020 5:05:00 PM,SFO,6/18/2020 7:18:00 PM,321,133,False$321,SEA,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
//   //         }]' guesttype="" index="0"></fs-results-table>
//   //         `);

//   // const valueTiles = Array.from(testElement.shadowRoot.querySelectorAll('auro-valuetile'));

//   // it('Saver properties map properly', async () => {
//   //   const actual = valueTiles.find((tile) => tile.id === 'Price_0_5_5_37,1');
//   //   const actualSlots = Array.from(actual.querySelectorAll('span'));
//   //   const actualClassOfService = actualSlots[0].innerText;
//   //   const actualSlotPrice = actualSlots[1].innerText;

//   //   const expected = await fixture(html`
//   //             <auro-valuetile
//   //                 id="Price_0_5_5_37,1"
//   //                 seatsremaining="only 3 left at"
//   //                 price="26"
//   //                 onclick="undefined"
//   //                 saver
//   //                 tabindex="0">
//   //                 <span slot="class-of-service">SAVER</span>
//   //                 <span slot="price">26</span>
//   //             </auro-valuetile>`);
//   //   const expectedSlots = Array.from(expected.querySelectorAll('span'));
//   //   const expectedClassOfService = expectedSlots[0].innerText;
//   //   const expectedPrice = expectedSlots[1].innerText;

//   //   await expect(actualClassOfService).equals(expectedClassOfService);
//   //   await expect(actualSlotPrice).equals(expectedPrice);
//   //   await expect(actual.id).equals(expected.id);
//   //   await expect(actual.seatsRemaining).equals(expected.seatsRemaining);
//   //   await expect(actual.price).equals(expected.price);
//   // });

//   // it('Main properties map properly', async () => {
//   //   const actual = valueTiles.find((tile) => tile.id === 'Price_0_4_4_36,1');
//   //   const actualSlots = Array.from(actual.querySelectorAll('span'));
//   //   const actualClassOfService = actualSlots[0].innerText;
//   //   const actualSlotPrice = actualSlots[1].innerText;

//   //   const expected = await fixture(html`
//   //             <auro-valuetile
//   //                 id="Price_0_4_4_36,1"
//   //                 seatsremaining="only 3 left at"
//   //                 price="387.8"
//   //                 onclick="undefined"
//   //                 main
//   //                 tabindex="0">
//   //                 <span slot="class-of-service">MAIN</span>
//   //                 <span slot="price">388</span>
//   //             </auro-valuetile>`);
//   //   const expectedSlots = Array.from(expected.querySelectorAll('span'));
//   //   const expectedClassOfService = expectedSlots[0].innerText;
//   //   const expectedPrice = expectedSlots[1].innerText;

//   //   await expect(actualClassOfService).equals(expectedClassOfService);
//   //   await expect(actualSlotPrice).equals(expectedPrice);
//   //   await expect(actual.id).equals(expected.id);
//   //   await expect(actual.seatsRemaining).equals(expected.seatsRemaining);
//   //   await expect(actual.price).equals(expected.price);
//   // });

//   // it('First properties map properly', async () => {
//   //   const actual = valueTiles.find((tile) => tile.id === 'Price_0_11_4_42,1');
//   //   const actualSlots = Array.from(actual.querySelectorAll('span'));
//   //   const actualClassOfService = actualSlots[0].innerText;
//   //   const actualSlotPrice = actualSlots[1].innerText;

//   //   const expected = await fixture(html`
//   //             <auro-valuetile
//   //                 id="Price_0_11_4_42,1"
//   //                 seatsremaining="only 3 left at"
//   //                 price="2775.1"
//   //                 onclick="undefined"
//   //                 first
//   //                 tabindex="0">
//   //                 <span slot="class-of-service">FIRST</span>
//   //                 <span slot="price">2776</span>
//   //             </auro-valuetile>`);
//   //   const expectedSlots = Array.from(expected.querySelectorAll('span'));
//   //   const expectedClassOfService = expectedSlots[0].innerText;
//   //   const expectedPrice = expectedSlots[1].innerText;

//   //   await expect(actualClassOfService).equals(expectedClassOfService);
//   //   await expect(actualSlotPrice).equals(expectedPrice);
//   //   await expect(actual.id).equals(expected.id);
//   //   await expect(actual.seatsRemaining).equals(expected.seatsRemaining);
//   //   await expect(actual.price).equals(expected.price);
//   // });
// //   });
// });
