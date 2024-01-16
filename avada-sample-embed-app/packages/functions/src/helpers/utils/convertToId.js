export function convertToId(urlId) {
  return Number(urlId.split('/').slice(-1));
}
