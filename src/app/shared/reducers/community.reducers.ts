import { ProfileState } from './profile.reducers';
import { getVisibleUsersSuccessAction, getVisibleUsersErrorAction, unsetCommunityStateAction } from './../actions/community.actions';
import { createReducer, on } from '@ngrx/store';
import { CommunityActionsUnion } from '../actions/community.actions';

const initialState: CommunityState = {
  visibleUsers: {}
};

export interface CommunityState {
  visibleUsers: {
      [uid: string]: ProfileState
  },
}

const reducer = createReducer<CommunityState>(
  initialState,
  on(getVisibleUsersSuccessAction, (state, action) => ({
    ...state,
    visibleUsers: {
        ...action.payload.reduce((prev, curr) => {
            return {...prev, [curr.uid]: curr}
        }, {})
    },
  })),
  on(getVisibleUsersErrorAction, (state) => ({
      ...state,
      visibleUsers: {}
  })),
  on(unsetCommunityStateAction, () => initialState)
);

export function communityReducer(
  state: CommunityState,
  action: CommunityActionsUnion
): CommunityState {
  return reducer(state, action);
}
