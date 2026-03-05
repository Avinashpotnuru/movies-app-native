export const getImage = (path: string, size = "w500") =>
  `https://image.tmdb.org/t/p/${size}${path}`;
