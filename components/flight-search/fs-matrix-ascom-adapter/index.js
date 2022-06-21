import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {ApplicationInsights} from '@microsoft/applicationinsights-web';
import {isIE11} from '../../shared/utility';
import '../fs-results-table';
import '@alaskaairux/auro-alerts';

/**
 * Takes the outModel from the FlightsController and marshalls it into something reasonable
 */
class FSMatrixASComAdapter extends LitElement {
  constructor() {
    super();
    this.airports = {};
    this.airlines = {};
    this.appInsights = new ApplicationInsights({
      config: {
        connectionString:
        'InstrumentationKey=b58ed716-41ca-4827-bf6d-5482bc77887c;IngestionEndpoint=https://westus2-1.in.applicationinsights.azure.com/',
        instrumentationKey: 'b58ed716-41ca-4827-bf6d-5482bc77887c',
        samplingPercentage: 100,
      },
    });
    this.appInsights.loadAppInsights();
    this.notificationType = {
      1: 'information',
      2: 'warning',
      3: 'error',
    };
    this.notificationMessage = {
      [-123]: 'Test notification.',
      [-456]: 'Test notification.',
      [-1230]: 'test 1230',
      [-1580]: 'test 1580',
    };
    // 1200
    // 1300
  }

  static get properties() {
    return {
      guestType: {type: String},
      model: {type: Array},
      advisories: {type: Array},
      minifiedModel: {type: Array, reflect: true},
      index: {type: Number},
    };
  }

  static get styles() {
    return css`
      :host {
        font-size: 16px;
      }
    `;
  }

  async firstUpdated() {
    this.unMarshal();
  }

  guestTypeFormatter(type) {
    switch (type) {
      case 'NONE':
      case 'NoUpgradePreference':
        return 'Default';
      case 'MILEAGEUPG':
        return 'MileagePlanLowestFare';
      case 'MVPUPG':
        return 'MVPLowestFare';
      case 'GOLDUPG':
        return 'MVPRefundableFare';
      case 'GOLD75KUPG':
        return 'MVPRefundableFare';
      case 'GUESTUPG':
        return 'MVPRefundableFare';
      default:
        return 'MVPRefundableFare';
    }
  }

  unMarshal() {
    this.minifiedModel = [];
    this.model.map((leg) => {
      this.minifiedModel.push({
        DepartureStation: leg.DepartureStation.Code,
        ArrivalStation: leg.ArrivalStation.Code,
        Legs: this.formatOptions(leg.Options),
      });
      this.airports[leg.DepartureStation.Code] = {};
      this.airports[leg.ArrivalStation.Code] = {};
    });
    this.guestType = this.guestTypeFormatter(this.guestType);


    // generate list of promises and resolve them all
    const airportPromises = [];
    Object.keys(this.airports).forEach((airport) => {
      if (airport !== 'All Airports') {
        airportPromises.push(fetch('https://www.alaskaair.com/shopping/ETInfo/Airport?iata=' + airport));
      }
    });
    Promise.all(airportPromises).then(async (result) => {
      await result.forEach((res) => {
        res.json().then( (airport) => {
          window.localStorage[airport.code] = JSON.stringify(airport);
        });
      });
    });

    const airlinePromises = [];
    Object.keys(this.airlines).forEach((airline) => {
      airlinePromises.push(fetch('https://www.alaskaair.com/shopping/ETInfo/Airline?iata=' + airline));
    });
    Promise.all(airlinePromises).then(async (result) => {
      await result.forEach((res) => {
        res.json().then((airline) => {
          window.localStorage[airline.code] = JSON.stringify(airline);
        });
      });
    });
  }

  formatSegments(segments, footnotes) {
    const result = [];
    segments.map((segment) => {
      this.airports[segment.DepartureStation.Code] = {};
      this.airports[segment.ArrivalStation.Code] = {};
      this.airlines[segment.DisplayCarrierInfo.Code] = {};
      result.push({
        Carrier: segment.DisplayCarrierInfo.Code,
        FlightNumber: segment.DisplayFlightNumber,
        DepartureStation: segment.DepartureStation.Code,
        ArrivalStation: segment.ArrivalStation.Code,
        Duration: this.formatDuration(segment.Duration),
        Distance: segment.Distance,
        DepartureTime: this.formatDate(segment.DepartureDateTime),
        ArrivalTime: this.formatDate(segment.ArrivalDateTime),
        DepartureDay: this.formatDay(segment.DepartureDateTime),
        ArrivalDay: this.formatDay(segment.ArrivalDateTime),
        NextDayArrival: segment.IsNextDayArrival,
        NextDayDeparture: segment.IsNextDayDeparture,
        Performance: segment.Legs,
        StopoverInformation: this.formatStopoverInformation(segment.StopOverInformation),
        OperationalDisclosures: this.formatOperationalDisclosures(segment, footnotes),
        SubjectToGovernmentApproval: Boolean(segment.SubjectToGovernmentApproval),
        Equipment: segment.Legs[0].EquipmentCode,
        FirstClassUpgradeAvailable: Boolean(
            segment.Upgrades.find(
                (upgrade) =>
                  (upgrade.UpgradeTier == 1 ||
                upgrade.UpgradeTier == 'FirstClass') &&
              (upgrade.Eligible == 2 || upgrade.Eligible == 'Yes') &&
              (upgrade.Available == 2 || upgrade.Available == 'Yes'),
            ),
        ),
        FirstClassUpgradeUnavailable: Boolean(
            segment.Upgrades.find(
                (upgrade) =>
                  (upgrade.UpgradeTier == 1 ||
                upgrade.UpgradeTier == 'FirstClass') &&
              (upgrade.Eligible == 2 || upgrade.Eligible == 'Yes') &&
              (upgrade.Available == 1 || upgrade.Available == 'No'),
            ),
        ),
        Amenities: this.formatAmenities(
            segment.WifiImage,
            segment.InSeatPowerImage,
            segment.InFlightEntertainmentImage,
        ),
      });
    });
    return result;
  }

  formatOperationalDisclosures(segment, footnotes) {
    const test = /\d{3,4}/g;
    const flightNumber = segment.DisplayFlightNumber;
    const returns = [];
    footnotes.forEach((footnote) => {
      const results = footnote.Item1.match(test);
      results.map((result) => {
        if (result == flightNumber) {
          returns.push('Operated by ' + footnote.Item2);
        }
      });
    });
    return returns;
  }

  formatStopoverInformation(str) {
    const test = /([0-9])\w+/g;
    const result = [];
    for (const str of str.matchAll(test)) {
      result.push(str[0]);
    }
    return result;
  }

  formatAmenities(wifi, power, ife) {
    const result = [];
    if (wifi.Path) {
      result.push('wifi');
    }
    if (power.Path) {
      result.push('power');
    }
    if (ife.Path) {
      result.push('ife');
    }
    return result;
  }

  formatFares(option) {
    const result = {};
    result['MainCabinFare'] = this.formatFare(option.BestDealFare);
    result['SpecialFare'] = this.formatFare(option.SpecialFare);
    result['FirstClassUpgradeFare'] = this.formatFare(
        option.FirstClassUpgradeFare,
    );
    result['FirstClassUpgradeRefundableFare'] = this.formatFare(
        option.FirstClassUpgradeRefundableFare,
    );
    result['PremiumClassUpgradeRefundableFare'] = this.formatFare(
        option.PremiumClassUpgradeRefundableFare,
    );
    result['MainCabinSelectFare'] = this.formatFare(option.MainCabinSelectFare);
    result['MainCabinSelectRefundableFare'] = this.formatFare(
        option.MainCabinSelectRefundableFare,
    );
    result['FullFlexFare'] = this.formatFare(option.FullFlexFare);
    result['FirstClassDealsFare'] = this.formatFare(option.FirstClassDealsFare);
    result['FirstClassFare'] = this.formatFare(option.FirstClassFare);
    result['GuestPassFare'] = this.formatFare(option.GuestPassFare);
    result['SaverFare'] = this.formatFare(option.SaverFare);
    return result;
  }

  formatFare(fare) {
    return {
      GrandTotal: fare.GrandTotal,
      SeatsRemaining: fare.SeatsRemaining,
      MixedCabin: fare.MixedCabinImage ? fare.MixedCabinImage.AwardType : false,
      Cabins: this.formatMixedCabinSegments(fare),
      Discount: Boolean(fare.DiscountFareImages.length > 0),
      Segments: this.formatFareSegments(fare),
      OnClick: fare.ModernOnClick,
      id: fare.RadiobuttonID,
    };
  }

  formatFareSegments(fare) {
    const result = [];
    fare.Segments.map((seg) => {
      result.push({
        Carrier: seg.DisplayCarrierInfo.Code,
        FlightNumber: seg.DisplayFlightNumber,
        DepartureStation: seg.DepartureStation.Code,
        ArrivalStation: seg.ArrivalStation.Code,
      });
      this.airports[seg.DepartureStation.Code] = {};
      this.airports[seg.ArrivalStation.Code] = {};
      this.airlines[seg.DisplayCarrierInfo.Code] = {};
    });
    return result;
  }

  formatMixedCabinSegments(fare) {
    const result = [];
    fare.Segments.map((seg) => {
      result.push(seg.Cabin);
    });
    return result;
  }

  formatOptions(options) {
    const result = [];
    options.map((option, idx) => {
      result.push({
        id: idx,
        Duration: this.formatDuration(option.Duration),
        Footnotes: this.formatFootnotes(option.Footnotes),
        Segments: this.formatSegments(option.Segments, option.Footnotes),
        Fares: this.formatFares(option),
        SeatMapURL: option.SeatMapURL,
      });
    });
    return result;
  }

  formatFootnotes(footnotes) {
    const result = [];
    footnotes.map((footnote) => {
      result.push(footnote.Item1 + footnote.Item2);
    });
    return result;
  }

  formatDuration(duration) {
    const dur = duration.split(':');
    if (dur[0].split('.').length > 1) {
      return (
        parseInt(dur[0].split('.')[0]) * 24 +
        parseInt(dur[0].split('.')[1]) +
        'h ' +
        dur[1] +
        'm'
      );
    } else {
      if (dur[0] + 'h' === '00h') {
        return dur[1] + 'm';
      } else if (dur[0][0] === '0') {
        return dur[0][1] + 'h ' + dur[1] + 'm';
      }
      return dur[0] + 'h ' + dur[1] + 'm';
    }
  }

  formatDate(str) {
    const time = str.split('T')[1].split(':');
    let hours = parseInt(time[0]);
    let minutes = parseInt(time[1]);
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }

  formatDay(str) {
    const date = new Date(str);
    const days = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayDate = date.getDate();
    return day + ', ' + month + ' ' + dayDate;
  }

  createRenderRoot() {
    if (isIE11()) {
      /**
       * Render template without shadow DOM for IE. Note that shadow DOM features like
       * encapsulated CSS and slots are unavailable.
       */
      return this;
    }
    return super.createRenderRoot();
  }

  trackEvent(advisoryCode, severity, notificationMessage) {
    this.appInsights.trackTrace({
      name: 'AdvisoryCode',
      properties: {
        code: advisoryCode,
        advisorySeverity: severity,
        message: notificationMessage,
      },
    });
    this.appInsights.flush();
  }

  sortAdvisories() {
    const sortedAdvisories = [];
    if (this.advisories && this.advisories.length > 0) {
      this.advisories.map((advisory) => {
        if (!!this.notificationMessage[advisory.ErrorCodes[0]]) {
          this.trackEvent(advisory.ErrorCodes[0], this.notificationType[advisory.SeverityCode],
              this.notificationMessage[advisory.ErrorCodes[0]]);
        } else {
          this.trackEvent(advisory.ErrorCodes[0], this.notificationType[advisory.SeverityCode], advisory.Text);
        }
        const notificationType = this.notificationType[advisory.SeverityCode];
        const matrixIndex = advisory.AssociatedMatrixIndex;
        if (sortedAdvisories[matrixIndex] && sortedAdvisories[matrixIndex][notificationType]) {
          sortedAdvisories[matrixIndex][notificationType].push(`<p>${advisory.Text}</p>`);
        } else if (sortedAdvisories[matrixIndex]) {
          sortedAdvisories[matrixIndex][notificationType] = [];
          sortedAdvisories[matrixIndex][notificationType].push(`<p>${advisory.Text}</p>`);
        } else {
          sortedAdvisories[matrixIndex] = {};
          sortedAdvisories[matrixIndex][notificationType] = [];
          sortedAdvisories[matrixIndex][notificationType].push(`<p>${advisory.Text}</p>`);
        }
      });
    }
    return sortedAdvisories;
  }

  createAuroAlerts() {
    const advisoriesByMatrixIndex = this.sortAdvisories();
    const advisoryNodes = advisoriesByMatrixIndex.map((matrixIndex, idx) =>
      Object.keys(matrixIndex).map((msgType) => {
        const auroAlert = document.createElement('auro-alerts');
        auroAlert.setAttribute(msgType, true);
        auroAlert.innerHTML = matrixIndex[msgType];
        return auroAlert;
      }));

    return advisoryNodes;
  }

  getAuroAlerts() {
    const auroAlerts = this.createAuroAlerts();
    if (auroAlerts.length > 0 && this.minifiedModel) {
      return this.minifiedModel.map((leg, idx) => {
        return html`${auroAlerts[idx] ? auroAlerts[idx] : ''}`;
      });
    }
  }

  getMatrixResults() {
    if (this.minifiedModel) {
      return this.minifiedModel.map((leg, idx) => {
        if (this.index === idx) {
          return html`<fs-results-table options=${JSON.stringify(leg.Legs)} guestType=${this.guestType} index=${idx}>
          </fs-results-table>`;
        } else {
          return html`${this.index} === ${idx}`;
        }
      });
    }
  }

  render() {
    return html`
      ${isIE11() ?
        html`<style>
            ${unsafeCSS(this.styles)}
          </style>` :
        ``}
      <div>
        ${this.getAuroAlerts()}
        ${this.getMatrixResults()}
      </div>
      `;
  }
}

if (!customElements.get('fs-matrix-ascom-adapter')) {
  customElements.define('fs-matrix-ascom-adapter', FSMatrixASComAdapter);
}
