import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '../../flight-search/modals/fs-modal-tab';
import '@aurodesignsystem/auro-avatar';
import '@alaskaairux/auro-badge';
import styles from './styles-css';

class FoodMenu extends LitElement {
  static get properties() {
    return {
      class: {type: String},
      first: {type: Array},
      main: {type: Array},
      detailed: {type: Boolean},
    };
  }

  static get styles() {
    return css`
      ${styles}
    `;
  }
  clickClass(evt) {
    this.class = evt.target.getAttribute('label');
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

  renderBody() {
    if (typeof this.first === 'String') {
      this.first = JSON.parse(this.first);
    }
    if (typeof this.main === 'String') {
      this.main = JSON.parse(this.main);
    }
    switch (this.class) {
      case 'First Class':
        return html`
                      <div class="firstClassContainer">
                <img src="https://www.alaskaair.com/-/media/605C72E86ED34880A8247E64DA561B60"></img>
                <div class="contentContainer">
                  <h4>First Class options</h4>
                  <p>Pick a meal you're sure to love. Use First Class food pre-order to choose your entree, 
                    or pick a fruit and cheese platter up to 20 hours before your flight. Available on most 
                    Boeing and Airbus flights over 670 miles. 
                    <auro-hyperlink href="https://www.alaskaair.com/content/travel-info/flight-experience/first-class?lid=inflight-experience-overview:first-class">Find out more 
                    about the perks of First Class.</auro-hyperlink></p>
                  <auro-hyperlink cta href="https://www.alaskaair.com/content/travel-info/flight-experience/main-cabin/food-and-drink#reserve">Explore pre-order</auro-hyperlink>
                  ${this.first.map((meal) => html`
                    <h5>${meal.title}</h5>
                    <span>${meal.description}</span>
                  `)}
                </div>
              </div>
        `;
      case 'Main':
        return html`
                      <div class="mainCabinContainer">
                <h4>Main cabin</h4>
                <p>All passengers have access to a variety of delicious food to pre-order before the flight.</p>
                <auro-hyperlink cta 
                href="https://www.alaskaair.com/content/travel-info/flight-experience/main-cabin/food-and-drink#reserve">
                Explore pre-order</auro-hyperlink>
                <div class="coachMealsContainer">
                  ${this.main.map((meal) => html`
                    <div class="coachMealContainer">
                      <div class="avatarContainer">
                        ${this.detailed ? html`
                          <auro-badge style="position:absolute;margin-left:-155px;margin-top:-20px;">
                            Retail: ${meal.displayPrice}
                          </auro-badge>
                        `:html``}
                        <auro-avatar img=${meal.imageLarge ? meal.imageLarge :
                         'https://www.alaskaair.com/-/media/6CFD7A531AF146D29170A6AAF9CF499D'}>
                        </auro-avatar>
                      </div>
                    <span class="coachMealTitle">${meal.title}</span>
                      <span class="coachMealDescription">${meal.description}</span>
                      ${this.detailed ? html`
                          <span><strong>Allergies: </strong>${meal.allergies}</span>
                          <span><strong>Nutrition: </strong>${meal.nutrition}</span>
                          <span><strong>Can Preorder: </strong>${meal.canPreorder}</span>
                        `:html``}
                    </div>
                  `)}
                </div>
              </div>
        `;
      case 'Beverages':
        return html`
              <div class="firstClassContainer">
                <div class="contentContainer">
                  <h4>Beverage options</h4>
                  <p>Quench your thirst with juice, sodas, coffee, tea, beer, wine, and spirits.</p>
                  <p>NOTE: Boxed Water<sup>™</sup> brand water is available on flights between 220 and 350 miles; 
                  flights under 220 miles have no food or beverage service.</p>
                  <h5>Non-alcoholic</h5>
                  <p>Boxed Water<sup>™</sup> brand water, Seltzer, Coca-Cola<sup>®</sup>, Diet Coke<sup>™</sup>, 
                  Sprite<sup>®</sup>, Ginger Ale, Orange Juice, Bloody Mary Mix, Tonic Water</p>
                  <h5>Hot beverages</h5>
                  <p>Starbucks<sup>®</sup> Pike Place<sup>®</sup> Roast Coffee, Teavana<sup>®</sup> 
                  Royal English Breakfast Tea, Teavana<sup>®</sup> Mint Majesty Herbal Tea</p>
                  <h5>Alcohol</h5>
                  <p>Fremont Brewing Lush IPA, Full Sail Brewing Sesión Cerveza Mexican Style Lager, Broken 
                    Earth Winery El Pasado Red Blend<sup>*</sup>, Canoe Ridge Vineyards Chardonnay<sup>*</sup>, 
                    Chateau Ste. Michelle Mimi Cabernet Sauvignon<sup>**</sup>, Chateau Ste. Michelle Mimi 
                    Chardonnay<sup>**</sup>, 
                    Domaine St. Vincent Sparkling Wine, Jack Daniel's Whiskey, Woodford Reserve Bourbon, 
                    Glenfarclas Single Malt Scotch Whisky, Cruzan Rum, Tanqueray Gin, Tito's Vodka, Five 
                    Farms Irish Cream</p>
                  <p class="disclaimer-container">
                  <sup>*</sup>Available in Main Cabin and Premium Class <br />
                  <sup>**</sup>Available in First Class
                  </p>
                </div>
                <img src="https://www.alaskaair.com/-/media/2DA3FF5E1C6F46B8831C6DD792558145"/>
              </div>
        `;
    }
  }

  render() {
    return html`
            ${isIE11() ? html`<style>${unsafeCSS(FoodMenu.styles)}</style>` : ''}
            <div class="mealContainer">
              <div class="tabsContainer">
              <div class="tab">
              <fs-modal-tab large onLight label="First Class" ?selected=${this.class === 'First Class'}
                      @click=${(evt) => this.clickClass(evt)}></fs-modal-tab>
</div>
<div class="tab">
<fs-modal-tab large onLight label="Main" ?selected=${this.class === 'Main'}
                    @click=${(evt) => this.clickClass(evt)}></fs-modal-tab>
</div>
<div class="tab">
<fs-modal-tab large onLight label="Beverages" ?selected=${this.class === 'Beverages'}
                      @click=${(evt) => this.clickClass(evt)}></fs-modal-tab>
</div>



              </div>

${this.renderBody()}


            </div>
        `;
  }
}

if (!customElements.get('food-menu')) {
  customElements.define('food-menu', FoodMenu);
}
