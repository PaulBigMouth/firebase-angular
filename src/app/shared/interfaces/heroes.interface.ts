export interface HeroesResponse {
  info: HeroResponseInfo;
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
  location: any; // OBject
  name: string;
  origin: any;
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

export interface SelectOption {
  name: string;
}

export interface Filter {
  name?: string;
  gender?: string;
  status?: string;
}
