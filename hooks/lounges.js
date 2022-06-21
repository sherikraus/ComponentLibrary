const fetch = require('node-fetch');
async function getData() {
  const res = await fetch('https://loungeinbackstorageprod.blob.core.windows.net/helperfiles/metadata.json');
  const json = await res.json();
  return json['locations'];
}

module.exports = getData;

