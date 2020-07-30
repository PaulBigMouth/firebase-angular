import { User } from './../../modules/interfaces';
import { AuthState } from './reducers';
import { Action } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';
import { Message } from "../../modules/interfaces"

export enum AuthActions {
  SignIn = '[AUTH] SIGN_IN',
  SignUp = '[AUTH] SIGN_UP',
  SignOut = '[AUTH] SIGN_OUT',
  SignUpSuccess = '[AUTH] SIGN_UP_SUCCESS',
  SignOutSuccess = '[AUTH] SIGN_OUT_SUCCESS',
  SignInSuccess = '[AUTH] SIGN_IN_SUCCESS',
  SignInError = '[AUTH] SIGN_IN_ERROR',
  SignUpError = '[AUTH] SIGN_UP_ERROR'
}

export type AuthUnion = SignIn | SignOut | SignUp | SignUpSuccess | SignOutSuccess | SignInSuccess;

export class SignInSuccess implements Action {
    readonly type = AuthActions.SignInSuccess
    
    constructor(public payload: AuthState) {}
}

export class SignIn implements Action {
  readonly type = AuthActions.SignIn;

  constructor(public payload: User) {}
}


export class SignInError implements Action {
    readonly type = AuthActions.SignInError
    
    constructor(public payload: Message) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActions.SignUpSuccess;

  constructor(public payload: AuthState) {}
}

export class SignUpError implements Action {
    readonly type = AuthActions.SignUpError

    constructor(public payload: Message) {}
}

export class SignUp implements Action {
  readonly type = AuthActions.SignUp;

  constructor(public payload: User) {}
}

export class SignOut implements Action {
  readonly type = AuthActions.SignOut;

}

export class SignOutSuccess implements Action {
    readonly type = AuthActions.SignOutSuccess

    constructor(public payload: Message) {}
}