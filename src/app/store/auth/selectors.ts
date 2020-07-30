import { AuthState } from './reducers';
import { createSelector } from '@ngrx/store';



const _selectEmailVerified = (state) => state.emailVerified


export const selectEmailVerifies = createSelector(_selectEmailVerified, (state: AuthState) => state.emailVerified)

