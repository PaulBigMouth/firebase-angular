import { props, createAction, union } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducers';
import { User } from '../interfaces/users.interface';

export enum AuthActions {
  SignInAction = '[AUTH] SIGN_IN',
  SignUpAction = '[AUTH] SIGN_UP',
  SignOutAction = '[AUTH] SIGN_OUT',

  SignUpSuccessAction = '[AUTH] SIGN_UP_SUCCESS',
  SignOutSuccessAction = '[AUTH] SIGN_OUT_SUCCESS',
  SignInSuccessAction = '[AUTH] SIGN_IN_SUCCESS',

  SignErrorAction = '[AUTH] SIGN_ERROR',

  AuthStateInitAction = '[AUTH] AUTH_STATE_INIT',
  AuthStateInitSuccessAction = '[AUTH] AUTH_STATE_INIT_SUCCESS',
  AuthStateInitErrorAction = '[AUTH] AUTH_STATE_INIT_ERROR',

  UnsetAuthStateAction = '[AUTH] UNSET_AUTH_STATE',
}

export const signInAction = createAction(
  AuthActions.SignInAction,
  props<{ payload: User }>()
);

export const signInSuccessAction = createAction(
  AuthActions.SignInSuccessAction,
  props<{ payload: AuthState }>()
);

export const signUpAction = createAction(
  AuthActions.SignUpAction,
  props<{ payload: User }>()
);

export const signUpSuccessAction = createAction(
  AuthActions.SignUpSuccessAction,
  props<{ payload: AuthState }>()
);

export const signOutAction = createAction(AuthActions.SignOutAction);

export const signOutSuccessAction = createAction(
  AuthActions.SignOutSuccessAction,
  props<{ payload: string }>()
);

export const authStateInitAction = createAction(
  AuthActions.AuthStateInitAction,
  props<{ user: AuthState }>()
);

export const authStateInitSuccessAction = createAction(
  AuthActions.AuthStateInitSuccessAction,
  props<{ payload: AuthState }>()
);

export const authStateInitErrorAction = createAction(
  AuthActions.AuthStateInitErrorAction,
  props<{ message: string }>()
);

export const signErrorAction = createAction(
  AuthActions.SignErrorAction,
  props<{ message: string }>()
);

export const unsetAuthStateAction = createAction(
  AuthActions.UnsetAuthStateAction
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
  unsetAuthStateAction,
});

export type AuthActionsUnion = typeof all;
