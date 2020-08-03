import { AppStore } from './../../../store/reducers';
import { AuthState } from './reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';

const _selectSignProgress = (state: AppStore) => state.auth;


const authState = (state: AuthState) => state


export const selectSignProgress = createSelector(authState, (state) => state.isSignProgress)

