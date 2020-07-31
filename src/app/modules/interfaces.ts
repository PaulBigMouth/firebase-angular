export interface User {
  name?: string;
  email: string;
  phone?: string;
  password: string;
}

export type Message = string;

export interface HeroesResponse {
  info: Object;
  results: HeroResponseResult[];
}

export interface HeroResponseInfo {
  count: number | string;
  next: string;
  pages: number;
  prev: string;
}

export interface HeroResponseResult {
  created: string;
  episode: [];
  gender: string;
  id: number;
  image: string;
  location: Object;
  name: string;
  origin: Object;
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface ParamsForLoadHeroes {
  name?: string;
  id?: string;
  page?: string;
  status?: string;
}