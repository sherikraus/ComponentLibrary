import {html} from '@open-wc/testing';

export const jsonBlob = html`
<fs-matrix-results options='
[
{
"Duration":"26h 16m",
"Footnotes":[
 
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":405,
    "DepartureStation":"SEA",
    "ArrivalStation":"SFO",
    "Duration":"2h 13m",
    "Distance":678,
    "DepartureTime":"5:05 pm",
    "ArrivalTime":"7:18 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"321",
          "EquipmentName":"Airbus A321",
          "PercentLate30Plus":0,
          "PercentOntime":100,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "18h",
       "27m"
    ],
    "Equipment":"321",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":566.2,
    "SeatsRemaining":"",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_0_2_1"
 },
 "SpecialFare":{
    "GrandTotal":804.2,
    "SeatsRemaining":"",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_0_3_4"
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1184.2,
    "SeatsRemaining":"",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_0_4_23"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1184.2,
    "SeatsRemaining":"",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_0_5_23"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=AS,AS,405,405,SEA,6/18/2020 5:05:00 PM,SFO,6/18/2020 7:18:00 PM,321,133,False$321,SEA,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"23h 26m",
"Footnotes":[
 
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":742,
    "DepartureStation":"SEA",
    "ArrivalStation":"SFO",
    "Duration":"2h 13m",
    "Distance":678,
    "DepartureTime":"7:55 pm",
    "ArrivalTime":"10:08 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"320",
          "EquipmentName":"Airbus A320",
          "PercentLate30Plus":0,
          "PercentOntime":100,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "15h",
       "37m"
    ],
    "Equipment":"320",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":566.2,
    "SeatsRemaining":"",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_1_2_0"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1184.2,
    "SeatsRemaining":"",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_1_4_22"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1184.2,
    "SeatsRemaining":"",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_1_5_22"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=AS,AS,742,742,SEA,6/18/2020 7:55:00 PM,SFO,6/18/2020 10:08:00 PM,320,133,False$320,SEA,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"26h 21m",
"Footnotes":[
 "Flights 2951 and 2309 are operated by Horizon Air as AlaskaHorizon"
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":2951,
    "DepartureStation":"SEA",
    "ArrivalStation":"PDX",
    "Duration":"56m",
    "Distance":129,
    "DepartureTime":"5:00 pm",
    "ArrivalTime":"5:56 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"DH4",
          "EquipmentName":"Bombardier Q400",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"PDX",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "13h",
       "4m"
    ],
    "Equipment":"DH4",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":2309,
    "DepartureStation":"PDX",
    "ArrivalStation":"SFO",
    "Duration":"1h 50m",
    "Distance":550,
    "DepartureTime":"7:00 am",
    "ArrivalTime":"8:50 am",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"PDX",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "4h",
       "55m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":1102.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_2_2_13"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1537.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_2_4_32"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1537.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_2_5_32"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=QX,AS,2951,2951,SEA,6/18/2020 5:00:00 PM,PDX,6/18/2020 5:56:00 PM,DH4,56,False$DH4,SEA,PDX,False|QX,AS,2309,2309,PDX,6/19/2020 7:00:00 AM,SFO,6/19/2020 8:50:00 AM,E75,110,False$E75,PDX,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"26h 21m",
"Footnotes":[
 "Flight 2951 is operated by Horizon Air as AlaskaHorizon",
 "Flight 3354 is operated by SkyWest Airlines as AlaskaSkyWest"
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":2951,
    "DepartureStation":"SEA",
    "ArrivalStation":"PDX",
    "Duration":"56m",
    "Distance":129,
    "DepartureTime":"5:00 pm",
    "ArrivalTime":"5:56 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"DH4",
          "EquipmentName":"Bombardier Q400",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"PDX",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "15h",
       "34m"
    ],
    "Equipment":"DH4",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":3354,
    "DepartureStation":"PDX",
    "ArrivalStation":"SFO",
    "Duration":"1h 50m",
    "Distance":550,
    "DepartureTime":"9:30 am",
    "ArrivalTime":"11:20 am",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"PDX",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "2h",
       "25m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":1150.1,
    "SeatsRemaining":"only 3 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_3_2_18"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1775.1,
    "SeatsRemaining":"only 3 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_3_4_40"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1775.1,
    "SeatsRemaining":"only 3 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_3_5_40"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=QX,AS,2951,2951,SEA,6/18/2020 5:00:00 PM,PDX,6/18/2020 5:56:00 PM,DH4,56,False$DH4,SEA,PDX,False|OO,AS,3354,3354,PDX,6/19/2020 9:30:00 AM,SFO,6/19/2020 11:20:00 AM,E75,110,False$E75,PDX,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"26h 11m",
"Footnotes":[
 "Flight 3465 is operated by SkyWest Airlines as AlaskaSkyWest"
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":1094,
    "DepartureStation":"SEA",
    "ArrivalStation":"LAX",
    "Duration":"2h 45m",
    "Distance":954,
    "DepartureTime":"5:10 pm",
    "ArrivalTime":"7:55 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"321",
          "EquipmentName":"Airbus A321",
          "PercentLate30Plus":0,
          "PercentOntime":100,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"LAX",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "11h",
       "5m"
    ],
    "Equipment":"321",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":3465,
    "DepartureStation":"LAX",
    "ArrivalStation":"SFO",
    "Duration":"1h 30m",
    "Distance":337,
    "DepartureTime":"7:00 am",
    "ArrivalTime":"8:30 am",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"LAX",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "5h",
       "15m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":959.8,
    "SeatsRemaining":"",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_4_2_9"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1587.8,
    "SeatsRemaining":"",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_4_4_36"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1587.8,
    "SeatsRemaining":"",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_4_5_36"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=AS,AS,1094,1094,SEA,6/18/2020 5:10:00 PM,LAX,6/18/2020 7:55:00 PM,321,165,False$321,SEA,LAX,False|OO,AS,3465,3465,LAX,6/19/2020 7:00:00 AM,SFO,6/19/2020 8:30:00 AM,E75,90,False$E75,LAX,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"26h 11m",
"Footnotes":[
 "Flight 3467 is operated by SkyWest Airlines as AlaskaSkyWest"
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":1094,
    "DepartureStation":"SEA",
    "ArrivalStation":"LAX",
    "Duration":"2h 45m",
    "Distance":954,
    "DepartureTime":"5:10 pm",
    "ArrivalTime":"7:55 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"321",
          "EquipmentName":"Airbus A321",
          "PercentLate30Plus":0,
          "PercentOntime":100,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"LAX",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "14h",
       "15m"
    ],
    "Equipment":"321",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":3467,
    "DepartureStation":"LAX",
    "ArrivalStation":"SFO",
    "Duration":"1h 30m",
    "Distance":337,
    "DepartureTime":"10:10 am",
    "ArrivalTime":"11:40 am",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":19,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":80,
          "DepartureAirportCode":"LAX",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "2h",
       "5m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":954.2,
    "SeatsRemaining":"only 3 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_5_2_7"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1611.1,
    "SeatsRemaining":"only 5 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_5_4_37"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1611.1,
    "SeatsRemaining":"only 5 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_5_5_37"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=AS,AS,1094,1094,SEA,6/18/2020 5:10:00 PM,LAX,6/18/2020 7:55:00 PM,321,165,False$321,SEA,LAX,False|OO,AS,3467,3467,LAX,6/19/2020 10:10:00 AM,SFO,6/19/2020 11:40:00 AM,E75,90,False$E75,LAX,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"26h 11m",
"Footnotes":[
 "Flight 3372 is operated by SkyWest Airlines as AlaskaSkyWest"
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":1094,
    "DepartureStation":"SEA",
    "ArrivalStation":"LAX",
    "Duration":"2h 45m",
    "Distance":954,
    "DepartureTime":"5:10 pm",
    "ArrivalTime":"7:55 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"321",
          "EquipmentName":"Airbus A321",
          "PercentLate30Plus":0,
          "PercentOntime":100,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"LAX",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "15h",
       "20m"
    ],
    "Equipment":"321",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":3372,
    "DepartureStation":"LAX",
    "ArrivalStation":"SFO",
    "Duration":"1h 30m",
    "Distance":337,
    "DepartureTime":"11:15 am",
    "ArrivalTime":"12:45 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":100,
          "DepartureAirportCode":"LAX",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "1h",
       "0m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":954.2,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_6_2_6"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1611.1,
    "SeatsRemaining":"only 3 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_6_4_38"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1611.1,
    "SeatsRemaining":"only 3 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_6_5_38"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=AS,AS,1094,1094,SEA,6/18/2020 5:10:00 PM,LAX,6/18/2020 7:55:00 PM,321,165,False$321,SEA,LAX,False|OO,AS,3372,3372,LAX,6/19/2020 11:15:00 AM,SFO,6/19/2020 12:45:00 PM,E75,90,False$E75,LAX,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"25h 21m",
"Footnotes":[
 "Flights 2502 and 2309 are operated by Horizon Air as AlaskaHorizon"
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":2502,
    "DepartureStation":"SEA",
    "ArrivalStation":"PDX",
    "Duration":"56m",
    "Distance":129,
    "DepartureTime":"6:00 pm",
    "ArrivalTime":"6:56 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":100,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"PDX",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "12h",
       "4m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":2309,
    "DepartureStation":"PDX",
    "ArrivalStation":"SFO",
    "Duration":"1h 50m",
    "Distance":550,
    "DepartureTime":"7:00 am",
    "ArrivalTime":"8:50 am",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"PDX",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "4h",
       "55m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":1102.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_7_2_15"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1537.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_7_4_33"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1537.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_7_5_33"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=QX,AS,2502,2502,SEA,6/18/2020 6:00:00 PM,PDX,6/18/2020 6:56:00 PM,E75,56,False$E75,SEA,PDX,False|QX,AS,2309,2309,PDX,6/19/2020 7:00:00 AM,SFO,6/19/2020 8:50:00 AM,E75,110,False$E75,PDX,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"25h 21m",
"Footnotes":[
 "Flight 2502 is operated by Horizon Air as AlaskaHorizon",
 "Flight 3354 is operated by SkyWest Airlines as AlaskaSkyWest"
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":2502,
    "DepartureStation":"SEA",
    "ArrivalStation":"PDX",
    "Duration":"56m",
    "Distance":129,
    "DepartureTime":"6:00 pm",
    "ArrivalTime":"6:56 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":100,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"PDX",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "14h",
       "34m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":3354,
    "DepartureStation":"PDX",
    "ArrivalStation":"SFO",
    "Duration":"1h 50m",
    "Distance":550,
    "DepartureTime":"9:30 am",
    "ArrivalTime":"11:20 am",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"PDX",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "2h",
       "25m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":1391,
    "SeatsRemaining":"only 3 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_8_2_30"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1826,
    "SeatsRemaining":"only 3 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_8_4_43"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1826,
    "SeatsRemaining":"only 3 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_8_5_43"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=QX,AS,2502,2502,SEA,6/18/2020 6:00:00 PM,PDX,6/18/2020 6:56:00 PM,E75,56,False$E75,SEA,PDX,False|OO,AS,3354,3354,PDX,6/19/2020 9:30:00 AM,SFO,6/19/2020 11:20:00 AM,E75,110,False$E75,PDX,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"24h 51m",
"Footnotes":[
 "Flights 2549 and 2309 are operated by Horizon Air as AlaskaHorizon"
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":2549,
    "DepartureStation":"SEA",
    "ArrivalStation":"PDX",
    "Duration":"56m",
    "Distance":129,
    "DepartureTime":"6:30 pm",
    "ArrivalTime":"7:26 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":50,
          "ChronicallyDelayed":false,
          "EquipmentCode":"DH4",
          "EquipmentName":"Bombardier Q400",
          "PercentLate30Plus":0,
          "PercentOntime":50,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"PDX",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "11h",
       "34m"
    ],
    "Equipment":"DH4",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":2309,
    "DepartureStation":"PDX",
    "ArrivalStation":"SFO",
    "Duration":"1h 50m",
    "Distance":550,
    "DepartureTime":"7:00 am",
    "ArrivalTime":"8:50 am",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"PDX",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "4h",
       "55m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":1102.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_9_2_14"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1537.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_9_4_35"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1537.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_9_5_35"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=QX,AS,2549,2549,SEA,6/18/2020 6:30:00 PM,PDX,6/18/2020 7:26:00 PM,DH4,56,False$DH4,SEA,PDX,False|QX,AS,2309,2309,PDX,6/19/2020 7:00:00 AM,SFO,6/19/2020 8:50:00 AM,E75,110,False$E75,PDX,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"24h 51m",
"Footnotes":[
 "Flights 2898 and 2520 are operated by Horizon Air as AlaskaHorizon"
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":2898,
    "DepartureStation":"SEA",
    "ArrivalStation":"GEG",
    "Duration":"1h 06m",
    "Distance":222,
    "DepartureTime":"6:30 pm",
    "ArrivalTime":"7:36 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":100,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"GEG",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "11h",
       "29m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":2520,
    "DepartureStation":"GEG",
    "ArrivalStation":"SFO",
    "Duration":"2h 15m",
    "Distance":732,
    "DepartureTime":"7:05 am",
    "ArrivalTime":"9:20 am",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"GEG",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "4h",
       "25m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":591.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_10_2_2"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1437.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_10_4_31"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1437.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_10_5_31"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=QX,AS,2898,2898,SEA,6/18/2020 6:30:00 PM,GEG,6/18/2020 7:36:00 PM,E75,66,False$E75,SEA,GEG,False|QX,AS,2520,2520,GEG,6/19/2020 7:05:00 AM,SFO,6/19/2020 9:20:00 AM,E75,135,False$E75,GEG,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"24h 51m",
"Footnotes":[
 "Flight 2549 is operated by Horizon Air as AlaskaHorizon",
 "Flight 3354 is operated by SkyWest Airlines as AlaskaSkyWest"
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":2549,
    "DepartureStation":"SEA",
    "ArrivalStation":"PDX",
    "Duration":"56m",
    "Distance":129,
    "DepartureTime":"6:30 pm",
    "ArrivalTime":"7:26 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":50,
          "ChronicallyDelayed":false,
          "EquipmentCode":"DH4",
          "EquipmentName":"Bombardier Q400",
          "PercentLate30Plus":0,
          "PercentOntime":50,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"PDX",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "14h",
       "4m"
    ],
    "Equipment":"DH4",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":3354,
    "DepartureStation":"PDX",
    "ArrivalStation":"SFO",
    "Duration":"1h 50m",
    "Distance":550,
    "DepartureTime":"9:30 am",
    "ArrivalTime":"11:20 am",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"PDX",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "2h",
       "25m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":1115.1,
    "SeatsRemaining":"only 2 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_11_2_17"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1775.1,
    "SeatsRemaining":"only 3 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_11_4_42"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1775.1,
    "SeatsRemaining":"only 3 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_11_5_42"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=QX,AS,2549,2549,SEA,6/18/2020 6:30:00 PM,PDX,6/18/2020 7:26:00 PM,DH4,56,False$DH4,SEA,PDX,False|OO,AS,3354,3354,PDX,6/19/2020 9:30:00 AM,SFO,6/19/2020 11:20:00 AM,E75,110,False$E75,PDX,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"24h 06m",
"Footnotes":[
 "Flights 3363 and 3380 are operated by SkyWest Airlines as AlaskaSkyWest"
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":3363,
    "DepartureStation":"SEA",
    "ArrivalStation":"SAN",
    "Duration":"2h 51m",
    "Distance":1051,
    "DepartureTime":"7:15 pm",
    "ArrivalTime":"10:06 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"SAN",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "8h",
       "54m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":3380,
    "DepartureStation":"SAN",
    "ArrivalStation":"SFO",
    "Duration":"1h 50m",
    "Distance":447,
    "DepartureTime":"7:00 am",
    "ArrivalTime":"8:50 am",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"SAN",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "4h",
       "55m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":1245.7,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_12_2_27"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1707.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_12_4_39"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1707.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_12_5_39"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=OO,AS,3363,3363,SEA,6/18/2020 7:15:00 PM,SAN,6/18/2020 10:06:00 PM,E75,171,False$E75,SEA,SAN,False|OO,AS,3380,3380,SAN,6/19/2020 7:00:00 AM,SFO,6/19/2020 8:50:00 AM,E75,110,False$E75,SAN,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"23h 51m",
"Footnotes":[
 "Flights 2441 and 2309 are operated by Horizon Air as AlaskaHorizon"
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":2441,
    "DepartureStation":"SEA",
    "ArrivalStation":"PDX",
    "Duration":"56m",
    "Distance":129,
    "DepartureTime":"7:30 pm",
    "ArrivalTime":"8:26 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":5,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":94,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"PDX",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "10h",
       "34m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":2309,
    "DepartureStation":"PDX",
    "ArrivalStation":"SFO",
    "Duration":"1h 50m",
    "Distance":550,
    "DepartureTime":"7:00 am",
    "ArrivalTime":"8:50 am",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"PDX",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "4h",
       "55m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":1102.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_13_2_16"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1537.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_13_4_34"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1537.8,
    "SeatsRemaining":"only 1 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_13_5_34"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=QX,AS,2441,2441,SEA,6/18/2020 7:30:00 PM,PDX,6/18/2020 8:26:00 PM,E75,56,False$E75,SEA,PDX,False|QX,AS,2309,2309,PDX,6/19/2020 7:00:00 AM,SFO,6/19/2020 8:50:00 AM,E75,110,False$E75,PDX,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
},
{
"Duration":"23h 51m",
"Footnotes":[
 "Flight 2441 is operated by Horizon Air as AlaskaHorizon",
 "Flight 3354 is operated by SkyWest Airlines as AlaskaSkyWest"
],
"Segments":[
 {
    "Carrier":"AS",
    "FlightNumber":2441,
    "DepartureStation":"SEA",
    "ArrivalStation":"PDX",
    "Duration":"56m",
    "Distance":129,
    "DepartureTime":"7:30 pm",
    "ArrivalTime":"8:26 pm",
    "DepartureDay":"Thu, Jun 18",
    "ArrivalDay":"Thu, Jun 18",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":5,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":94,
          "DepartureAirportCode":"SEA",
          "ArrivalAirportCode":"PDX",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "13h",
       "4m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":3354,
    "DepartureStation":"PDX",
    "ArrivalStation":"SFO",
    "Duration":"1h 50m",
    "Distance":550,
    "DepartureTime":"9:30 am",
    "ArrivalTime":"11:20 am",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":true,
    "Performance":[
       {
          "CanceledPercentage":0,
          "ChronicallyDelayed":false,
          "EquipmentCode":"E75",
          "EquipmentName":"Embraer E175",
          "PercentLate30Plus":0,
          "PercentOntime":0,
          "DepartureAirportCode":"PDX",
          "ArrivalAirportCode":"SFO",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       "2h",
       "25m"
    ],
    "Equipment":"E75",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 },
 {
    "Carrier":"AS",
    "FlightNumber":266,
    "DepartureStation":"SFO",
    "ArrivalStation":"EWR",
    "Duration":"5h 36m",
    "Distance":2558,
    "DepartureTime":"1:45 pm",
    "ArrivalTime":"10:21 pm",
    "DepartureDay":"Fri, Jun 19",
    "ArrivalDay":"Fri, Jun 19",
    "NextDayArrival":false,
    "NextDayDeparture":false,
    "Performance":[
       {
          "CanceledPercentage":45,
          "ChronicallyDelayed":false,
          "EquipmentCode":"73J",
          "EquipmentName":"Boeing 737-900",
          "PercentLate30Plus":0,
          "PercentOntime":54,
          "DepartureAirportCode":"SFO",
          "ArrivalAirportCode":"EWR",
          "ChangeOfPlane":false
       }
    ],
    "StopoverInformation":[
       
    ],
    "Equipment":"73J",
    "FirstClassUpgradeAvailable":false,
    "FirstClassUpgradeUnavailable":false,
    "Amenities":[
       "wifi",
       "power",
       "ife"
    ]
 }
],
"Fares":{
 "MainCabinFare":{
    "GrandTotal":1150.1,
    "SeatsRemaining":"only 2 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_14_2_19"
 },
 "SpecialFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "PremiumClassUpgradeRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "MainCabinSelectRefundableFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FullFlexFare":{
    "GrandTotal":1775.1,
    "SeatsRemaining":"only 3 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_14_4_41"
 },
 "FirstClassDealsFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "FirstClassFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 },
 "GuestPassFare":{
    "GrandTotal":1775.1,
    "SeatsRemaining":"only 3 left at",
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":"Price_0_14_5_41"
 },
 "SaverFare":{
    "GrandTotal":0,
    "SeatsRemaining":null,
    "MixedCabin":false,
    "Cabins":[
       
    ],
    "Discount":false,
    "Segments":[
       
    ],
    "id":""
 }
},
"SeatMapURL":"https://www.alaskaair.com/shopping/viewseats/seatmap?u=f&segs=QX,AS,2441,2441,SEA,6/18/2020 7:30:00 PM,PDX,6/18/2020 8:26:00 PM,E75,56,False$E75,SEA,PDX,False|OO,AS,3354,3354,PDX,6/19/2020 9:30:00 AM,SFO,6/19/2020 11:20:00 AM,E75,110,False$E75,PDX,SFO,False|AS,AS,266,266,SFO,6/19/2020 1:45:00 PM,EWR,6/19/2020 10:21:00 PM,73J,336,False$73J,SFO,EWR,False|"
}
]' > 
<auro-dialog></auro-dialog>


</fs-matrix-results>
`;


