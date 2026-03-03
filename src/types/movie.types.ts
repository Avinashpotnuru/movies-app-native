export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MoviesCardType = Pick<Movie, "id" | "title" | "poster_path"> & {
  enableTitle?: boolean;
  style?: React.CSSProperties;
};

export interface Genre {
  id: number;
  name: string;
}

export interface MovieTitleCardProps {
  movieTitle: string;
  movieGenre: Genre[];
  runTime: number;
}

export interface MovieCastProps {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface SocialMediaLinks {
  facebook: string;
  instagram: string;
  twitter: string;
}
export interface MovieBackDropImage {
  aspect_ratio: number;
  height: number;
  iso_3166_1: string;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
