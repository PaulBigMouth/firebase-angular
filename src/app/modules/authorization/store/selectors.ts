import { AuthState } from './reducers';
import { createSelector } from '@ngrx/store';



const authState = (state: AuthState) => state


export const selectSignProgress = createSelector(authState, (state) => state.isSignProgress)

