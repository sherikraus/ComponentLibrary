import {css, html, LitElement, unsafeCSS} from 'lit-element';
import {isIE11} from '../../shared/utility';
import '@aurodesignsystem/auro-avatar';

class StatusCredits extends LitElement {
  static get properties() {
    return {
      isCool: {type: Boolean},
    };
  }

  static get styles() {
    return css`
      :host {
      }

      .peopleContainer {
        display: flex;
      }
      .person {
        flex: 50%;
      }

      h4 {
        margin-block-start: unset;
        margin-block-end: unset;
      }
    `;
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
            ${isIE11() ? html`<style>${unsafeCSS(StatusCredits.styles)}</style>` : ''}
            <div class="creditsContainer">
              <h2>Meet the team</h2>
              <p>This group of wonderful people spent 160 days re-imagining Alaska's Flight Status.
                In 2021, when Seattle had a major snowstorm, guests flooded to our site for Flight Status information
                and were disappointed with the experience. This team was formed to take on that challenge, on top of 
                their
                regular day to day responsibilities. This Flight Status tiger team aimed to make the best Flight 
                Status experience out there.
                We hope you enjoy it!
              </p>
              <div class="peopleContainer">
                <div class="person">
  <auro-avatar img="https://www.alaskaair.com/-/media/E2B590D547404415ABF12AB08125B2EE"></auro-avatar>
                  <h4>Gus Naughton, Senior Software Engineer</h4>
                  <span class="favoriteStation">Favorite Station: KOA</span>
                  <p>Thoughts about this team: I've never been so excited for a project to take longer 
                    than expected - these folks made me laugh harder than I have in a while!</p>
                </div>
                <div class="person">
  <auro-avatar img="https://www.alaskaair.com/-/media/83D507A08FCB4152A945825280CB8F95"></auro-avatar>
                  <h4>Ryan Wilson, Senior UI Designer</h4>
                  <span class="favoriteStation">Favorite Station: Anywhere Hawaii</span>
                  <p>Thoughts about this team: We're kicking ass and taking names!</p>
                </div>
              </div>
              <div class="peopleContainer">
                <div class="person">
  <auro-avatar img="https://www.alaskaair.com/-/media/14039B29475242DC92838797676604E9"></auro-avatar>
                  <h4>Kyle Jones, UI Designer</h4>
                  <span class="favoriteStation">Favorite Station: Cinque Terre, Italy</span>
                  <p>Thoughts about this team: Can I work with this team everyday for the rest of forever?</p>
                </div>
                <div class="person">
  <auro-avatar img="https://www.alaskaair.com/-/media/3B0D9229607C4DA1B6206241C832FAD7"></auro-avatar>
                  <h4>Erika Langhauser, Senior Product Designer</h4>
                  <span class="favoriteStation">Favorite Station: Tokyo, Japan</span>
                  <p></p>
                </div>
              </div>
              <div class="peopleContainer">
                <div class="person">
  <auro-avatar img="https://www.alaskaair.com/-/media/7ADDD42206A949668F3E6E18696039D1"></auro-avatar>
                  <h4>Asher Miller, UX Writer</h4>
                  <span class="favoriteStation">Favorite Station: LHR (His first home - familiar 
                    but exotic, and always surprising!)</span>
                  <p>Thoughts about this team: Like a bunch of people putting together a 
                    jigsaw puzzle at a party.</p>
                </div>
              </div>
            </div>
        `;
  }
}

if (!customElements.get('status-credits')) {
  customElements.define('status-credits', StatusCredits);
}
