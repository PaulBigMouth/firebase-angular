import { AuthUnion, AuthActions } from './actions';

const initialState: AuthState = {
	idUser: null,
	refreshToken: null,
	isSignProgress: false,
	pushKey: null,
};

export interface AuthState {
	idUser: string;
	refreshToken: string;
	isSignProgress: boolean;
	pushKey: string;
}

export function authReducer(state: AuthState = initialState, action: AuthUnion) {
	switch (action.type) {
		case AuthActions.SignIn:
			return {
				...state,
				isSignProgress: true,
			};
		case AuthActions.SignUp:
			return {
				...state,
				isProgress: true,
			};
		case AuthActions.SignUpSuccess:
			return {
				...state,
				...action.payload,
			};
		case AuthActions.SignOutSuccess:
			return {
				...state,
				idUser: null,
				refreshToken: null,
			};
		case AuthActions.SignInSuccess:
			return {
				...state,
				...action.payload,
			};
		case AuthActions.InitSuccess:
			return {
				...state,
				...action.payload,
			};
		case AuthActions.SignError:
			return {
				...state,
				isSignProgress: false,
			};
	}
	return state;
}
