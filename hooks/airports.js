const fetch = require('node-fetch');
async function getData() {
  const res = await fetch('http://etinfoservicecore-prod.trafficmanager.net/api/1/Airports');
  const json = await res.json();
  return json.map((airport) => ({
    name: airport.name,
    itmName: airport.itmName,
    code: airport.code,
    country: airport.country,
    region: airport.region,
    alaskaFlysToAirport: airport.alaskaFlysToAirport,
  }));
}

module.exports = getData;
