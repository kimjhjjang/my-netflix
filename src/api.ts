const API_KEY = "cecb32ef334e1e99acad636e9c0aea98";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
    id : number;
    backdrop_path : string;
    poster_path : string;
    title : string;
    overview : string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_page: number;
  total_result: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-kr`).then(
    (response) => response.json()
  );
}
