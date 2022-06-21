import cacheFetch from './cacheFetch';

export async function buildIcon(icon) {
  const requestUri = `https://p2pcontent-fd-prod.azurefd.net/icons/${icon}.svg`;
  const htmlString = await cacheFetch(requestUri);
  const dom = new DOMParser().parseFromString(htmlString, 'text/html');
  return dom.body.firstChild;
}

export async function buildArbitraryHTML(url) {
  const htmlString = await cacheFetch(url);
  const dom = new DOMParser().parseFromString(htmlString, 'text/html');
  return dom.body.firstChild;
}

export default async function assignIconFromProperty(property, fallback) {
  if (property !== '') {
    property = await buildIcon(!!property ? property : fallback);
  }
  return property;
}
