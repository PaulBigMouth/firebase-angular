import { AuthState } from './reducers';
import { createSelector } from '@ngrx/store';



const _selectSignProgress = (state: AuthState) => state.isSignProgress


export const selectSignProgress = createSelector(_selectSignProgress, (progress) => progress)

