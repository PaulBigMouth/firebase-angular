import { ProfileState } from './profile.reducers';
import { getVisibleUsersSuccessAction, getVisibleUsersErrorAction } from './../actions/community.actions';
import { createReducer, on } from '@ngrx/store';
import { CommunityActionsUnion } from '../actions/community.actions';

const initialState: CommunityState = {
  visibleUsers: {}
};

export interface CommunityState {
  visibleUsers: {
      [uid: string]: ProfileState
  }
}

const reducer = createReducer(
  initialState,
  on(getVisibleUsersSuccessAction, (state, action) => ({
    ...state,
    visibleUsers: {
        ...action.payload.reduce((prev, curr) => {
            return {...prev, [curr.uid]: curr}
        }, {})
    },
  })),
  on(getVisibleUsersErrorAction, (state, action) => ({
      ...state,
      visibleUsers: {}
  }))
);

export function communityReducer(
  state: CommunityState,
  action: CommunityActionsUnion
) {
  return reducer(state, action);
}
