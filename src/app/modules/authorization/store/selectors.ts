import { AppState } from './../../../store/reducers';
import { AuthState } from './reducers';
import { createSelector } from '@ngrx/store';

const selectAuthState = (state: AppState) => state.auth;

export const selectSignProgress = createSelector(
  selectAuthState,
  (state: AuthState) => state.isSignProgress
);


export const selectUserId = createSelector(
  selectAuthState,
  (state: AuthState) => state.idUser
)