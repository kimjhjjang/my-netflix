const API_KEY = "cecb32ef334e1e99acad636e9c0aea98";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
    id : number;
    backdrop_path : string;
    poster_path : string;
    title : string;
    overview : string;
    original_title: string;
    popularity:number;
    release_date: string;
    vote_average: number;
    vote_count: number;
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
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR`).then((response) => response.json());
}
export function getPopularTv(){
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR`).then((response) => response.json());
}
export function getAiringTv(){
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko-kr`).then((response) => response.json());
}


// get Details https://api.themoviedb.org/3/movie/476669?api_key=cecb32ef334e1e99acad636e9c0aea98&language=ko-kr
interface Moviekeyword{
  name : string
}

interface MovieProduction{
  id: number;
  logo_path: string;
  name: string;
}

export interface IGetDetails {
  adult : boolean;
  backdrop_path : string;
  budget : number;
  genres : Moviekeyword[];
  homepage : string;
  id : number;
  original_title : string;
  overview : string;
  popularity : number;
  poster_path : string;
  production_companies : MovieProduction[];
  release_date : string;
  revenue : number;
  runtime : number;
  status : string;
  tagline : string;
  title : string;
  video : boolean;
  vote_average : number;
  vote_count : number;
}

export function getContentDetails(id:string, type:string){
  return fetch(`${BASE_PATH}/${type}/${id}?api_key=${API_KEY}&language=ko-kr`).then((response) => response.json());
}

export interface ISimilar {
  backdrop_path : string;
  id : number;
  title : string;
  poster_path: string;
  release_date : string;
  vote_average: number;
  vote_count : number;
  overview : string;
  popularity : number;
} 

export function getContentSimilars(id:string, type:string){
  return fetch(`${BASE_PATH}/${type}/${id}/similar?api_key=${API_KEY}&language=ko-kr`).then((response) => response.json());
}