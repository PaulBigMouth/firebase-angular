import { User, Message } from '../../interfaces';
import { AuthState } from './reducers';
import { Action, createAction, props, union } from '@ngrx/store';

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

export const signInAction = createAction(
  AuthActions.SignIn,
  props<{ payload: User }>()
);

export const signInSuccessAction = createAction(
  AuthActions.SignInSuccess,
  props<{ payload: AuthState }>()
);

export const signUpAction = createAction(
  AuthActions.SignUp,
  props<{ payload: User }>()
);

export const signUpSuccessAction = createAction(
  AuthActions.SignUpSuccess,
  props<{ payload: AuthState }>()
);

export const signOutAction = createAction(AuthActions.SignOut);

export const signOutSuccessAction = createAction(
  AuthActions.SignOutSuccess,
  props<{ payload: Message }>()
);

export const authStateInitAction = createAction(AuthActions.Init);

export const authStateInitSuccessAction = createAction(
  AuthActions.InitSuccess,
  props<{ payload: AuthState }>()
);

export const authStateInitErrorAction = createAction(
  AuthActions.InitError,
  props<{ payload: Message }>()
);

export const signErrorAction = createAction(
  AuthActions.SignError,
  props<{ payload: Message }>()
);

const all = union({
  signInAction,
  signInSuccessAction,
  signUpAction,
  signUpSuccessAction,
  signErrorAction,
  authStateInitAction,
  authStateInitSuccessAction,
  authStateInitErrorAction,
});

export type AuthActionsUnion = typeof all