import { CommunityState } from './../reducers/community.reducers';
import { createSelector } from '@ngrx/store';
import { AppState } from './../../store/reducers';


const selectCommunityState = (state: AppState) => state.community

export const selectVisibleUsers = createSelector(
    selectCommunityState,
    (communityState: CommunityState) => Object.values(communityState.visibleUsers)
)