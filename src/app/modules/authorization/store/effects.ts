import { SignInSuccess, SignError, Init, InitSucces, InitError } from './actions';
import { AuthService } from '../../../shared/services/auth.service';
import {
  AuthActions,
  SignUpSuccess,
  SignOutSuccess,
} from './actions';
import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  createUser$ = this.actions$.pipe(
    ofType(AuthActions.SignUp),
    switchMap(({ payload }) => {
      return this.authService.createUser(payload).pipe(
        map((user: firebase.auth.UserCredential) => {
          console.log(user);
          if (user) {
            this.router.navigate(['/']);
            this.authService.verifyUserEmail();
            return new SignUpSuccess({
              idUser: user.user.uid,
              refreshToken: user.user.refreshToken,
              isSignProgress: false
            });
          }
          return new SignError('Error SignUP');
        })
      );
    })
  );
  @Effect()
  logOut$ = this.actions$.pipe(
    ofType(AuthActions.SignOut),
    switchMap(() => {
      return this.authService.signOut().pipe(
        map(() => {
          this.router.navigate(['/login']);
          return new SignOutSuccess('complete');
        })
      );
    })
  );
  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(AuthActions.SignIn),
    switchMap(({ payload }) => {
      return this.authService.signIn(payload).pipe(
        map((user: firebase.auth.UserCredential | undefined) => {
          if (user) {
            if (!user.user.emailVerified) {
              this.authService.verifyUserEmail();
            }
            this.router.navigate(['/']);
            return new SignInSuccess({
              idUser: user.user.uid,
              refreshToken: user.user.refreshToken,
              isSignProgress: true
            });
          }
          return new SignError('Error SignIn');
        })
      );
    })
  );
  @Effect()
  init$ = this.actions$.pipe(
    ofType(AuthActions.Init),
    switchMap(() => {
      return this.authService.getUser().pipe(
        map((user) =>  {
          console.log(user);
          if(user) {
            return new InitSucces({idUser: user.uid, refreshToken: user.refreshToken})
          }
          return new InitError()
        })
      )
    })
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
