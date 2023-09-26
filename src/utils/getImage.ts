function getImage(wdith: number, address: string): string {
  return `https://image.tmdb.org/t/p/w${wdith}${address}`;
}

export default getImage;
