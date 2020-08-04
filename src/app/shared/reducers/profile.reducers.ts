import { postHeroToFavoriteSuccessAction } from '../actions/profile.actions';
import {
  ProfileActionsUnion,
  getFavoritesHeroesSuccessAction,
  initProfileStateSuccessAction,
} from './../actions/profile.actions';
import { createReducer, on } from '@ngrx/store';

const initialState: ProfileState = {
  avatarImageUrl: '',
  name: '',
  email: '',
  heroes: [],
};

export interface ProfileState {
  avatarImageUrl: string;
  name: string;
  email: string;
  heroes: number[];
}

const reducer = createReducer(
  initialState,
  on(getFavoritesHeroesSuccessAction, (state, action) => ({
    ...state,
    favoritesHeroes: [...state.heroes, action.payload],
  })),
  on(initProfileStateSuccessAction, (state, action) => ({
    ...state,
    ...action.state
  })),
  on(postHeroToFavoriteSuccessAction, (state, action) => ({
    ...state,
    heroes: [...state.heroes, action.payload]
  }))
);

export function profileReducer(
  state: ProfileState,
  action: ProfileActionsUnion
) {
  return reducer(state, action);
}
