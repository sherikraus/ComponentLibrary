const fetch = require('node-fetch');
const parser = require('fast-xml-parser');
const parserOptions = {
  attributeNamePrefix: '',
  ignoreAttributes: false,
  allowBooleanAttributes: true,
  parseAttributeValue: true,
};
async function getData() {
  const res = await fetch('http://etinfoservicecore-prod.trafficmanager.net/api/etinfo/1/allairlines');
  const text = await res.text();
  ETAirlines = parser.parse(text, parserOptions);
  // decouple ETInfo structure from the lamborghini
  return ETAirlines['ETAirlines']['Airlines']['Airline'].map((airline) => ({
    code: airline.Code,
    name: airline.OperatedByName,
    shortName: airline.DisplayName,
  }));
}

module.exports = getData;
