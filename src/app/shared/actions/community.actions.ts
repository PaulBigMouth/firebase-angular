import { ProfileState } from './../reducers/profile.reducers';
import { union, createAction, props } from '@ngrx/store';

export enum CommunityActions {
    GetVisibleUsersAction = '[COMMUNITY] GET_VISIBLE_USERS',
    GetVisibleUsersSuccessAction = '[COMMUNITY] GET_VISIBLE_USERS_SUCCESS',
    GetVisibleUsersErrorAction = '[COMMUNITY] GET_VISIBLE_USERS_ERROR',

    UnsetCommunityStateAction = '[COMMUNITY] UNSET_COMMUNITY_STATE'
}

export const getVisibleUsersAction = createAction(
    CommunityActions.GetVisibleUsersAction,
    props<{ idUser: string }>()
)

export const getVisibleUsersSuccessAction = createAction(
    CommunityActions.GetVisibleUsersSuccessAction,
    props<{ payload: ProfileState[] | null }>()
)

export const getVisibleUsersErrorAction = createAction(
    CommunityActions.GetVisibleUsersErrorAction,
    props<{ message: string }>()
)

export const unsetCommunityStateAction = createAction(
    CommunityActions.UnsetCommunityStateAction
)

const all = union({
    getVisibleUsersAction,
    getVisibleUsersSuccessAction,
    getVisibleUsersErrorAction,
    unsetCommunityStateAction
})

export type CommunityActionsUnion = typeof all