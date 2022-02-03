export function makeImagePath(id: string, format?: string) {
    const url = `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
  return url;
}
