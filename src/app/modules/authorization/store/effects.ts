import { SignInSuccess, SignError, Init, InitSucces, InitError } from './actions';
import { AuthService } from '../../../shared/services/auth.service';
import { AuthActions, SignUpSuccess, SignOutSuccess } from './actions';
import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
//Эффект, Баг с логаутом, переход по герою, организация бд с чатом, createFeaturesSelector, rootStore('heroes')
@Injectable()
export class AuthEffects {
	@Effect()
	createUser$ = this.actions$.pipe(
		ofType(AuthActions.SignUp),
		switchMap(({ payload }) => {
			return this.authService.createUser(payload).pipe(
				map((user: firebase.auth.UserCredential) => {
					if (user) {
						this.router.navigate([ '/' ]);
						this.authService.verifyUserEmail();
						// return new SignUpSuccess({
						// 	idUser: user.user.uid,
						// 	refreshToken: user.user.refreshToken,
						// 	isSignProgress: false,
						// 	pushKey: '1',
						// });
						return user;
					}
					// return new SignError('Error SignUP');
				}),
				map((user) => {
					if (user) {
						return this.authService.createDBOfUser(payload, user.user.uid).pipe(
							map((dbUser) => {
								console.log(dbUser);
								return new SignUpSuccess({
									idUser: user.user.uid,
									refreshToken: user.user.refreshToken,
									isSignProgress: false,
									pushKey: dbUser.$key,
								});
							}),
						);
					}
					return new SignError('Error SignUp');
				}),
			);
		}),
	);
	@Effect()
	logOut$ = this.actions$.pipe(
		ofType(AuthActions.SignOut),
		switchMap(() => {
			return this.authService.signOut().pipe(
				map(() => {
					this.router.navigate([ '/login' ]);
					return new SignOutSuccess('complete');
				}),
			);
		}),
	);
	@Effect()
	signIn$ = this.actions$.pipe(
		ofType(AuthActions.SignIn),
		switchMap(({ payload }) => {
			return this.authService.signIn(payload).pipe(
				map((user: firebase.auth.UserCredential | undefined) => {
					if (user) {
						this.router.navigate([ '/' ]);
						if (!user.user.emailVerified) {
							this.authService.verifyUserEmail();
						}
						console.log(this.router.url);

						return new SignInSuccess({
							idUser: user.user.uid,
							refreshToken: user.user.refreshToken,
							isSignProgress: false,
							pushKey: '1',
						});
					}
					return new SignError('Error SignIn');
				}),
			);
		}),
	);
	@Effect()
	init$ = this.actions$.pipe(
		ofType(AuthActions.Init),
		switchMap(() => {
			return this.authService.getUser().pipe(
				map((user) => {
					if (user) {
						return new InitSucces({
							idUser: user.uid,
							refreshToken: user.refreshToken,
						});
					}
					return new InitError();
				}),
			);
		}),
	);

	constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
