import {css, html, LitElement} from 'lit-element';
import stylesCss from './styles-css.js';
import airports from '../../../hooks/airports-data';
import '@aurodesignsystem/auro-avatar';
import '@aurodesignsystem/auro-skeleton';


class AirportAvatar extends LitElement {
  static get properties() {
    return {
      iata: {type: String, reflect: true},
      lg: {type: Boolean, reflect: true},
      image: {type: String, reflect: true},
      loaded: {type: Boolean, reflect: true},
    };
  }
  airport = null;

  static get styles() {
    return css`${stylesCss}`;
  }

  findLocation(error) {
    this.airport = airports.find((airport) => airport.code === this.iata?.trim()?.toUpperCase());
    switch (this.airport?.country) {
      case 'US':
        switch (this.airport.region) {
          // West US
          case 'AK':
          case 'CA':
          case 'NV':
          case 'OR':
          case 'UT':
          case 'WA':
            this.image = 'https://www.alaskaair.com/-/media/E2F20BD0C34247A597FB00C0B6F714CC';
            break;
          // Hawaii
          case 'HI':
            this.image = 'https://www.alaskaair.com/-/media/7E75846DE9BE4F48827695D109851A07';
            break;
          // Rockies
          case 'ID':
          case 'MO':
          case 'WY':
          case 'CO':
            this.image = 'https://www.alaskaair.com/-/media/DE37F26FEA6A4455B894505ADEDE879D';
            break;
          // Southwest
          case 'AZ':
          case 'NM':
          case 'OK':
          case 'TX':
            this.image = 'https://www.alaskaair.com/-/media/B210B0F805D9410280FC9AE71A120953';
            break;
          // Midwest
          case 'OH':
          case 'MI':
          case 'IN':
          case 'WI':
          case 'IL':
          case 'MN':
          case 'IA':
          case 'MS':
          case 'ND':
          case 'SD':
          case 'NE':
          case 'KS':
            this.image = 'https://www.alaskaair.com/-/media/8D5FE94CF30F4F91A89B21B9BC132331';
            break;
          // Upper South
          case 'KY':
          case 'TN':
          case 'VA':
          case 'WV':
            this.image = 'https://www.alaskaair.com/-/media/24BC167237CB4ED9911770FF3EBE7610';
            break;
          // Southeast
          case 'GA':
          case 'AL':
          case 'MS':
          case 'SC':
          case 'NC':
          case 'OK':
          case 'AR':
          case 'FL':
          case 'LA':
            this.image = 'https://www.alaskaair.com/-/media/62E393DAD5724B308E2C855E6E1487E4';
            break;
          // Midatlantic
          case 'DE':
          case 'MD':
          case 'NJ':
          case 'NY':
          case 'PA':
          case 'DC':
            this.image = 'https://www.alaskaair.com/-/media/83276B984CF440BF8DFD832953A4E4CF';
            break;
          // New England
          case 'CT':
          case 'ME':
          case 'MA':
          case 'NH':
          case 'RI':
          case 'VT':
            this.image = 'https://www.alaskaair.com/-/media/98DD4BB24C794439B7FECB3B203B3B33';
            break;
        }
        break;
      // canada
      case 'CA':
        switch (this.airport.region) {
          // british columbia
          case 'BC':
            this.image = 'https://www.alaskaair.com/-/media/BB78255D92CD4125819F58172D1FE5AA';
            break;
          // alberta
          case 'AB':
            this.image = 'https://www.alaskaair.com/-/media/AA856D36154A4A3EA996E4739F096250';
            break;
          // manitoba
          case 'MB':
            this.image = 'https://www.alaskaair.com/-/media/BAFCE32101B84762ADBBFC7B347D1284';
            break;
          // ontario
          case 'ON':
            this.image = 'https://www.alaskaair.com/-/media/D83DA3CE5D8845E09EC2E81B150FD380';
            break;
          // quebec
          case 'QC':
            this.image = 'https://www.alaskaair.com/-/media/DD86C528FF574905AFD13310F336934E';
            break;
          // nova scotia
          case 'NS':
            this.image = 'https://www.alaskaair.com/-/media/11A8083E5B6E4DD8941C16BACD2C0417';
            break;
          // yukon
          case 'YT':
            this.image = 'https://www.alaskaair.com/-/media/F05F29ACFED24312A6AFAC8FC17FEAF8';
            break;
        }
        break;
      // Central America
      case 'BZ':
      case 'CR':
      case 'SV':
      case 'GT':
      case 'HN':
      case 'MX':
      case 'NI':
      case 'PA':
        this.image = 'https://www.alaskaair.com/-/media/07B5B90787774F2399FEBE42116BD85C';
        break;
      // South America - Andes
      case 'AR':
      case 'CL':
      case 'PE':
        this.image = 'https://www.alaskaair.com/-/media/49937C19922E4019A0E3DE526E589423';
        break;
      // South America - Amazon
      case 'BR':
      case 'EC':
      case 'VE':
      case 'GY':
      case 'SR':
        this.image = 'https://www.alaskaair.com/-/media/40533A16ECE940FD9614D2AED72B7825';
        break;
      // South America - Georgia
      case 'GE':
        this.image = 'https://www.alaskaair.com/-/media/754003704ACD49049759627BEAF6C1B9';
        break;
      // South America - Uruguay
      case 'UY':
        this.image = 'https://www.alaskaair.com/-/media/D9451A05157C43268CA067327EA47FDE';
        break;
      // Carribbean
      case 'AI':
      case 'AG':
      case 'AW':
      case 'BS':
      case 'BB':
      case 'BM':
      case 'BQ':
      case 'KY':
      case 'CU':
      case 'CW':
      case 'DM':
      case 'DO':
      case 'GD':
      case 'GP':
      case 'HT':
      case 'JM':
      case 'MQ':
      case 'KN':
      case 'LC':
      case 'SX':
      case 'VC':
      case 'TT':
      case 'TC':
      case 'VI':
        this.image = 'https://www.alaskaair.com/-/media/E6A38BBB347C40B9A6E7E2D1A5066311';
        break;
      // Puerto Rico
      case 'PR':
        this.image = 'https://www.alaskaair.com/-/media/5A032802056C4695A7F08131A1D25652';
        break;
      // Western Africa
      case 'CI':
      case 'GH':
      case 'GN':
      case 'NG':
        this.image = 'https://www.alaskaair.com/-/media/5B73615B5B474709BEEF1E8378E44C46';
        break;
      // Middle Africa
      case 'AO':
        this.image = 'https://www.alaskaair.com/-/media/E0D8F1CA16BA4EA79F3342E396194442';
        break;
      // Eastern Africa
      case 'DJ':
      case 'ET':
      case 'KE':
      case 'MU':
      case 'MZ':
      case 'RW':
      case 'SC':
      case 'SO':
      case 'UG':
      case 'TZ':
      case 'ZM':
      case 'ZW':
        this.image = 'https://www.alaskaair.com/-/media/FA4ADCC11BA34017A817D1DC258A4486';
        break;
      // Southern Africa
      case 'NA':
      case 'ZA':
        this.image = 'https://www.alaskaair.com/-/media/A7AAE4128F55450D98C35D1538E1F16C';
        break;
      // Eastern Asia
      case 'CN':
      case 'KR':
      case 'JP':
        this.image = 'https://www.alaskaair.com/-/media/5EB0ECADE1144DA9BA1F3081F51B8C69';
        break;
      // Southeast Asia
      case 'BN':
      case 'KH':
      case 'ID':
      case 'MY':
      case 'MM':
      case 'PH':
      case 'SG':
      case 'TH':
      case 'MV':
      case 'VN':
        this.image = 'https://www.alaskaair.com/-/media/27C0F7CC0C46492C877E04173643FE26';
        break;
      // Western Asia
      case 'AM':
      case 'AZ':
      case 'BH':
      case 'CY':
      case 'GE':
      case 'IQ':
      case 'IL':
      case 'JO':
      case 'KW':
      case 'LB':
      case 'OM':
      case 'QA':
      case 'SA':
      case 'TR':
      case 'AE':
        this.image = 'https://www.alaskaair.com/-/media/615E87B034094CE7AFBBD6CD32366632';
        break;
      // Micronesia
      case 'GU':
      case 'KI':
      case 'WS':
      case 'TO':
      case 'TV':
      case 'FJ':
      case 'NC':
      case 'PG':
      case 'SB':
      case 'VU':
        this.image = 'https://www.alaskaair.com/-/media/C3B46476C92949C3A6C4098C08C6D96C';
        break;
      // New Zealand
      case 'NZ':
        this.image = 'https://www.alaskaair.com/-/media/A55340A5C1C04AFBB72E2655173459B6';
        break;
      // Iberian Peninsula
      case 'ES':
      case 'PT':
      case 'GI':
        this.image = 'https://www.alaskaair.com/-/media/49863780797249A9B547E5CC0C2E2CA4';
        break;
      // Balkans
      case 'AL':
      case 'BG':
      case 'HR':
      case 'CS':
      case 'SI':
        this.image = 'https://www.alaskaair.com/-/media/7D4F67672DF6454A9DCB3D4B1C1B259E';
        break;
      // Area of Akyarw
      case 'IT':
      case 'MT':
        this.image = 'https://www.alaskaair.com/-/media/ABA46322A05744248CD1470FCB0120CD';
        break;
      // Eastern Europe
      case 'CZ':
      case 'HU':
      case 'PL':
      case 'RO':
      case 'RU':
      case 'UA':
        this.image = 'https://www.alaskaair.com/-/media/1F672154B4DC483ABF7668C4ABD4E7FE';
        break;
      // Baltic States
      case 'EE':
      case 'LV':
      case 'LT':
        this.image = 'https://www.alaskaair.com/-/media/8ACDE8A5F2A044A0BC33700372D50CD4';
        break;
      // British Isles
      case 'IE':
      case 'GB':
        this.image = 'https://www.alaskaair.com/-/media/363A5F4FBFF24711925A019D270DFBF3';
        break;
      // Nordic
      case 'DK':
      case 'FI':
      case 'IS':
      case 'NO':
      case 'SE':
        this.image = 'https://www.alaskaair.com/-/media/429A1AD2BD2C427CA435A19F2ADE2381';
        break;
      // Belgium & Luxemborg
      case 'BE':
      case 'LU':
        this.image = 'https://www.alaskaair.com/-/media/E86775D3C3C94CDA9280021BAD00EE4E';
        break;
      case 'FR':
        this.image = 'https://www.alaskaair.com/-/media/93EA905232EF4B8F83998E627D3770DC';
        break;
      case 'DE':
        this.image = 'https://www.alaskaair.com/-/media/72D2B66AE84D46119B039A714D0ADF6F';
        break;
      case 'NL':
        this.image = 'https://www.alaskaair.com/-/media/EC66F4C7FED447F1A480708275830319';
        break;
      case 'HK':
        this.image = 'https://www.alaskaair.com/-/media/AA0D1426A5C2491F987DB703CDC3757A';
        break;
      case 'FI':
        this.image = 'https://www.alaskaair.com/-/media/1430E10772004E66BB58D2A978D37583';
        break;
      case 'ES':
        this.image = 'https://www.alaskaair.com/-/media/49863780797249A9B547E5CC0C2E2CA4';
        break;
      case 'JP':
        this.image = 'https://www.alaskaair.com/-/media/35820D2A17DC448394500C8239E2594C';
        break;
      case 'MA':
        this.image = 'https://www.alaskaair.com/-/media/2B5487FBCDBE4F1689C3BF88BA832BF1';
        break;
      case 'MY':
        this.image = 'https://www.alaskaair.com/-/media/2D58F32EA032451D9493CD19D386C759';
        break;
      case 'RU':
        this.image = 'https://www.alaskaair.com/-/media/793B48E3CFC84AA6A041751D7EC90BA1';
        break;
      case 'AU':
        this.image = 'https://www.alaskaair.com/-/media/C4D76794D044427BB70D0571BA01BE4B';
        break;
      case 'LK':
        this.image = 'https://www.alaskaair.com/-/media/104614C814AA466E9A202BFD5D816F9E';
        break;
      default:
        this.image = 'https://resource.alaskaair.net/-/media/Images/common-assets/destinations/360x360/partner';
        break;
    }
  }
  updated(changedProperties) {
    if (changedProperties.has('iata')) {
      this.image = 'https://resource.alaskaair.net/-/media/Images/common-assets/destinations/360x360/' + this.iata + '.png';
      this.loaded = false;
    }
  }
  onImageLoad() {
    this.loaded = true;
  }
  render() {
    return html`
        <span aria-hidden="true">
          <auro-skeleton shape="circle"></auro-skeleton>
          <img loading="lazy" @load=${this.onImageLoad} @error="${this.findLocation}"
           src="${this.image}" alt="Airport image">
        </span>
    `;
  }
}

if (!customElements.get('airport-avatar')) {
  customElements.define('airport-avatar', AirportAvatar);
}
