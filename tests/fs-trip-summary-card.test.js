/* import {fixture, expect, html} from '@open-wc/testing';
import '../components/flight-search/fs-trip-summary-card/index.js';
const el = await fixture(html`<fs-trip-summary-card origin="SEA" destination="LAX" index="0" option='{
    "id": 0,
    "type": "matrix",
    "Duration": 170,
    "daysChanged": 0,
    "Footnotes": [],
    "UpgradeInfo": null,
    "Segments": [
        {
            "Carrier": "AS",
            "OperatingCarrier": "AS",
            "FlightNumber": "404",
            "OperatingFlightNumber": "404",
            "DepartureStation": "SEA",
            "ArrivalStation": "LAX",
            "Duration": "2h 50m",
            "DepartureTime": "6:00 am",
            "ArrivalTime": "8:50 am",
            "DepartureDayFormatted": "Mon, Aug 30",
            "ArrivalDayFormatted": "Mon, Aug 30",
            "DepartureDay": "2021-08-30",
            "ArrivalDay": "2021-08-30",
            "NextDayArrival": false,
            "NextDayDeparture": false,
            "Performance": [],
            "StopoverInformation": "0m",
            "StopoverDuration": 0,
            "OperationalDisclosures": [],
            "SubjectToGovernmentApproval": false,
            "Equipment": "73J",
            "FirstClassUpgradeAvailable": false,
            "FirstClassUpgradeUnavailable": false,
            "Amenities": [
                "Entertainment on demand",
                "In-seat power source",
                "Wi-Fi"
            ],
            "FirstAmenities": []
        }
    ],
    "Fares": {
        "MainCabinFare": {
            "SeatsRemaining": 0,
            "GrandTotal": 0,
            "OnClick": null,
            "MixedCabin": false,
            "Discount": false
        },
        "SpecialFare": {
            "SeatsRemaining": 0,
            "GrandTotal": 0,
            "OnClick": null,
            "MixedCabin": null,
            "Discount": false
        },
        "FirstClassUpgradeFare": {
            "GrandTotal": 298.4,
            "SeatsRemaining": "",
            "Discount": false,
            "MixedCabin": null,
            "Cabins": null,
            "details": [
                {
                    "Code": "MH4OASMN",
                    "FareSegs": [
                        {
                            "BookingCode": "M",
                            "CabinCode": "C",
                            "SegRef": {
                                "SegIdx": 0,
                                "SliceIdx": 0
                            },
                            "Upgrades": {
                                "Applicable": true,
                                "Available": "",
                                "Eligible": "Gold75k,Gold75kPc"
                            }
                        }
                    ],
                    "R1FareType": "",
                    "RulesKey": ""
                }
            ]
        },
        "FirstClassUpgradeRefundableFare": {
            "SeatsRemaining": 0,
            "GrandTotal": 0,
            "OnClick": null,
            "MixedCabin": null,
            "Discount": false
        },
        "PremiumClassUpgradeRefundableFare": {
            "SeatsRemaining": 0,
            "GrandTotal": 0,
            "OnClick": null,
            "MixedCabin": null,
            "Discount": false
        },
        "PremiumClassUpgradeFare": {
            "GrandTotal": 98.4,
            "SeatsRemaining": "",
            "Discount": false,
            "MixedCabin": null,
            "Cabins": null
        },
        "MainCabinSelectFare": {
            "GrandTotal": 98.4,
            "SeatsRemaining": "",
            "Discount": false,
            "MixedCabin": null,
            "Cabins": null
        },
        "MainCabinSelectRefundableFare": {
            "SeatsRemaining": 0,
            "GrandTotal": 0,
            "OnClick": null,
            "MixedCabin": null,
            "Discount": false
        },
        "FullFlexFare": {
            "GrandTotal": 337.41,
            "SeatsRemaining": "",
            "Discount": false,
            "MixedCabin": null,
            "Cabins": null
        },
        "FirstClassDealsFare": {
            "GrandTotal": 249,
            "SeatsRemaining": "",
            "Discount": false,
            "MixedCabin": null,
            "Cabins": null
        },
        "FirstClassFare": {
            "GrandTotal": 489,
            "SeatsRemaining": "",
            "Discount": false,
            "MixedCabin": null,
            "Cabins": null
        },
        "GuestPassFare": {
            "SeatsRemaining": 0,
            "GrandTotal": 0,
            "OnClick": null,
            "MixedCabin": null,
            "Discount": false
        },
        "SaverFare": {
            "GrandTotal": 68.4,
            "SeatsRemaining": "",
            "Discount": false,
            "MixedCabin": null,
            "Cabins": null
        },
        "undefined": {
            "GrandTotal": 599,
            "SeatsRemaining": "",
            "Discount": false,
            "MixedCabin": null,
            "Cabins": null
        }
    },
    "SeatMapURL": "https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=AS,AS,404,404,SEA,2021-08-30 06:00,LAX,2021-08-30 08:50,73J,170,False,|",
    "key": "AS404:SEA:LAX:2021-08-30:2021-08-30"
}'>
    <slot name="price">338</slot>
    <span slot="miles">50k miles</span>
    <span slot="class-of-service">MAIN</span>
</fs-trip-summary-card>`);

describe('fs-trip-summary-card Station Cell', function() {
  it('should be accessible', () => {
    expect(el).to.be.accessible();
  });
  const origin = 'SEA';
  const destination = 'LAX';
  const departureDate = 'Monday, August 30th';

  //   it('should have a flight number label', async () => {
  //     const actualLabel = await el.shadowRoot.querySelector('.station-cell .flight-count').innerText.trim();
  //     expect(actualLabel).to.equal('Flight 1');
  //   });

  it('should have a city pair', async () => {
    const airportHelperNodes = await Array.from(el.shadowRoot.querySelectorAll('airport-helper'));
    const actualOrigin = await airportHelperNodes[0].iata;
    const actualDestination = await airportHelperNodes[1].iata;
    expect(actualOrigin).equals(origin);
    expect(actualDestination).equals(destination);
  });

  it('should have a date', async () => {
    const formattedDate = el.shadowRoot.querySelector('.departure-date').innerText.trim();
    expect(formattedDate).to.equal(departureDate);
  });
});

describe('fs-trip-summary-card Flight Info Cell', function() {
  it('sanity check that fs-matrix-flight-result component is rendering its information', async () => {
    const flightNumb = el.shadowRoot.querySelector('fs-matrix-flight-result')
        .shadowRoot.querySelector('auro-flight').shadowRoot.querySelector('auro-flight-header')
        .shadowRoot.querySelector('.flight').innerText.trim();
    expect(flightNumb).to.equal('AS 404');
  });
});

describe('fs-trip-summary-card Price Info Cell', function() {
  it('should show the price', async () => {
    const price = await el.querySelector('slot[name="price"]').innerText.trim();
    expect(parseInt(price)).equals(338);
  });

  it('should show the miles', async () => {
    const miles = await el.querySelector('span[slot="miles"]').innerText.trim();
    expect(miles).equals('50k miles');
  });

  it('shows should show the class of service', async () => {
    const classOfService = await el.querySelector('span[slot="class-of-service"]').innerText.trim();
    expect(classOfService).equals('MAIN');
  });
});
*/
