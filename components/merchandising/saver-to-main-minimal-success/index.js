import {css, html, LitElement} from 'lit-element';
import assignIconFromProperty from '../../shared/buildIcon';
class SaverToMainMinimalSuccess extends LitElement {
  static get properties() {
    return {
      imageRight: {type: Boolean},
      firstIcon: {type: String},
      secondIcon: {type: String},
      thirdIcon: {type: String},
    };
  }

  async firstUpdated() {
    this.firstIcon = await assignIconFromProperty(this.firstIcon, 'luggage');
    this.secondIcon = await assignIconFromProperty(this.secondIcon, 'seat');
    this.thirdIcon = await assignIconFromProperty(this.thirdIcon, 'flight-changes');
  }

  static get styles() {
    return css`
      :host {
        font-family: 'ASCircular-Medium', Helvetica Neue, Arial, sans-serif;
        display: block;      
        margin-top: 32px;
        font-size: 16px;
        border-bottom: solid 1px rgba(0, 0, 0, 0.15);
        border-top: solid 1px rgba(0, 0, 0, 0.15);
        padding: 24px;
      }

      slot[name=title] {
        color: rgb(34, 34, 34);
        font-size: 20px;
        font-weight: 500;
        min-height: 28px;
        letter-spacing: -0.2px;
        line-height: 28px;
        display: block;
      }

      slot[name=sub-title] {
        color: rgb(98, 107, 121);
        font-size: 14px;
        font-weight: 300;
        min-height: 20px;
        line-height: 20px;
        display: block;
      }

      slot[name=disclaimer] {
        color: rgb(98, 107, 121);
        font-size: 12px;
        font-weight: 300;
        margin-left: 36px;
        display: block;
        margin-top: -12px;
      }

      .content {
        padding: 1em 0.5em;
        padding-bottom: 0;
      }

      .content svg {
        height: 24px !important;
        width: 24px !important;
        vertical-align: middle;
        position: absolute;
        margin-left: -36px;
      }

      .content svg, .content svg path {
        fill: #91be62;
      }

      .content-item {
        color: rgb(98, 107, 121);
        font-weight: 300;
        min-height: 24px;
        line-height: 24px;
        padding: 0.5em 0;
        margin-left: 36px;
      }

      .top-divider {
        display: flex;
        justify-content: center;
      }

      .top-divider img {
        margin-top: -48px;
        border-radius: 50%;
        height: 48px;
        width: 48px;
        display: block;
      }
      
    `;
  }

  render() {
    return html`
            <div class="top-divider">
              <img
                aria-label="thumbs up"
                src="https://resource.alaskaair.net/-/media/Images/pathtopurchase/thumbs-up-rotated" />
            </div>
            <slot name="title">Excellent! You've upgraded to Main.</slot>
            <slot name="sub-title">Now you'll enjoy:</slot>
            <div class="content">
              <div class="content-item">
                ${this.firstIcon}
                <slot name="content-item-one">General boarding/overhead bin access</slot>
              </div>
              <div class="content-item">
                ${this.secondIcon}
                <slot name="content-item-two">More seat options</slot>
              </div>
              <div class="content-item">
                ${this.thirdIcon}
                <slot name="content-item-three">Changes and cancellations allowed</slot>
              </div>
              <slot name="disclaimer" style="display: none;">(Fees may apply.)</slot>
            </div>
        `;
  }
}

if (!customElements.get('saver-to-main-minimal-success')) {
  customElements.define('saver-to-main-minimal-success', SaverToMainMinimalSuccess);
}
