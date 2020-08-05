import {
  ProfileActionsUnion,
  getFavoritesHeroesSuccessAction,
  initProfileStateSuccessAction,
  postHeroToFavoriteSuccessAction,
  removeHeroFromFavoriteSuccessAction,
  updateUserNameSuccessAction,
  uploadUserImageSuccessAction
} from './../actions/profile.actions';
import { createReducer, on } from '@ngrx/store';

const initialState: ProfileState = {
  avatarImageUrl: '',
  name: '',
  email: '',
  uid: '',
  heroes: [],
};

export interface ProfileState {
  avatarImageUrl: string;
  name: string;
  email: string;
  uid: string;
  heroes: number[];
}

const reducer = createReducer(
  initialState,
  on(getFavoritesHeroesSuccessAction, (state, action) => ({
    ...state,
    heroes: [...state.heroes, action.payload],
  })),
  on(initProfileStateSuccessAction, (state, action) => ({
    ...state,
    ...action.state,
  })),
  on(postHeroToFavoriteSuccessAction, (state, action) => ({
    ...state,
    heroes: [...state.heroes, action.payload],
  })),
  on(removeHeroFromFavoriteSuccessAction, (state, action) => ({
    ...state,
    heroes: [...action.payload],
  })),
  on(updateUserNameSuccessAction, (state, action) => ({
    ...state,
    name: action.payload
  })),
  on(uploadUserImageSuccessAction, (state, action) => ({
    ...state,
    avatarImageUrl: action.payload
  }))
);

export function profileReducer(
  state: ProfileState,
  action: ProfileActionsUnion
) {
  return reducer(state, action);
}
