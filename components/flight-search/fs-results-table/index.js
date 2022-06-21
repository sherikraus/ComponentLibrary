/* eslint-disable new-cap */
import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {isIE11} from '../../shared/utility';
import '../../flight-results/fs-matrix-faretype-cell';
import '../fs-matrix-price-cell';
import '../../flight-results/fs-matrix-flight-result';
import '../../flight-search/fs-trip-summary-card';
import '../../generics/expand-results';
import '../../generics/import-auro-components';
import '../modals/fs-modal-compare-fares';
import '../../merchandising/saver-upsell-dialog';
import '../../generics/legend';
import '@aurolabs/auro-valuetile';
import '../../generics/ch-accordion';
import styles from './styles-css';

// Import Icons
import chevronDown from '@alaskaairux/icons/dist/icons/interface/chevron-down_es6.js';

export class FSResultsTable extends LitElement {
  constructor() {
    super();
    this.saverUpsellShown = false;
  }

  // selectedTableIndex = the index of the matrix table itself
  // 1 for ow, 2 for r/t, up to 4 for mc
  // selectedFare is the index of the price cell selected by the guest
  static get properties() {
    return {
      guestType: {type: String, reflect: true},
      options: {type: Array},
      selectedTableIndex: {type: Number, reflect: true},
      selectedFare: {type: Number, reflect: true},
      index: {type: Number},
      beta: {type: Boolean},
      badge: {type: String},
      expanded: {type: Boolean, reflect: true},
      arrivalStation: {type: String},
      departureStation: {type: String},
      departureDate: {type: String},
      tileIsFocused: {type: Boolean},
      accordionExpanded: {type: Boolean, reflect: true},
      saverUpsellShown: {type: Boolean},
      selectedFlights: {type: Array},
    };
  }

  static get styles() {
    return css`
      ${styles}
    `;
  }

  getOrdinalNum(n) {
    return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
  }

  firstUpdated() {
    let showResults = false;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];

    if (this.options.length > 0 ) {
      const depDay = new Date(this.options[0].Segments[0].DepartureDay);
      this.departureDate =
      `${days[depDay.getDay()]}, ${month[depDay.getMonth()]} ${this.getOrdinalNum(depDay.getDay())}`;
    }
    const tableRef = this;
    const btnExpandResults = this.shadowRoot.querySelector('expand-results') ?? null;
    const tbody = tableRef.shadowRoot.querySelector('.resultsTable').querySelector('tbody');

    document.addEventListener('saverAccept', (evt) => {
      this.selectedFare = parseInt(this.selectedFare) + 1;
      const rows = this.shadowRoot.querySelectorAll('tr.matrixRow');
      rows.forEach((row) => {
        const cells = row.querySelectorAll('auro-valuetile');
        cells.forEach((cell) => {
          if (cell.getAttribute('id') !== this.selectedTableIndex + ',' + this.selectedFare) {
            cell.removeAttribute('focused');
            cell.removeAttribute('selected');
          } else {
            cell.setAttribute('selected', true);
          }
        });
      });

      const newFare = this.processFareSelection();

      if (newFare.length != 0) {
        // Listened for in 1 place: Search.svelte, which takes the detail data and modifies the selectedFlights array.
        this.dispatchEvent(new CustomEvent('addSliceDataToArrSelectedFlights', {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: {
            indexOfSelectedSlice: this.index,
            processedFareSelection: newFare,
          },
        }));
      }
    });

    // handles price cell clicks
    this.shadowRoot.addEventListener('fareClick', (evt) => {
      if (evt.target && evt.target.selected) {
        // Fare is being selected
        this.selectedTableIndex = evt.target.getAttribute('id').split(',')[0];
        this.selectedFare = evt.target.getAttribute('id').split(',')[1];
      } else {
        // Fare is being deselected
        this.selectedTableIndex = undefined;
        this.selectedFare = undefined;
        // Reshow all matrix rows
        Array.from(tbody.rows).forEach((row) => row.removeAttribute('style'));
        // If user selected a fare from expanded results, hide it too by clicking expand-results
        if (showResults === true) btnExpandResults.shadowRoot.querySelector('auro-button').click();
      }
    });

    btnExpandResults.addEventListener('click', function(event) {
      // If the clicked element doesn't have the right selector, bail
      if (!event.target.tagName === 'AURO-BUTTON' || !event.target.tagName === 'EXPAND-RESULTS') {
        return;
      } else {
        showResults = showResults ? false : true;
        // eslint-disable-next-line
        const initiallyHiddenRows = tableRef.shadowRoot.querySelector('.resultsTable').querySelector('tbody').querySelectorAll('.initially-hidden-row');

        if ( showResults === true ) {
          initiallyHiddenRows.forEach( (row) => {
            row.classList.remove('hidden');
          });
        } else if ( showResults === false ) {
          initiallyHiddenRows.forEach( (el) => {
            el.classList.add('hidden');
          });
        }
      }
    }, false);
  }

  processFareSelection() {
    const saverUpsell = this.shadowRoot.querySelector('saver-upsell-dialog');
    const resultSelect = [];
    const seen = {};
    const rows = [];
    const tabletRows = [];
    const screenWidth = window.visualViewport.width;
    // If Desktop/Mobile else Tablet valueTiles thus different structure
    if (screenWidth > 1232 || screenWidth <= 659 ) {
      rows.push(...this.shadowRoot.querySelectorAll('tr.matrixRow'));
    } else {
      rows.push(...this.shadowRoot.querySelectorAll('ch-accordion.tablet-accordion'));
      tabletRows.push(...this.shadowRoot.querySelectorAll('tr.matrixRow'));
    }
    rows.forEach((row, idx) => {
      const cells = row.querySelectorAll('auro-valuetile[selected]');
      cells.forEach((cell) => {
        if (seen[cell.getAttribute('id')]) {
          // Skip the cell
        } else {
          seen[cell.getAttribute('id')] = true;
          const allCellsInRow = row.querySelectorAll('auro-valuetile');
          const rowWithSeg = tabletRows.length == 0 ? row : tabletRows[idx];
          const segInfo = JSON.parse(rowWithSeg.querySelector('fs-matrix-flight-result').getAttribute('segments'));
          const classOfService = cell.querySelector('span[slot=class-of-service]').textContent.trim();
          segInfo.forEach((segment, segIdx) => {
            let depDate = segment.DepartureDay.split('-');
            depDate = `${depDate[1]}/${depDate[2]}/${depDate[0]}`;
            const cabinMap = {
              'SAVER': 'S',
              'MAIN': 'C',
              'FIRST': 'F',
              'FIRSTUPGRADE': 'C',
              'PREMIUMUPGRADE': 'C',
            };
            const revenueMap = {
              'SAVER': '0',
              'MAIN': '1',
              'MAIN REFUNDABLE': '4',
              'PREMIUM UPGRADE': '2',
              'FIRST': '6',
              'FIRST UPGRADE': '3',
              'FIRST REFUNDABLE': '7',
            };
            const mainPrice = parseInt(allCellsInRow[1].getAttribute('price'));
            if (!(this.saverUpsellShown) && mainPrice != 0) {
              if (cabinMap[classOfService] === 'S') {
                saverUpsell.setAttribute('price',
                    mainPrice -
                    parseInt(allCellsInRow[0].getAttribute('price')));
                saverUpsell.showModalBasic();
                this.saverUpsellShown = true;
                if (window.utag !== undefined) {
                  window.utag.link({
                    events: 'event102',
                  });
                }
              }
            }
            let cabin;
            if (cell.children[2]?.IsMixedCabinItinerary) {
              const tileData = cell.children[2].tileData;
              cabin = tileData[segIdx].classOfService;
            }
            let fareMatrixSelection = '';

            let priceMatrixSelection = '';
            try {
              [...allCellsInRow].splice(0, Math.ceil( allCellsInRow.length / 2)).forEach((curCell) => {
                if (curCell.innerText.includes('SAVER')) {
                  fareMatrixSelection += revenueMap['SAVER'] + '|';
                  priceMatrixSelection += revenueMap['SAVER'] + '-' +
                    curCell.getAttribute('price').split('.')[0] + '|';
                }
                if (curCell.innerText.includes('MAIN')) {
                  if (curCell.innerText.includes('MAIN REFUNDABLE')) {
                    fareMatrixSelection += revenueMap['MAIN REFUNDABLE'] + '|';
                    priceMatrixSelection += revenueMap['MAIN REFUNDABLE'] + '-' +
                      curCell.getAttribute('price').split('.')[0] + '|';
                  } else {
                    fareMatrixSelection += revenueMap['MAIN'] + '|';
                    priceMatrixSelection += revenueMap['MAIN'] + '-' +
                      curCell.getAttribute('price').split('.')[0] + '|';
                  }
                }
                if (curCell.innerText.includes('PREMIUM')) {
                  if (curCell.innerText.includes('PREMIUM UPGRADE')) {
                    fareMatrixSelection += revenueMap['PREMIUM UPGRADE'] + '|';
                    priceMatrixSelection += revenueMap['PREMIUM UPGRADE'] + '-' +
                      curCell.getAttribute('price').split('.')[0] + '|';
                  } else {

                  }
                }
                if (curCell.innerText.includes('FIRST')) {
                  if (curCell.innerText.includes('FIRST UPGRADE')) {
                    fareMatrixSelection += revenueMap['FIRST UPGRADE'] + '|';
                    priceMatrixSelection += revenueMap['FIRST UPGRADE'] + '-' +
                      curCell.getAttribute('price').split('.')[0] + '|';
                  } else if (curCell.innerText.includes('FIRST REFUNDABLE')) {
                    fareMatrixSelection += revenueMap['FIRST REFUNDABLE'] + '|';
                    priceMatrixSelection += revenueMap['FIRST REFUNDABLE'] + '-' +
                      curCell.getAttribute('price').split('.')[0] + '|';
                  } else {
                    fareMatrixSelection += revenueMap['FIRST'] + '|';
                    priceMatrixSelection += revenueMap['FIRST'] + '-' +
                      curCell.getAttribute('price').split('.')[0] + '|';
                  }
                }
              },

              );
              fareMatrixSelection = fareMatrixSelection.substring(0, fareMatrixSelection.length - 1);
              priceMatrixSelection = priceMatrixSelection.substring(0, priceMatrixSelection.length - 1);
              fareMatrixSelection += ':' + revenueMap[classOfService];
              priceMatrixSelection += ':' + revenueMap[classOfService] + '-' + cell.getAttribute('price').split('.')[0];
            } catch (e) {
              console.error('failed to push tracking data', e);
            }
            let upgradesParsed = rowWithSeg.querySelector('fs-matrix-flight-result').getAttribute('upgradeinfo');
            if (upgradesParsed === 'undefined') {
              upgradesParsed = [];
            }
            resultSelect.push({
              QPXCSolutionID: cell.getAttribute('qpxcsolutionid'),
              origin: segment.DepartureStation,
              operatingCarrier: segment.OperatingCarrier,
              publishingCarrier: segment.PublishingCarrier,
              operatingFlightNumber: segment.OperatingFlightNumber,
              publishingFlightNumber: segment.PublishingFlightNumber,
              destination: segment.ArrivalStation,
              date: depDate,
              flightNumber: segment.FlightNumber,
              cabin: cabin ? cabinMap[cabin.toUpperCase()] : cabinMap[classOfService],
              refundability: cell.getAttribute('refundable') == 'true' ? 'R' : 'N',
              refundableMainUpsell: cell.getAttribute('refundableMainUpsell'),
              refundableFirstUpsell: cell.getAttribute('refundableFirstUpsell'),
              refundablePcUpgradeUpsell: cell.getAttribute('refundablePcUpgradeUpsell'),
              refundableFcUpgradeUpsell: cell.getAttribute('refundableFcUpgradeUpsell'),
              fare: cell.getAttribute('price'),
              faresAvailable: fareMatrixSelection,
              pricesAvailable: priceMatrixSelection,
              carrierCode: segment.Carrier,
              classOfService: classOfService,
              rawSegments: {
                Duration: rowWithSeg.querySelector('fs-matrix-flight-result').getAttribute('duration'),
                Segments: segInfo,
                Footnotes: JSON.parse(rowWithSeg.querySelector('fs-matrix-flight-result').getAttribute('footnotes')),
                UpgradeInfo: upgradesParsed,
                daysChanged: rowWithSeg.querySelector('fs-matrix-flight-result').getAttribute('daysChanged'),
                SeatMapURL: rowWithSeg.querySelector('fs-matrix-flight-result').getAttribute('seatmapurl'),
                index: rowWithSeg.querySelector('fs-matrix-flight-result').getAttribute('index'),
              },
            });
          });
        }
      });
    });
    return resultSelect;
  }

  /**
   * @private Internal dictionary to provide FareFamilies based on guest type and fare class
   * @return {String} FareFamily
   */
  static get FareFamilies() {
    return {
      GuestRefundable: {
        main: 'FullFlexFare',
        first: 'FirstClassFare',
      },
      MileagePlanLowestFare: {
        main: 'MainCabinSelectFare',
        firstUpgrade: 'FirstClassUpgradeFare',
        first: 'FirstClassDealsFare',
      },
      MileagePlanRefundableFare: {
        main: 'MainCabinSelectRefundableFare',
        firstUpgrade: 'FirstClassUpgradeRefundableFare',
        first: 'FirstClassRefundableFare',
      },
      MVPLowestFare: {
        main: 'MainCabinSelectFare',
        premiumUpgrade: 'PremiumClassUpgradeFare',
        firstUpgrade: 'FirstClassUpgradeFare',
        first: 'FirstClassDealsFare',
      },
      MVPRefundableFare: {
        main: 'MainCabinRefundableFare',
        premiumUpgrade: 'PremiumClassUpgradeRefundableFare',
        firstUpgrade: 'FirstClassUpgradeRefundableFare',
        first: 'FirstClassRefundableFare',
      },
      GuestPassCase: {
        main: 'GuestPassFare',
      },
      RefundableFares: {
        main: 'MainCabinRefundableFare',
        first: 'FirstClassRefundableFare',
      },
      None: {
        saver: 'SaverFare',
        main: 'MainCabinSelectFare',
        first: 'FirstClassDealsFare',
      },
    };
  }

  /**
   * @private Internal dictionary to provide fare classes
   * @return {String} Fare class
   */
  static get ClassOfServiceInnerHTML() {
    return {
      saver: 'SAVER',
      main: 'MAIN',
      premiumUpgrade: 'PREMIUM UPGRADE',
      premium: 'PREMIUM',
      partnerPremium: 'PARTNER PREMIUM',
      firstUpgrade: 'FIRST UPGRADE',
      first: 'FIRST',
    };
  }

  /**
   * @private Internal dictionary to correlate fare families > classes of service
   * Ex: 'FullFlexFare' -> 'main'
   * @return {string} Class of service in lowercase
   */
  static get ClassOfServiceByFareFamily() {
    return {
      'FullFlexFare': 'main',
      'MainCabinRefundableFare': 'main',
      'MainCabinSelectFare': 'main',
      'MainCabinSelectRefundableFare': 'main',
      'GuestPassFare': 'main',
      'PremiumClassUpgradeFare': 'main',
      'FirstClassUpgradeFare': 'main',
      'PremiumClassUpgradeRefundableFare': 'main',
      'FirstClassUpgradeRefundableFare': 'main',
      'FirstClassFare': 'first',
      'FirstClassDealsFare': 'first',
      'FirstClassRefundableFare': 'first',
      'SaverFare': 'saver',
    };
  }

  /**
   * @private Internal function to set ondark attribute
   * on ch-legend nodes on mouse over
   * @param {Event} event - Standard event parameter
   * @void
   */
  handleMouseover(event) {
    event.stopPropagation();

    event.target.querySelectorAll('ch-legend').forEach((legendItem) => {
      this.tileIsFocused = true;
      legendItem.setAttribute('ondark', true);
    });
  }

  /**
   * @private Internal function to remove ch-legend ondark attribute on mouse leave,
   * if not in a selected tile.
   * @param {Event} event - Standard event parameter
   * @void
   */
  handleMouseleave(event) {
    event.stopPropagation();
    if (event.target.getAttribute('selected') === null) {
      this.tileIsFocused = false;
      event.target.querySelectorAll('ch-legend').forEach((legendItem) => {
        legendItem.removeAttribute('ondark');
      });
    }
  }

  /**
   * @private Internal function to add or remove on ch-legend nodes on click
   * @param {Event} event - Standard event parameter
   * @void
   */
  handleClick(event) {
    event.stopPropagation();

    event.target.querySelectorAll('ch-legend').forEach((legendItem) => {
      if (!this.tileIsFocused) {
        legendItem.removeAttribute('ondark');
      } else {
        legendItem.setAttribute('ondark', true);
      }
    });
  }

  /**
   * @private Internal function to determine the lowest price among a set
   * of flights
   * @param {object} leg Leg of flight; contains a set of flight data
   * @param {string} fareFamilies A set of fareFamilies used to point to only
   * the fares available in the current leg.
   * @param {boolean} isAwardFlightLeg Bool for determining whether to check miles
   * or grand totals in each flight.
   * @return {object} fare data - set of data for lowest price in miles or dollars
   */
  determineCheapestFare(leg, fareFamilies, isAwardFlightLeg) {
    const fares = fareFamilies.map((family) => leg.Fares[family]);
    if (isAwardFlightLeg) {
      fares.sort((a, b) => a.Miles - b.Miles);
      return fares.find((fare) => fare.GrandTotal > 0);
    } else {
      fares.sort((a, b) => a.GrandTotal - b.GrandTotal);
      return fares.find((fare) => fare.GrandTotal > 0);
    }
  }

  /**
   * @private Internal function to format the miles in an award flight;
   * @param {string} miles
   * @return {string} formatted miles - Shorthand miles format.
   * ex: 120000 -> 120k, 125.5k, 12.5k, etc
   */
  formatMiles(miles) {
    switch (miles.length) {
      case 1:
      case 2:
      case 3:
        return miles;
      case 4:
        return `${miles[1] === '0' ? miles[0] : `${miles[0]}.${miles[1]}`}k`;
      case 5:
        return `${miles[2] === '0' ? miles.slice(0, 2) : `${miles.slice(0, 2)}.${miles[2]}`}k`;
      case 6:
        return `${miles[3] === '0' ? miles.slice(0, 3) : `${miles.slice(0, 3)}.${miles[3]}`}k`;
    }
  }

  /**
   * @private Internal function to generate the HTML for the icon to use
   * @param {string} svgContent - The imported svg icon
   * @return {TemplateResult} - The html template for the icon
   */
  generateIconHtml(svgContent) {
    const dom = new DOMParser().parseFromString(svgContent, 'text/html');
    const svg = dom.body.firstChild;

    return html`${svg}`;
  }

  toPascalCase(str) {
    return str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();
  }

  /**
   * @private Internal function to handle the creation of
   * tile data to generate mixed cabin itinerary advisories
   * @param {Object} leg Leg of flight; contains a set of flight data
   * @param {string} fareFamily FareFamily used to set the class of service
   * @return {object} tileData object to pass into a legend
   * item for mixed cabin advisories
   */
  generateTileData(leg, fareFamily) {
    const tileData = [];
    leg.Segments.forEach((segment, idx) =>
      tileData.push({
        origin: segment.DepartureStation,
        destination: segment.ArrivalStation,
        full: leg.Fares[fareFamily],
        classOfService: this.toPascalCase(leg.Fares[fareFamily]?.CabinInfo?.ClassOfServices[idx]),
      }),
    );
    return tileData;
  }

  /**
   * @private Internal function to handle the creation of ch-legend for slotting into
   * a given auro-valuetile's "advisory" slot
   * @param {Object} leg Leg of flight; contains a set of flight data
   * @param {string} fareFamily FareFamily used to set the class of service
   * @return {TemplateResult} TemplateResult - ch-legend template
   */
  generateAdvisories(leg, fareFamily) {
    const advisories = [];
    const fareInfo = leg.Fares[fareFamily];

    if (fareInfo.MixedCabin &&
        fareFamily !== FSResultsTable.FareFamilies.None.saver) {
      const tileData = this.generateTileData(leg, fareFamily);
      advisories.push(
          html`
          <ch-legend 
            tile
            slot="advisory"
            IsMixedCabinItinerary
            tileData='${JSON.stringify(tileData)}'>
          </ch-legend>
        `,
      );
    }

    if (fareInfo.Discount) {
      advisories.push(
          html`
          <span slot="advisory">
            <ch-legend 
              tile 
              DiscountCodeApplied></ch-legend>
          </span>
        `,
      );
    }

    if (fareInfo.SeatsRemaining > 0 &&
        fareInfo.SeatsRemaining < 7 &&
        advisories.length === 0 &&
        fareFamily !== FSResultsTable.FareFamilies.None.saver) {
      advisories.push(
          html`
          <span 
            tile
            slot="scarcity-upsell">only ${fareInfo.SeatsRemaining} left</span>
        `,
      );
    }
    return advisories;
  }

  /**
   * @private Internal function to generate the lowest price to
   * set into a tablet accordion expand trigger.
   * @param {object} cheapestFare Cheapest fare object
   * @param {boolean} isAwardFlightLeg Flag for determining award case
   * @param {boolean} noAvailableFlights Flag for showing the no price case
   * @param {boolean} isMobileTrigger Flag for creating content for mobile triggers
   * @return {TemplateResult} TemplateResult - Lowest price content
   */
  generateAccordionTriggerContent(cheapestFare, isAwardFlightLeg, noAvailableFlights, isMobileTrigger) {
    if (isMobileTrigger && isAwardFlightLeg && !noAvailableFlights) {
      const formattedMiles = this.formatMiles(cheapestFare.Miles);
      return html`
        <span class="mobile-award-trigger-price">${formattedMiles} + $${Math.ceil(cheapestFare.GrandTotal)}</span>
      `;
    } else if (isMobileTrigger && !noAvailableFlights) {
      return html`
        <span class="mobile-revenue-trigger-price">$${Math.ceil(cheapestFare.GrandTotal)}</span>
      `;
    }

    if (isAwardFlightLeg && !noAvailableFlights) {
      const formattedCheapestFare = this.formatMiles(cheapestFare.Miles);
      return html`
        <div class="award-content">
          <div>From</div>
          <div class="award-mile-content">
            ${formattedCheapestFare}
          </div>
          <span class="award-price-content">
          + $${Math.ceil(cheapestFare.GrandTotal)}
          </span>
          <div class="icon-container">
            ${this.generateIconHtml(chevronDown.svg)}
          </div>
        </div>
      `;
    } else if (noAvailableFlights) {
      return html`
        <span class="no-price">Unavailable</span>
      `;
    }

    return html`
      <div class="mobile-trigger-label">From</div>
      <div class="price-container">
        <span class="currency-sign">
        $</span><span 
          class="price-amount"
        >${Math.ceil(cheapestFare.GrandTotal)}</span>
      </div>
      <div class="icon-container">
        ${this.generateIconHtml(chevronDown.svg)}
      </div>
    `;
  }

  /**
   * @private Internal function to determine whether or not to extend a value proposition
   * @param {number} currentIndex Current index of the valuetile being iterated over
   * @param {string} classesOfService All classes of service in a given row
   * @return {Boolean} Whether or not to extend a value proposition length
   */
  shouldGenerateExtendedValueProposition(currentIndex, classesOfService) {
    const validClassesOfService = ['first', 'firstupgrade'];
    let currentIndexIsValid = false;
    let nextIndexIsValid = false;
    if (currentIndex !== classesOfService.length - 1) {
      currentIndexIsValid = validClassesOfService.some((classOfService) =>
        classOfService === classesOfService[currentIndex].toLowerCase());

      nextIndexIsValid = validClassesOfService.some((classOfService) =>
        classOfService === classesOfService[currentIndex + 1].toLowerCase());
    }

    return currentIndexIsValid && nextIndexIsValid;
  }

  /**
   * @private Internal function to handle the creation of sets of auro-valuetiles
   * @param {object} leg Leg of flight; contains a set of flight data
   * @param {string} breakpoint determines whether to classify set as tablet or mobile.
   * @return {TemplateResult} TemplateResult - row of auro-valuetiles
   */
  generateValuetileRow(leg, breakpoint) {
    const requestedFareType = this.guestType ? this.guestType : 'None';
    const classesOfService = Object.keys(FSResultsTable.FareFamilies[requestedFareType]);
    const isFirstResultRow = leg.id === 0;
    const showValuePropositionAt = {
      0: isFirstResultRow,
    };

    return classesOfService.map((classOfService, idx) => {
      if (isFirstResultRow) {
        const extendedValueProposition = breakpoint === 'desktop' ?
          this.shouldGenerateExtendedValueProposition(idx, classesOfService) : false;
        const lastTileInRow = idx === classesOfService.length - 1;
        showValuePropositionAt[idx + 1] = !lastTileInRow &&
          !extendedValueProposition ? true : false;

        return html`${this.generateValueTile(leg, classOfService, idx, breakpoint,
            showValuePropositionAt[idx], extendedValueProposition,
        )}`;
      } else {
        return html`${this.generateValueTile(leg, classOfService, idx, breakpoint)}`;
      }
    });
  }

  /**
   * @private Internal function to handle the creation of each auro-valuetile
   * @param {object} leg Contains a set of flight data for each leg
   * @param {string} classOfService Which class of service to slot into the tile
   * @param {number} idx Paired with leg id to provide unique id for each tile on the results
   * @param {string} breakpoint breakpoint to determine when to apply slim variant of valuetile
   * @param {Boolean} showValueProposition Whether or not to render a value proposition
   * @param {Boolean} extendedValueProposition Whether or not to extend a value proposition length, default false
   * @param {string} customValueProposition Custom text for a value proposition, default empty string
   * page.
   * @return {TemplateResult} TemplateResult - single auro-valuetile
   */
  generateValueTile(leg, classOfService, idx, breakpoint, showValueProposition = false,
      extendedValueProposition = false, customValueProposition = '') {
    const requestedClassOfService = classOfService.toLowerCase();

    const requestedFareType = this.guestType ? this.guestType : 'None';
    const fareFamily = FSResultsTable.FareFamilies[requestedFareType][classOfService];
    const advisories = this.generateAdvisories(leg, fareFamily);
    const formattedClassofService =
        `${FSResultsTable.ClassOfServiceInnerHTML[classOfService]}${leg.Fares[fareFamily] &&
          fareFamily.includes('Refundable') ?
            ' REFUNDABLE' : ''}`;
    return html`
      <auro-valuetile
        class="${breakpoint}-valuetile"
        QPXCSolutionID=${leg.Fares[fareFamily].QPXCSolutionID}
        id="${leg.id},${idx}"
        price="${leg.Fares[fareFamily].GrandTotal}"
        refundable=${leg.Fares[fareFamily].Refundable}
        refundableMainUpsell=${leg.Fares['MainCabinRefundableFare'].GrandTotal}
        refundableFirstUpsell=${leg.Fares['FirstClassRefundableFare'].GrandTotal}
        refundablePcUpgradeUpsell=${leg.Fares['PremiumClassUpgradeRefundableFare'].GrandTotal} 
        refundableFcUpgradeUpsell=${leg.Fares['FirstClassUpgradeRefundableFare'].GrandTotal} 
        mainFareBucket=${leg.Fares['MainCabinRefundableFare'].CabinInfo?.BookingCodes}
        firstFareBucket=${leg.Fares['FirstClassRefundableFare'].CabinInfo?.BookingCodes}
        @click=${this.handleClick}
        @mouseenter=${this.handleMouseover}
        @mouseleave=${this.handleMouseleave}
        ?extendedProposition=${extendedValueProposition}
        ?showValueProposition=${showValueProposition && !customValueProposition && breakpoint === 'desktop'}
        ?customValueProposition=${customValueProposition}
        ?isAwardFlight=${Boolean(leg.Fares[fareFamily].Miles)}
        ?MixedCabinImage=${leg.Fares[fareFamily].MixedCabin}
        ?DiscountFareImage=${leg.Fares[fareFamily].Discount}
        ?saver=${requestedClassOfService === 'saver'}
        ?main=${requestedClassOfService === 'main'}
        ?premiumUpgrade=${requestedClassOfService === 'premiumupgrade'}
        ?premium=${requestedClassOfService === 'premium'}
        ?partnerPremium=${requestedClassOfService === 'partnerpremium'}
        ?firstUpgrade=${requestedClassOfService === 'firstupgrade'}
        ?first=${requestedClassOfService === 'first'}
        ?noAvailableFlight=${!Boolean(leg.Fares[fareFamily].GrandTotal) && !Boolean(leg.Fares[fareFamily].Miles)}
        ?slim=${breakpoint === 'desktop' || breakpoint === 'tablet' ? true : false}
      >
        <span slot="class-of-service">${formattedClassofService}</span>
        ${Boolean(leg.Fares[fareFamily].GrandTotal) ?
          html`<span slot="price">${Math.ceil(leg.Fares[fareFamily].GrandTotal)}</span>` :
          ''
}
        ${Boolean(leg.Fares[fareFamily].Miles) ?
          html`<span slot="miles">${leg.Fares[fareFamily].Miles}</span>` :
          ''
}
        ${advisories.length > 0 ?
          advisories.map((advisory) => advisory) :
          ''
}
      </auro-valuetile>
    `;
  }

  generateTripSummaryCard() {
    return html`
      <fs-trip-summary-card 
        origin=${this.selectedFlights[this.index][0].origin} 
        destination=${this.selectedFlights[this.index][this.selectedFlights[this.index].length-1].destination} 
        index=${this.index}
        selectedFlights=${JSON.stringify(this.selectedFlights)}
        badge=${this.badge ? this.badge : ''}
        option=${JSON.stringify(this.selectedFlights[this.index][0].rawSegments)}>
          <span slot="price">${parseFloat(this.selectedFlights[this.index][0].fare).toFixed(0)}</span>
          <span slot="class-of-service">${this.selectedFlights[this.index][0].classOfService}</span>
      </fs-trip-summary-card>
    `;
  }

  // REFACTOR OPPORTUNITY: The conditional is used 3 times in this file.
  // Hides or shows depending if user has already selected a tile for the slice.
  generateExpandResultsButton() {
    return html`
      <expand-results 
        style=${this.selectedTableIndex !== undefined &&
        this.selectedFlights &&
        this.selectedFlights[this.index] ? 'display: none' : 'display: initial'}
        
        id='toggleResults'
        shown='10'
        total='${this.options.length}'
      >
      </expand-results>
    `;
  }


  /**
   * @private Internal function to handle the click event to trigger the expansion of the accordion
   * @param {object} event - Standard event parameter
   */
  handleExpand(event) {
    const currentRow = event.composedPath()[0].closest('tr');
    const rowIndex = currentRow.getAttribute('index');
    const expanded =
      currentRow.getAttribute('expanded') === 'false' ||
      !currentRow.getAttribute('expanded') ? false : true;

    const height = currentRow.clientHeight > 210 ? currentRow.clientHeight : 210;

    const nextState = !expanded;

    this.transitionHeight(nextState, rowIndex, height);
    currentRow.setAttribute('expanded', `${nextState}`);

    this.dispatchEvent(new CustomEvent('toggleExpanded', {
      bubbles: true,
      composed: true,
      target: event.target,
    }));
  }

  /**
   * @private Internal function to transition the accordion's height when opening or closing
   * @param {boolean} opening - whether the accordion is opening or closing
   * @param {number} rowIndex - which row in the matrix
   * @param {number} height - height of current row
   */
  transitionHeight(opening, rowIndex, height) {
    const HEIGHT_TIMEOUT = 10;
    const toggle = this.shadowRoot.getElementById(`${rowIndex}Panel`);

    toggle.style.height = window.visualViewport.width >= 660 ?
      `${height}px` :
      `${toggle.scrollHeight}px`;

    if (!opening) {
      // set height to 0, triggering the CSS transition
      setTimeout(() => {
        toggle.style.height = null;
      }, HEIGHT_TIMEOUT);
    }
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

  render() {
    const valuetileContainerStyles = {
      'valuetile-container--isExpanded': this.expanded,
    };

    return html`
      ${isIE11() ?
        html`<style>
            ${unsafeCSS(FSResultsTable.styles)}
          </style>` :
        ``}

      <saver-upsell-dialog price="0"></saver-upsell-dialog>
      ${this.selectedTableIndex !== undefined &&
        this.selectedFlights &&
        this.selectedFlights[this.index] ?
        this.generateTripSummaryCard() : html``}
                  
      <table class="resultsTable" id="MatrixTable_${this.index}" 
        style=${this.selectedTableIndex !== undefined && this.selectedFlights && this.selectedFlights[this.index]?
          'display:none' : ''}>
        <thead>
          <tr>
            <th class="firstHead">
            </th>
          </tr>
        </thead>
        <tbody>
          ${this.options.map((option, idx) => {
    const requestedFareType = this.guestType ? this.guestType : 'None';
    const fareFamilies = Object.keys(FSResultsTable.FareFamilies[requestedFareType])
        .map((classOfService) => FSResultsTable.FareFamilies[requestedFareType][classOfService]);
    const isAwardFlightLeg = fareFamilies.some((fareFamily) =>
      option.Fares[fareFamily].Miles > 0);
    const noAvailableFlights = !fareFamilies.some((fareFamily) =>
      Boolean(option.Fares[fareFamily].GrandTotal) || Boolean(option.Fares[fareFamily].Miles));
    const cheapestFare = this.determineCheapestFare(option, fareFamilies, isAwardFlightLeg);
    return idx < 10 ? html`
              <tr 
                expanded="false"
                class="matrixRow" 
                index=${idx}>
                <td class="flightInfoCell">
                  <div class="flight-info-table">
                    <fs-matrix-flight-result
                      class="flight-summary-table"
                      Duration=${`${Math.floor(option.Duration / 60)}h ${Math.floor(option.Duration % 60)}m`}
                      Segments=${JSON.stringify(option.Segments)}
                      Footnotes=${JSON.stringify(option.Footnotes)}
                      UpgradeInfo=${JSON.stringify(option.UpgradeInfo)}
                      daysChanged=${option.daysChanged}
                      TotalDurationMinutes=${option.Duration}
                      index=${'FS' + this.index + '_' + idx}
                    ></fs-matrix-flight-result>
                    <div class="tablet-trigger-container">
                      <button
                        index=${idx}
                        @click=${this.handleExpand}
                        class="${classMap(valuetileContainerStyles)}">
                        ${this.generateAccordionTriggerContent(cheapestFare, isAwardFlightLeg, noAvailableFlights)}
                      </button>
                    </div>
                  </div>
                  <div class="divider"></div>
                  <div class="mobile-trigger-container">
                    <button 
                      @click=${this.handleExpand}>
                      ${this.generateAccordionTriggerContent(cheapestFare, isAwardFlightLeg, noAvailableFlights)}
                    </button>
                  </div>
                  <div class="mobile-spacer"></div>
                  <div
                    id="${idx}Panel"
                    class="valuetile-container">
                    ${this.generateValuetileRow(option, 'desktop')}
                  </div>
                </td>
              </tr>
            ` : html `
              <tr 
                expanded="false"
                class="matrixRow initially-hidden-row hidden" 
                index=${idx}>
                <td  class="flightInfoCell">
                <div class="flight-info-table">
                  <fs-matrix-flight-result
                    class="flight-summary-table"
                    Duration=${`${Math.floor(option.Duration / 60)}h ${Math.floor(option.Duration % 60)}m`}
                    Segments=${JSON.stringify(option.Segments)}
                    Footnotes=${JSON.stringify(option.Footnotes)}
                    UpgradeInfo=${JSON.stringify(option.UpgradeInfo)}
                    daysChanged=${option.daysChanged}
                    SeatMapURL=${option.SeatMapURL}
                    index=${'FS' + this.index + '_' + idx}
                  ></fs-matrix-flight-result>
                  <div class="tablet-trigger-container">
                    <button
                      index=${idx}
                      @click=${this.handleExpand}
                      class="${classMap(valuetileContainerStyles)}">
                      ${this.generateAccordionTriggerContent(cheapestFare, isAwardFlightLeg, noAvailableFlights)}
                    </button>
                  </div>
                </div>
                <div class="divider"></div>
                <div class="mobile-trigger-container">
                  <button 
                    @click=${this.handleExpand}>
                    <span class="mobile-trigger-label">From</span>
                    ${this.generateAccordionTriggerContent(cheapestFare, isAwardFlightLeg, noAvailableFlights)}
                  </button>
                </div>
                <div
                  id="${idx}Panel"
                  class="valuetile-container">
                  ${this.generateValuetileRow(option, 'desktop')}
                </div>
              </tr>
              `;
  },
  )}
        </tbody>
      </table>

      ${this.options.length > 10 ? this.generateExpandResultsButton() : html``}
    `;
  }
}

if (!customElements.get('fs-results-table')) {
  customElements.define('fs-results-table', FSResultsTable);
}
