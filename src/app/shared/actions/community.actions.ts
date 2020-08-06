import { ProfileState } from './../reducers/profile.reducers';
import { union, createAction, props } from '@ngrx/store';

export enum CommunityActions {
    GetVisibleUsersAction = '[COMMUNITY] GET_VISIBLE_USERS',
    GetVisibleUsersSuccessAction = '[COMMUNITY] GET_VISIBLE_USERS_SUCCESS',
    GetVisibleUsersErrorAction = '[COMMUNITY] GET_VISIBLE_USERS_ERROR'
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

const all = union({
    getVisibleUsersAction,
    getVisibleUsersSuccessAction,
    getVisibleUsersErrorAction,
})

export type CommunityActionsUnion = typeof all