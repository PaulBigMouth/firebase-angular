import { Action } from '@ngrx/store';
import { SignInSuccess } from './actions';
import { AuthService } from '../../shared/services/auth.service';
import {
  AuthActions,
  SignUpSuccess,
  SignOutSuccess,
} from '../../store/auth/actions';
import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  createUser$ = this.actions$.pipe(
    ofType(AuthActions.SignUp),
    switchMap(({ payload }) => {
      return this.authService.createUser(payload).pipe(
        map((user: firebase.auth.UserCredential | undefined) => {
          if (user) {
            // this.authService
            //   .verifyUserEmail()
            //   .pipe(tap(() => this.router.navigate(['/'])));
            // new SignUpSuccess({
            //   idUser: user.user.uid,
            //   refreshToken: user.user.refreshToken,
            //   emailVerified: user.user.emailVerified,
            // });
          }
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
          new SignOutSuccess('complete');
        })
      );
    })
  );
  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(AuthActions.SignIn),
    switchMap(({ payload }) => {
      console.log(payload);
      return this.authService.signIn(payload).pipe(
        map((user: firebase.auth.UserCredential | undefined) => {
          console.log(user);
          if (user) {
            if (!user.user?.emailVerified) {
              this.authService
                .verifyUserEmail()
                .pipe(tap(() => this.router.navigate(['/'])));
            }
            console.log(12);
            
            new SignInSuccess({
              idUser: user.user.uid,
              refreshToken: user.user.refreshToken,
              emailVerified: user.user.emailVerified,
            });
          }
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
