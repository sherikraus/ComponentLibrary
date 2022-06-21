import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '@alaskaairux/auro-carousel';
import '@alaskaairux/auro-pane';
import {isFocusVisibleSupported, isFocusVisiblePolyfillAvailable} from '../../shared/utility';

class FsShoulder extends LitElement {
  constructor() {
    super();
    if (!isFocusVisibleSupported() && isFocusVisiblePolyfillAvailable()) {
      window.applyFocusVisiblePolyfill(this.shadowRoot);
    }
  }

  static get properties() {
    return {
      days: {type: Array},
      placement: {type: String},
      resultId: {type: Number},
      selectedPane: {type: Object},
      shoulderElement: {type: Object},
    };
  }

  static get styles() {
    return css`
    `;
  }

  getSelectedPane() {
    // get all slotted carousel elements
    const slotElements = this.shadowRoot.querySelector('auro-carousel')
        .shadowRoot.querySelector('slot').assignedElements();

    // find the middle element
    slotElements.forEach((el) => {
      if (el.getAttribute('selected') !== null) {
        this.selectedPane = el;
      }
    });
  }

  paneClick(day) {
    if (this.placement === 'ascom') {
      document.querySelector('#ShoppingForm').setAttribute('action', `/Shopping/Flights/ScheduleShoulder/${day.id}`);
      document.querySelector('#ShoppingForm').submit();
    } else if (this.placement === 'mow') {
      Alaska.spinner.show();
      clearShopScrollCookie();
      let retDate = null;
      // Get new date from hidden shoulder input value
      const newDate = day.date;

      // Get original searchDate
      const depDate = document.querySelector('#departure-date');
      const searchType = document.querySelector('#searchType').value;

      const depShldrSel = document.querySelector('#depShldrSel');
      const retShldrSel = document.querySelector('#retShldrSel');

      if (searchType.toLowerCase() == 'roundtrip') {
        retDate = document.querySelector('#return-date');
      }
      if (this.resultId === 0) {
        depShldrSel.value = true;
        retShldrSel.value = false;
        depDate.value = newDate; // set new search date from selected shoulder
        clearShopDepCookie();
        clearShowAllCookie(0);
      } else {
        depShldrSel.value = false;
        retShldrSel.value = true;
        retDate.value = newDate; // set new search date from selected shoulder
        clearShopRetCookie();
        clearShowAllCookie(1);
      }
      createShopScrollCookie();
      createSearchCookie();

      const form = document.querySelector('#searchForm');
      form.setAttribute('action', '/shopping/flightsshoulder');
      form.submit();
    } else if (this.placement === 'ms') {
      this.dispatchEvent(new CustomEvent('shoulderClick', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {
          day,
          resultId: this.resultId,
        },
      }));
    }
  }

  scrollLeft() {
    if (this.placement === 'ascom') {
      document.querySelector('#ShoppingForm').setAttribute('action',
          `/Shopping/Flights/ScheduleShoulder/${this.resultId}-7`);
      document.querySelector('#ShoppingForm').submit();
    } else if (this.placement === 'mow') {
      // not implemented
    }
  }

  scrollRight() {
    if (this.placement === 'ascom') {
      document.querySelector('#ShoppingForm').setAttribute('action',
          `/Shopping/Flights/ScheduleShoulder/${this.resultId}7`);
      document.querySelector('#ShoppingForm').submit();
    } else if (this.placement === 'mow') {
      // not implemented
    }
  }

  handleCenter(element) {
    if (this.placement == 'ms') {
      // get the x coordinate of the middle carousel element
      const middleX = this.selectedPane.getClientRects()[0].x - this.getBoundingClientRect().left;
      // get the offset middle of the <auro-carousel>
      const carouselMiddle = element.shadowRoot.querySelector('auro-carousel').offsetWidth / 2;
      // get the correct amount of pixels to scroll
      const scrollTotal = middleX - carouselMiddle + 44; // 44 = half the width of shoulder
      // scroll the carousel to the right position
      element.shadowRoot.querySelector('auro-carousel').scrollCarousel(scrollTotal, 0);
    } else {
      // get the x coordinate of the middle carousel element
      const middleX = this.selectedPane.getClientRects()[0].x - this.getBoundingClientRect().left;
      // get the offset middle of the <auro-carousel>
      const carouselMiddle = element.shadowRoot.querySelector('auro-carousel').offsetWidth / 2;
      // get the correct amount of pixels to scroll
      const scrollTotal = middleX - carouselMiddle + 36; // 36 = half the width of shoulder
      // scroll the carousel to the right position
      element.shadowRoot.querySelector('auro-carousel').carousel.scrollTo(scrollTotal, 0);
    }
  }

  updated() {
    this.getSelectedPane();
    this.handleCenter(this);
  }

  async firstUpdated() {
    await new Promise((r) => setTimeout(r, 1000));

    this.getSelectedPane();
    this.shoulderElement = this;
    this.handleCenter(this.shoulderElement);

    // When the screen is resized, we need to recenter
    window.addEventListener('resize', ((evt) => this.handleCenter(this.shoulderElement)));

    // When the orientation is changed, we need to recenter
    window.addEventListener('orientationchange', ((evt) => this.handleCenter(this.shoulderElement)));
    window.addEventListener('fullscreenchange', ((evt) => this.handleCenter(this.shoulderElement)));
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
            ${isIE11() ? html`<style>${unsafeCSS(FsShoulder.styles)}</style>` : ''}
            <div class="shoulderContainer">
              ${this.days ? html`
              <auro-carousel label="Flight Shoulder - scroll right and left to hear the
              lowest fares for the surrounding dates." ?displayArrows=${this.placement != 'ms'}
              @scrollLeft=${this.scrollLeft}
              @scrollRight=${this.scrollRight}>

                ${this.days.map((day) => (html`
                  <auro-pane date=${day.date} price=${day.price}
                  ?selected=${day.selected ? true : false} @click=${() => this.paneClick(day)}
                  ?disabled=${day.enabled ? false : true}
                  ?sm=${this.placement === 'ms'}
                  fixed>
                </auro-pane>
                `))}

              </auro-carousel>
              ` : html``}
            </div>
        `;
  }
}
if (!customElements.get('fs-shoulder')) {
  customElements.define('fs-shoulder', FsShoulder);
}
