/* eslint-disable new-cap */
import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '../../flight-results/fs-matrix-faretype-cell';
import '../fs-matrix-price-cell';
import '../../flight-results/fs-matrix-flight-result';
import '../../generics/expand-results';
import '../../generics/import-auro-components';
import '../../flight-search/modals/fs-modal-compare-fares-tabbed';

class FSMatrixResults extends LitElement {
  constructor() {
    super();
  }

  // selectedTableIndex = the index of the matrix table itself
  // 1 for ow, 2 for r/t, up to 4 for mc
  // selectedFare is the index of the price cell selected by the guest
  static get properties() {
    return {
      guestType: {type: String},
      options: {type: Array},
      selectedTableIndex: {type: Number},
      selectedFare: {type: Number},
      index: {type: Number},
    };
  }

  static get styles() {
    return css`
      :host {
        font-size: 16px;
      }
      .resultsTable {
        width: 100%;
      }
      .stickyRight {
        width: 126px;
        padding: 0px;
      }
      .firstHead {
        text-align: left;
      }
      .matrixRow {
        min-height: 100px;
      }
      .extra {
        display: none;
      }
    `;
  }

  firstUpdated() {
    let showResults = false;

    const dialog = document.querySelector('auro-dialog');

    dialog.addEventListener('clearFares', (evt) => {
      this.selectedTableIndex = undefined;
      this.selectedFare = undefined;
    });

    const element =
    this.shadowRoot.querySelector('expand-results').shadowRoot;

    if (this.guestType === 'undefined') {
      this.guestType = html`<span style="color:red;"
        >the mockups look way better than this and I'm not done implementing
        them still</span
      >`; // eslint-disable-line
    }

    // handles price cell clicks
    document.addEventListener('fareClick', (evt) => {
      this.selectedTableIndex = evt.path[0].getAttribute('id').split(',')[0];
      this.selectedFare = evt.path[0].getAttribute('id').split(',')[1];

      const rows = this.shadowRoot.querySelectorAll('tr.matrixRow');
      rows.forEach((row) => {
        const cells = row.querySelectorAll('fs-matrix-price-cell');
        cells.forEach((cell) => {
          if (cell.getAttribute('id') !== this.selectedTableIndex + ',' + this.selectedFare) {
            cell.shadowRoot.querySelector('#fare-container').classList.remove('selected');
            if (cell.shadowRoot.querySelector('input')) {
              cell.shadowRoot.querySelector('input').checked = false;
            }
          }
        });
      });
    });


    element.addEventListener('click', function(event) {
      // If the clicked element doesn't have the right selector, bail
      if (!event.target.matches('auro-button')) {
        return;
      } else {
        showResults = showResults ? false : true;
        // eslint-disable-next-line
        const showMoreResults = this.shadowRoot.querySelector('.resultsTable').querySelector('tbody').querySelectorAll('.extra');

        if ( showResults === true ) {
          showMoreResults.forEach( (el) => {
            el.style.display = 'table-row';
          });
        } else if ( showResults === false ) {
          showMoreResults.forEach( (el) => {
            el.style.display = 'none';
          });
        }
      }
    }, false);
  }

  generateFareHeaders() {
    /* eslint-disable max-len */
    switch (this.guestType) {
      case 'GuestRefundable':
        return html`
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="main"
              label="Main"
            ></fs-matrix-faretype-cell>
          </th>
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="first"
              label="First Class"
            ></fs-matrix-faretype-cell>
          </th>
        `;
      case 'MileagePlanLowestFare':
        return html`
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="main"
              label="Main"
            ></fs-matrix-faretype-cell>
          </th>
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="first"
              label="First Class Upgrade"
            ></fs-matrix-faretype-cell>
          </th>
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="first"
              label="First Class"
            ></fs-matrix-faretype-cell>
          </th>
        `;
      case 'MileagePlanRefundableFare':
        return html`
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="main"
              label="Main"
            ></fs-matrix-faretype-cell>
          </th>
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="first"
              label="First Class Upgrade"
            ></fs-matrix-faretype-cell>
          </th>
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="first"
              label="First Class"
            ></fs-matrix-faretype-cell>
          </th>
        `;
      case 'MVPLowestFare':
        return html`
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="main"
              label="Main"
            ></fs-matrix-faretype-cell>
          </th>
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="first"
              label="Premium Class Upgrade"
            ></fs-matrix-faretype-cell>
          </th>
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="first"
              label="First Class Upgrade"
            ></fs-matrix-faretype-cell>
          </th>
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="first"
              label="First Class"
            ></fs-matrix-faretype-cell>
          </th>
        `;
      case 'MVPRefundableFare':
        return html`
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="main"
              label="Main"
            ></fs-matrix-faretype-cell>
          </th>
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="first"
              label="Premium Class Upgrade"
            ></fs-matrix-faretype-cell>
          </th>
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="first"
              label="First Class Upgrade"
            ></fs-matrix-faretype-cell>
          </th>
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="first"
              label="First Class"
            ></fs-matrix-faretype-cell>
          </th>
        `;
      case 'GuestPassCase':
        return html`
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="main"
              label="Standby"
            ></fs-matrix-faretype-cell>
          </th>
        `;
      default:
        return html`
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="saver"
              label="Saver"
            ></fs-matrix-faretype-cell>
          </th>
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="main"
              label="Main"
            ></fs-matrix-faretype-cell>
          </th>
          <th class="stickyRight">
            <fs-matrix-faretype-cell
              fareType="first"
              label="First Class"
            ></fs-matrix-faretype-cell>
          </th>
        `;
    }
  }

  generateFareCells(leg) {
    switch (this.guestType) {
      case 'GuestRefundable':
        return html`
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="main"
              id="${leg.id},1"
              seatsRemaining="${leg.Fares.FullFlexFare.SeatsRemaining}"
              price="${leg.Fares.FullFlexFare.GrandTotal}"
              onClick=${leg.Fares.FullFlexFare.OnClick}
              ?MixedCabinImage=${leg.Fares.FullFlexFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.FullFlexFare.Discount}
            ></fs-matrix-price-cell>
          </td>
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="first"
              id="${leg.id},2"
              seatsRemaining="${leg.Fares.FirstClassFare.SeatsRemaining}"
              price="${leg.Fares.FirstClassFare.GrandTotal}"
              onClick=${leg.Fares.FirstClassFare.OnClick}
              ?MixedCabinImage=${leg.Fares.FirstClassFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.FirstClassFare.Discount}
            ></fs-matrix-price-cell>
          </td>
        `;
      case 'MileagePlanLowestFare':
        return html`
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="main"
              id="${leg.id},1"
              seatsRemaining="${leg.Fares.MainCabinSelectFare.SeatsRemaining}"
              price="${leg.Fares.MainCabinSelectFare.GrandTotal}"
              onClick=${leg.Fares.MainCabinSelectFare.OnClick}
              ?MixedCabinImage=${leg.Fares.MainCabinSelectFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.MainCabinSelectFare.Discount}
            ></fs-matrix-price-cell>
          </td>
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="first"
              id="${leg.id},2"
              seatsRemaining="${leg.Fares.FirstClassUpgradeFare.SeatsRemaining}"
              price="${leg.Fares.FirstClassUpgradeFare.GrandTotal}"
              onClick=${leg.Fares.FirstClassUpgradeFare.OnClick}
              ?MixedCabinImage=${leg.Fares.FirstClassUpgradeFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.FirstClassUpgradeFare.Discount}
            ></fs-matrix-price-cell>
          </td>
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="first"
              id="${leg.id},3"
              seatsRemaining="${leg.Fares.FirstClassDealsFare.SeatsRemaining}"
              price="${leg.Fares.FirstClassDealsFare.GrandTotal}"
              onClick=${leg.Fares.FirstClassDealsFare.OnClick}
              ?MixedCabinImage=${leg.Fares.FirstClassDealsFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.FirstClassDealsFare.Discount}
            ></fs-matrix-price-cell>
          </td>
        `;
      case 'MileagePlanRefundableFare':
        return html`
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="main"
              id="${leg.id},1"
              seatsRemaining="${leg.Fares.MainCabinSelectRefundableFare.SeatsRemaining}"
              price="${leg.Fares.MainCabinSelectRefundableFare.GrandTotal}"
              onClick=${leg.Fares.MainCabinSelectRefundableFare.OnClick}
              ?MixedCabinImage=${leg.Fares.MainCabinSelectRefundableFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.MainCabinSelectRefundableFare.Discount}
            ></fs-matrix-price-cell>
          </td>
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="first"
              id="${leg.id},2"
              seatsRemaining="${leg.Fares.FirstClassUpgradeRefundableFare
      .SeatsRemaining}"
              price="${leg.Fares.FirstClassUpgradeRefundableFare.GrandTotal}"
              onClick=${leg.Fares.FirstClassUpgradeRefundableFare.OnClick}
              ?MixedCabinImage=${leg.Fares.FirstClassUpgradeRefundableFare
      .MixedCabin}
              ?DiscountFareImage=${leg.Fares.FirstClassUpgradeRefundableFare
      .Discount}
            ></fs-matrix-price-cell>
          </td>
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="first"
              id="${leg.id},3"
              seatsRemaining="${leg.Fares.FirstClassFare.SeatsRemaining}"
              price="${leg.Fares.FirstClassFare.GrandTotal}"
              onClick=${leg.Fares.FirstClassFare.OnClick}
              ?MixedCabinImage=${leg.Fares.FirstClassFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.FirstClassFare.Discount}
            ></fs-matrix-price-cell>
          </td>
        `;
      case 'MVPLowestFare':
        return html`
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="main"
              id="${leg.id},1"
              seatsRemaining="${leg.Fares.MainCabinSelectFare.SeatsRemaining}"
              price="${leg.Fares.MainCabinSelectFare.GrandTotal}"
              onClick=${leg.Fares.MainCabinSelectFare.OnClick}
              ?MixedCabinImage=${leg.Fares.MainCabinSelectFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.MainCabinSelectFare.Discount}
            ></fs-matrix-price-cell>
          </td>
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="first"
              id="${leg.id},2"
              seatsRemaining="${leg.Fares.PremiumClassUpgradeRefundableFare
      .SeatsRemaining}"
              price="${leg.Fares.PremiumClassUpgradeFare.GrandTotal}"
              onClick=${leg.Fares.PremiumClassUpgradeFare.OnClick}
              ?MixedCabinImage=${leg.Fares.PremiumClassUpgradeFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.PremiumClassUpgradeFare.Discount}
            ></fs-matrix-price-cell>
          </td>
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="first"
              id="${leg.id},3"
              seatsRemaining="${leg.Fares.FirstClassUpgradeFare.SeatsRemaining}"
              price="${leg.Fares.FirstClassUpgradeFare.GrandTotal}"
              onClick=${leg.Fares.FirstClassUpgradeFare.OnClick}
              ?MixedCabinImage=${leg.Fares.FirstClassUpgradeFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.FirstClassUpgradeFare.Discount}
            ></fs-matrix-price-cell>
          </td>
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="first"
              id="${leg.id},4"
              seatsRemaining="${leg.Fares.FirstClassFare.SeatsRemaining}"
              price="${leg.Fares.FirstClassFare.GrandTotal}"
              onClick=${leg.Fares.FirstClassFare.OnClick}
              ?MixedCabinImage=${leg.Fares.FirstClassFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.FirstClassFare.Discount}
            ></fs-matrix-price-cell>
          </td>
        `;
      case 'MVPRefundableFare':
        return html`
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="main"
              id="${leg.id},1"
              seatsRemaining="${leg.Fares.MainCabinSelectRefundableFare.SeatsRemaining}"
              price="${leg.Fares.MainCabinSelectRefundableFare.GrandTotal}"
              onClick=${leg.Fares.MainCabinSelectRefundableFare.OnClick}
              ?MixedCabinImage=${leg.Fares.MainCabinSelectRefundableFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.MainCabinSelectRefundableFare.Discount}
            ></fs-matrix-price-cell>
          </td>
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="first"
              id="${leg.id},2"
              seatsRemaining="${leg.Fares.PremiumClassUpgradeRefundableFare
      .SeatsRemaining}"
              price="${leg.Fares.PremiumClassUpgradeRefundableFare.GrandTotal}"
              onClick=${leg.Fares.PremiumClassUpgradeRefundableFare.OnClick}
              ?MixedCabinImage=${leg.Fares.PremiumClassUpgradeRefundableFare
      .MixedCabin}
              ?DiscountFareImage=${leg.Fares.PremiumClassUpgradeRefundableFare
      .Discount}
            ></fs-matrix-price-cell>
          </td>
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="first"
              id="${leg.id},3"
              seatsRemaining="${leg.Fares.FirstClassUpgradeRefundableFare
      .SeatsRemaining}"
              price="${leg.Fares.FirstClassUpgradeRefundableFare.GrandTotal}"
              onClick=${leg.Fares.FirstClassUpgradeRefundableFare.OnClick}
              ?MixedCabinImage=${leg.Fares.FirstClassUpgradeRefundableFare
      .MixedCabin}
              ?DiscountFareImage=${leg.Fares.FirstClassUpgradeRefundableFare
      .Discount}
            ></fs-matrix-price-cell>
          </td>
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="first"
              id="${leg.id},4"
              seatsRemaining="${leg.Fares.FirstClassFare.SeatsRemaining}"
              price="${leg.Fares.FirstClassFare.GrandTotal}"
              onClick=${leg.Fares.FirstClassFare.OnClick}
              ?MixedCabinImage=${leg.Fares.FirstClassFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.FirstClassFare.Discount}
            ></fs-matrix-price-cell>
          </td>
        `;
      case 'GuestPassCase':
        return html`
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="main"
              id="${leg.id},1"
              seatsRemaining="${leg.Fares.GuestPassFare.SeatsRemaining}"
              price="${leg.Fares.GuestPassFare.GrandTotal}"
              onClick=${leg.Fares.GuestPassFare.OnClick}
              ?MixedCabinImage=${leg.Fares.GuestPassFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.GuestPassFare.Discount}
            ></fs-matrix-price-cell>
          </td>
        `;
      default:
        return html`
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="saver"
              id="${leg.id},1"
              seatsRemaining="${leg.Fares.SaverFare.SeatsRemaining}"
              price="${leg.Fares.SaverFare.GrandTotal}"
              onClick=${leg.Fares.SaverFare.OnClick}
              ?MixedCabinImage=${leg.Fares.SaverFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.SaverFare.Discount}
            ></fs-matrix-price-cell>
          </td>
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="main"
              id="${leg.id},2"
              seatsRemaining="${leg.Fares.MainCabinSelectFare.SeatsRemaining}"
              price="${leg.Fares.MainCabinSelectFare.GrandTotal}"
              onClick=${leg.Fares.MainCabinSelectFare.OnClick}
              ?MixedCabinImage=${leg.Fares.MainCabinSelectFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.MainCabinSelectFare.Discount}
            ></fs-matrix-price-cell>
          </td>
          <td class="stickyRight">
            <fs-matrix-price-cell
              fareType="first"
              id="${leg.id},3"
              seatsRemaining="${leg.Fares.FirstClassDealsFare.SeatsRemaining}"
              price="${leg.Fares.FirstClassDealsFare.GrandTotal}"
              onClick=${leg.Fares.FirstClassDealsFare.OnClick}
              ?MixedCabinImage=${leg.Fares.FirstClassDealsFare.MixedCabin}
              ?DiscountFareImage=${leg.Fares.FirstClassDealsFare.Discount}
            ></fs-matrix-price-cell>
          </td>
        `;
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
    return html`
      ${isIE11() ?
        html`<style>
            ${unsafeCSS(this.styles)}
          </style>` :
        ``}
      <table class="resultsTable" id="MatrixTable_${this.index}">
        <thead>
          <tr>
            <th class="firstHead">

            <div class="sortBy">
            <auro-checkbox id="refundable" name="refundable" @click=${() => {
    showRefundableFares[this.index]=true; applyFilters(false, false, 'MatrixTable${this.index}')
    ;
  }}>Show only refundable fares</auro-checkbox>
              <label>
                <span>Sort by</span>
                <select id="SortBy${this.index}" name="SortBy${this.index}" data-autopostback="true" class="">
                  <option selected="selected" value="1">Stops</option>
                  <option value="5">Price</option>
                  <option value="4">Duration</option>
                  <option value="2">Departure</option>
                  <option value="3">Arrival</option>
                  <option value="0">Prefer Alaska</option>
                </select>
              </label>
            </div>

          </th>
            ${this.generateFareHeaders()}
          </tr>
        </thead>
        <tbody>
          ${this.options.map(
      (option, idx) => idx < 10 ? html`
              ${this.selectedTableIndex === undefined || this.selectedTableIndex !== undefined && this.selectedTableIndex == idx ? html`
                <tr class="matrixRow" index=${idx}>
                <td>
                  <fs-matrix-flight-result
                    Duration=${option.Duration}
                    Segments=${JSON.stringify(option.Segments)}
                    Footnotes=${JSON.stringify(option.Footnotes)}
                    SeatMapURL=${option.SeatMapURL}
                    index=${'FS' + this.index + '_' + idx}
                  ></fs-matrix-flight-result>
                </td>
                ${this.generateFareCells(option)}
              </tr>
              ` : html``}

            ` : html `
            ${this.selectedTableIndex == undefined || this.selectedTableIndex !== undefined && this.selectedTableIndex == idx ? html`
              <tr class="matrixRow extra" index=${idx}>
                <td>
                  <fs-matrix-flight-result
                    Duration=${option.Duration}
                    Segments=${JSON.stringify(option.Segments)}
                    Footnotes=${JSON.stringify(option.Footnotes)}
                    SeatMapURL=${option.SeatMapURL}
                    index=${'FS' + this.index + '_' + idx}
                  ></fs-matrix-flight-result>
                </td>
                ${this.generateFareCells(option)}
              </tr>
              ` : html``}
              `,
  )}
        </tbody>
      </table>
      ${this.options.length > 10 && this.selectedTableIndex === undefined ? html`
        <expand-results id="toggleResults" shown='10' total='${this.options.length}'>
        </expand-results>
      `:html``}
    `;
  }
}

if (!customElements.get('fs-matrix-results')) {
  customElements.define('fs-matrix-results', FSMatrixResults);
}
