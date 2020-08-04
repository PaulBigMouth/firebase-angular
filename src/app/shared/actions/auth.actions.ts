import { props, createAction, union } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducers";
import { User } from "../interfaces/users.interface";


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
  props<{ payload: string }>()
);

export const authStateInitAction = createAction(AuthActions.Init, props<{user: AuthState}>());

export const authStateInitSuccessAction = createAction(
  AuthActions.InitSuccess,
  props<{ payload: AuthState }>()
);

export const authStateInitErrorAction = createAction(
  AuthActions.InitError,
  props<{ payload: string }>()
);

export const signErrorAction = createAction(
  AuthActions.SignError,
  props<{ payload: string }>()
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