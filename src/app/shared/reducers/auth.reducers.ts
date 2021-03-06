import { unsetAuthStateAction } from './../actions/auth.actions';
import {
  signInAction,
  signInSuccessAction,
  signUpAction,
  signUpSuccessAction,
  signOutSuccessAction,
  authStateInitSuccessAction,
  signErrorAction,
} from '../actions/auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

const initialState: AuthState = {
  idUser: null,
  refreshToken: null,
  isSignProgress: false,
};

export interface AuthState {
  idUser: string;
  refreshToken: string;
  isSignProgress: boolean;
}

const reducer = createReducer<AuthState>(
  initialState,
  on(signInAction, (state) => ({
    ...state,
    isSignProgress: true,
  })),
  on(signInSuccessAction, (state, action) => ({
    ...state,
    ...action.payload,
  })),
  on(signUpAction, (state) => ({
    ...state,
    isSignProgress: true,
  })),
  on(signUpSuccessAction, (state, action) => ({
    ...state,
    ...action.payload,
  })),
  on(signOutSuccessAction, (state) => ({
    ...state,
    idUser: null,
    refreshToken: null,
  })),
  on(authStateInitSuccessAction, (state, action) => ({
    ...state,
    ...action.payload,
  })),
  on(signErrorAction, (state) => ({
    ...state,
    isSignProgress: false,
  })),
  on(unsetAuthStateAction, () => initialState)
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return reducer(state, action);
}
