import { HeroesActions, getHeroesLoadAction, getHeroesLoadSuccessAction, getHeroLoadDetailsSuccessAction } from './actions';
import { createReducer, on, Action } from '@ngrx/store';

const initialState = {
	heroes: {},
	isFavorite: false
};

export interface HeroesState {
	heroes: {
		[id: string]: HeroResponseResult
	};
	isFavorite: boolean
}


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

const heroesReducer = createReducer(
	initialState,
	on(getHeroesLoadSuccessAction, (state, action) => ({
		...state,
		heroes: {
			...state.heroes,
			...action.payload.reduce((prev, curr) => {
				return {...prev, [curr.id]: curr}
			}, {})
		}
	})),
	on(getHeroLoadDetailsSuccessAction, (state, action) => ({
		...state,
		heroes: {
			...state.heroes,
			[action.payload.id]: {...action.payload} 
		}
	}))

)

export function reducer(state: HeroesState, action: Action): HeroesState {
	return heroesReducer(state, action)
}
