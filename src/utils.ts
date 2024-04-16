export const getImageUrl = (name: string | undefined, dir: string) => {
  return new URL(`./assets/${dir}/${name}.jpg`, import.meta.url).href
}
