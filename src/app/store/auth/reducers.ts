import { Action } from '@ngrx/store';
import { AuthUnion, AuthActions } from "./actions"


export const initialState = null;

export interface AuthState {
    idUser: string;
    refreshToken: string,
    emailVerified: boolean
}


export function authReducer(state: AuthState = initialState, action: AuthUnion) {
    switch(action.type) {
        case AuthActions.SignUpSuccess:
            return {
                ...state,
                ...action.payload
            }
        case AuthActions.SignOut:
            return null
        case AuthActions.SignInSuccess:
            return {
                ...state,
                ...action.payload
            }
    }
}
