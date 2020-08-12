import {
  getHeroDetailsAction,
  getFavoritesHeroesByIdAction,
  unsetHeroesStateAction,
  getHeroesWithFiltersAction,
  getHeroesWithFiltersSuccessAction,
  getHeroesWithFiltersErrorAction,
} from './../actions/heroes.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { HeroResponseResult } from '../interfaces/heroes.interface';
import {
  getHeroesSuccessAction,
  getHeroDetailsSuccessAction,
  getFavoritesHeroesByIdSuccessAction,
  getHeroesAction,
} from '../actions/heroes.actions';

const initialState = {
  heroes: {},
  loader: false,
  pages: 1,
};

export interface HeroesState {
  heroes: {
    [id: string]: HeroResponseResult;
  };
  loader: boolean;
  pages: number;
}

const reducer = createReducer<HeroesState>(
  initialState,
  on(getHeroesAction, (state) => ({
    ...state,
    loader: true,
  })),
  on(getHeroesSuccessAction, (state, action) => {
    console.log(action.payload.results);
    return {
      ...state,
      heroes: {
        ...state.heroes,
        ...action.payload.results.reduce((prev, curr) => {
          return { ...prev, [curr.id]: curr };
        }, {}),
      },
      pages: action.payload.info.pages,
      loader: false,
    };
  }),
  on(getHeroDetailsAction, (state) => ({
    ...state,
    loader: true,
  })),
  on(getHeroDetailsSuccessAction, (state, action) => ({
    ...state,
    heroes: {
      ...state.heroes,
      [action.payload.id]: { ...action.payload },
    },
    loader: false,
  })),
  on(getFavoritesHeroesByIdAction, (state) => ({
    ...state,
    loader: true,
  })),
  on(getFavoritesHeroesByIdSuccessAction, (state, action) => ({
    ...state,
    heroes: {
      ...state.heroes,
      ...action.payload.reduce((prev, curr) => {
        return { ...prev, [curr.id]: curr };
      }, {}),
    },
    loader: false,
  })),
  on(getHeroesWithFiltersAction, (state) => ({
    ...state,
    loader: true,
  })),
  on(getHeroesWithFiltersSuccessAction, (state, action) => ({
    ...state,
    heroes: action.payload.results.reduce((prev, curr) => {
      return { ...prev, [curr.id]: curr };
    }, {}),
    loader: false,
    pages: action.payload.info.pages,
  })),
  on(getHeroesWithFiltersErrorAction, (state) => ({
    ...state,
    loader: false,
  })),
  on(unsetHeroesStateAction, () => initialState)
);

export function heroesReducer(state: HeroesState, action: Action): HeroesState {
  return reducer(state, action);
}
