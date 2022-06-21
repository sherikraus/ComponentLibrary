export const getCityStateFromZip = (CountryAbbreviation, ZipCode) => {
  return fetch(
      `https://www.alaskaair.com/CityStateLookup?Country=${CountryAbbreviation.toUpperCase()}&zip=${ZipCode}`,
  ).then((data) => {
    console.log('data ', data);
    return data.json();
  });
};
