import { ProfileState } from './../reducers/profile.reducers';
import { AppState } from './../../store/reducers';
import { createSelector } from '@ngrx/store';

export const selectProfileState = (state: AppState) => state.profile;

export const selectFavoritesHeroes = createSelector(
  selectProfileState,
  (profileState: ProfileState) => profileState.heroes
);

export const selectUserName = createSelector(
  selectProfileState,
  (profileState: ProfileState) => profileState.name
);
