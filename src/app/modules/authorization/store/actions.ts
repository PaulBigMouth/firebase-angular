import { User, Message } from '../../interfaces';
import { AuthState } from './reducers';
import { Action } from '@ngrx/store';

export enum AuthActions {
  SignIn = '[AUTH] SIGN_IN',
  SignUp = '[AUTH] SIGN_UP',
  SignOut = '[AUTH] SIGN_OUT',
  SignUpSuccess = '[AUTH] SIGN_UP_SUCCESS',
  SignOutSuccess = '[AUTH] SIGN_OUT_SUCCESS',
  SignInSuccess = '[AUTH] SIGN_IN_SUCCESS',
  SignError = '[AUTH] SIGN_ERROR',
  Init = '[AUTH] INIT',
  InitSuccess = '[AUTH] INIT_SUCCESS',
  InitError = '[AUTH] INIT_ERROR',
}

export type AuthUnion =
  | SignUpSuccess
  | SignOutSuccess
  | SignInSuccess
  | InitSucces
  | SignIn
  | SignUp
  | SignError

export class SignInSuccess implements Action {
  readonly type = AuthActions.SignInSuccess;

  constructor(public payload: AuthState) {}
}

export class SignIn implements Action {
  readonly type = AuthActions.SignIn;

  constructor(public payload: User) {}
}


export class SignUpSuccess implements Action {
  readonly type = AuthActions.SignUpSuccess;

  constructor(public payload: AuthState) {}
}

export class SignError implements Action {
  readonly type = AuthActions.SignError;

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
  readonly type = AuthActions.SignOutSuccess;

  constructor(public payload: Message) {}
}

export class Init implements Action {
  readonly type = AuthActions.Init;
}

export class InitSucces implements Action {
  readonly type = AuthActions.InitSuccess;

  constructor(public payload: { idUser: string; refreshToken: string }) {}
}

export class InitError implements Action {
  readonly type = AuthActions.InitError;

  constructor(public payload: Message = 'Error_Init') {}
}
