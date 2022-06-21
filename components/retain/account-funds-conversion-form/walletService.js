import 'whatwg-fetch';

/*
* This connects to the Account wallet service which is used in the form component to get
* Guest Mileage Plan Information.
*/
export async function submitWalletConversion(mileagePlanNumber, apiKey, submitWalletConversionEndpoint,
    amountToConvert, getJwtEndpoint) {
  const jwt = await _fetchJwt(getJwtEndpoint);
  if (!jwt) {
    return;
  }
  const headers = new Headers();
  headers.append('Ocp-Apim-Subscription-Key', apiKey);
  headers.append('Authorization', `Bearer ${jwt}`);
  headers.append('Content-Type', 'application/json');
  const raw = JSON.stringify({'mileagePlanNumber': mileagePlanNumber, 'amountToConvert': amountToConvert});
  const requestOptions = {
    method: 'POST',
    headers,
    body: raw,
    redirect: 'follow',
  };
  return window.fetch(submitWalletConversionEndpoint, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to submit wallet conversion`);
        }
        return response.text();
      })
      .then((text) => text)
      .catch((error) => {
        // console.error('submitWalletConversion() failed', error);
      });
};

export async function getWalletConversion(mileagePlanNumber, apiKey, getWalletConversionEndpoint, getJwtEndpoint) {
  const jwt = await _fetchJwt(getJwtEndpoint);
  if (!jwt) {
    return;
  }
  const headers = new Headers();
  headers.append('Ocp-Apim-Subscription-Key', apiKey);
  headers.append('Authorization', `Bearer ${jwt}`);
  const requestOptions = {
    method: 'GET',
    headers,
  };
  return window.fetch(`${getWalletConversionEndpoint}${mileagePlanNumber}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to get wallet conversion`);
        }
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .then((json) => json)
      .catch((error) => {
        // console.error('getWalletConversion() failed', error);
      });
};

/**
 * Gets the user cookie
 * @return {String} The MP number or empty if the user is not logged in.
 * Example cookie information {
 *   FN: 'first name',
 *   LN: 'last name',
 *   SF: 'name suffix (Sr, Jr, etc.)',
 *   MP: 'mileage plan number',
 *   TS: 'tier status (Standard, MVP, etc)',
 *   BM: 'total miles balance',
 *   NN: 'nickname',
 *   SU: 'indicates is super user (case insensitive TRuE or other)'
 * }
 */
export const getMileagePlanNumber = () => {
  const userInfoCookieString = document.cookie
      .split('; ')
      .find((row) => row.indexOf('AS%5FNAME') === 0);
  return userInfoCookieString ?
    _getQueryParameter('MP', userInfoCookieString) :
    '';
};

// Inspired by:
// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
const _getQueryParameter = (key, querystring) => {
  key = key.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(querystring);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const _fetchJwt = async (getJwtEndpoint = 'https://www.alaskaair.com/account/token') => {
  return window.fetch(getJwtEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch JWT');
        }
        return response.json();
      })
      .then((data) => {
        if (!data.loggedIn) {
          throw new Error('Failed to log in');
        }
        return data.token;
      }).catch((error) => {
        // console.error('_fetchJwt() failed', error);
      });
};
