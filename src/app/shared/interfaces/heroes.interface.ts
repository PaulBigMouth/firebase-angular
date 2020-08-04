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
	location: Object;
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