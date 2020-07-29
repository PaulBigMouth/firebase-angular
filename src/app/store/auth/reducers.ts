import { createReducer, on, Action } from "@ngrx/store"
import { signin } from "./actions"
import { AuthState } from "../../modules/interfaces"



export const initialState = null


const _authReducer = createReducer(initialState,
    on(signin, (state, { token }) => ({...state, token})))


export function reducer(state: AuthState, action: Action) {
    return _authReducer(state, action)
}