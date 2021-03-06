import { ProfileState } from './../reducers/profile.reducers';
import { AppState } from './../../store/reducers';
import { createSelector } from '@ngrx/store';

export const selectProfileState = (state: AppState) => state.profile;

export const selectIdOfFavoritesHeroes = createSelector(
  selectProfileState,
  (profileState: ProfileState) => profileState.heroes
);

export const selectUserName = createSelector(
  selectProfileState,
  (profileState: ProfileState) => profileState.name
);

export const selectAvatarUrl = createSelector(
  selectProfileState,
  (profileState: ProfileState) => profileState.avatarImageUrl
);

export const selectProfileLoader = createSelector(
  selectProfileState,
  (profileState: ProfileState) => profileState.loader
);

export const selectIdOfChatChannels = createSelector(
  selectProfileState,
  (profileState: ProfileState) => profileState.channels
);

export const selectPushToFavoritesBtnDisabled = createSelector(
  selectProfileState,
  (profileState: ProfileState) => profileState.pushToFavoritesBtnDisabled
);
