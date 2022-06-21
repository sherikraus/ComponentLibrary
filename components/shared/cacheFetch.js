import 'whatwg-fetch';

const _fetchMap = new Map();

/**
 * Minimal cache layer for Fetch API requests to prevent duplicate requests and load to target servers.
 *
 * @param {String} requestUri absolute or relative URI for the Fetch API request
 * @param {Object} options an optional key-value set of options, currently only a custom response parser
 * @return {Promise<String>} Fetch API response text
 */
export default function cacheFetch(requestUri, options = {responseParser: ((res) => res.text())}) {
  const responseParser = options.responseParser || ((res) => res.text());
  if (!_fetchMap.has(requestUri)) {
    _fetchMap.set(requestUri, window.fetch(requestUri).then(responseParser));
  }
  return _fetchMap.get(requestUri);
}
