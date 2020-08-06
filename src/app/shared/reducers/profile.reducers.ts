import {
  ProfileActionsUnion,
  getFavoritesHeroesSuccessAction,
  initProfileStateSuccessAction,
  postHeroToFavoriteSuccessAction,
  removeHeroFromFavoriteSuccessAction,
  updateUserNameSuccessAction,
  uploadUserImageSuccessAction,
  getFavoritesHeroesAction,
  initProfileStateAction,
  postHeroToFavoriteAction,
  removeHeroFromFavoriteAction,
  updateUserNameAction,
  uploadUserImageAction
} from './../actions/profile.actions';
import { createReducer, on } from '@ngrx/store';

const initialState: ProfileState = {
  avatarImageUrl: '',
  name: '',
  email: '',
  uid: '',
  heroes: [],
  loader: false,
  channels: null
};

export interface ProfileState {
  avatarImageUrl: string;
  name: string;
  email: string;
  uid: string;
  heroes: number[];
  loader: boolean,
  channels: {
    [id: string]: string
  }
}

const reducer = createReducer(
  initialState,
  on(getFavoritesHeroesAction, (state) => ({
    ...state,
    loader: true
  })),
  on(getFavoritesHeroesSuccessAction, (state, action) => ({
    ...state,
    heroes: [...state.heroes, action.payload],
    loader: false
  })),
  on(initProfileStateAction, (state) => ({
    ...state,
    loader: true
  })),
  on(initProfileStateSuccessAction, (state, action) => ({
    ...state,
    ...action.state,
    loader: false
  })),
  on(postHeroToFavoriteAction, (state) => ({
    ...state,
    loader: true
  })),
  on(postHeroToFavoriteSuccessAction, (state, action) => ({
    ...state,
    heroes: [...state.heroes, action.payload],
    loader: false
  })),
  on(removeHeroFromFavoriteAction, (state) => ({
    ...state,
    loader: true
  })),
  on(removeHeroFromFavoriteSuccessAction, (state, action) => ({
    ...state,
    heroes: [...action.payload],
    loader: false
  })),
  on(updateUserNameAction, (state) => ({
    ...state,
    loader: true
  })),
  on(updateUserNameSuccessAction, (state, action) => ({
    ...state,
    name: action.payload,
    loader: false
  })),
  on(uploadUserImageAction, (state) => ({
    ...state,
    loader: true
  })),
  on(uploadUserImageSuccessAction, (state, action) => ({
    ...state,
    avatarImageUrl: action.payload,
    loader: false
  }))
);

export function profileReducer(
  state: ProfileState,
  action: ProfileActionsUnion
) {
  return reducer(state, action);
}
