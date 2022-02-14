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

interface ISearch {
  adult : boolean;
  backdrop_path : string;
  id :  number;
  media_type : string;
  original_language : string;
  original_title :string;
  overview :string;
  popularity : number;
  poster_path :string;
  release_date :string;
  title :string;
  video : boolean;
  vote_average : number;
  vote_count :number;
  name : string;
}

export interface IGetSearchResult {
  results : ISearch[];
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-kr`).then(
    (response) => response.json()
  );
};

export function getSearchMovies(keyword:string, page?:string) {
  const url = `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko-kr&query=${keyword}&page=${page}&include_adult=false`;
  return fetch(url).then(
    (response) => response.json()
  );
};


interface IPopularMovies {
  adult : boolean;
  backdrop_path : string;
  id : number;
  original_language : string;
  original_title : string;
  overview : string;
  popularity : number;
  poster_path : string;
  release_date : string;
  title : string;
  vote_average : number;
  vote_count : number;
}

export interface IPopularMoviesResult {
  results : IPopularMovies[];
}

export function getPopularMovies(){
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-kr`).then(
    (response) => response.json()
  );
}

export function getUpcomingMovie(){
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR`).then((response) => response.json());
}

export function getTopRateMovie(){
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`).then((response) => response.json());
}

//On the /tv page implement sliders for:

interface ITv {
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface IGetTvResult {
  page : number;
  results : ITv[],
}

export function getTopRateTv(){
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR`).then((response) => response.json());
}
export function getLatestTv(){
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}&language=ko-KR`).then((response) => response.json());
}
export function getPopularTv(){
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR`).then((response) => response.json());
}
export function getAiringTv(){
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko-kr`).then((response) => response.json());
}


//Airing Today
// https://api.themoviedb.org/3/tv/airing_today?api_key=cecb32ef334e1e99acad636e9c0aea98&language=ko-kr

// tv 프로그램 검색했을때
//https://api.themoviedb.org/3/search/tv?api_key=cecb32ef334e1e99acad636e9c0aea98&language=ko-kr&page=1&query=<keyword>&include_adult=false