import { AppStore } from './../../../store/reducers';
import { AuthState } from './reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';

const _selectSignProgress = (state: AppStore) => state.auth;

// export const selectSignProgress = createSelector(_selectSignProgress, (progress) => progress)
export const selectSignProgress = createSelector(
  _selectSignProgress,
  (authStore: AuthState) => authStore.isSignProgress
);
