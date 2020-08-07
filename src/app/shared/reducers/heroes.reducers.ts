import {
  getHeroDetailsAction,
  getFavoritesHeroesByIdAction,
  unsetHeroesStateAction,
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
};

export interface HeroesState {
  heroes: {
    [id: string]: HeroResponseResult;
  };
  loader: boolean;
}

const reducer = createReducer<HeroesState>(
  initialState,
  on(getHeroesAction, (state) => ({
    ...state,
    loader: true,
  })),
  on(getHeroesSuccessAction, (state, action) => ({
    ...state,
    heroes: {
      ...state.heroes,
      ...action.payload.reduce((prev, curr) => {
        return { ...prev, [curr.id]: curr };
      }, {}),
    },
    loader: false,
  })),
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
  on(unsetHeroesStateAction, () => initialState)
);

export function heroesReducer(state: HeroesState, action: Action): HeroesState {
  return reducer(state, action);
}
