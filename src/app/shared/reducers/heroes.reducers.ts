import { createReducer, on, Action } from '@ngrx/store';
import { HeroResponseResult } from '../interfaces/heroes.interface';
import {
  getHeroesLoadSuccessAction,
  getHeroLoadDetailsSuccessAction,
} from '../actions/heroes.actions';

const initialState = {
  heroes: {},
};

export interface HeroesState {
  heroes: {
    [id: string]: HeroResponseResult;
  };
}

const reducer = createReducer(
  initialState,
  on(getHeroesLoadSuccessAction, (state, action) => ({
    ...state,
    heroes: {
      ...state.heroes,
      ...action.payload.reduce((prev, curr) => {
        return { ...prev, [curr.id]: curr };
      }, {}),
    },
  })),
  on(getHeroLoadDetailsSuccessAction, (state, action) => ({
    ...state,
    heroes: {
      ...state.heroes,
      [action.payload.id]: { ...action.payload },
    },
  })),
);

export function heroesReducer(state: HeroesState, action: Action): HeroesState {
  return reducer(state, action);
}
