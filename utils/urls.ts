export function getFrontEndURL() {
  // TODO: environments
  const url = process.env.NEXT_PUBLIC_PRODUCTION_URL;

  return `${process.env.NEXT_PUBLIC_URL_PROTOCOL?.trim()}${url?.trim()}`;
}
