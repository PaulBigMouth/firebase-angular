import { Action } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import {
  AuthActions,
  signInSuccessAction,
  signUpSuccessAction,
  signErrorAction,
  signOutSuccessAction,
  authStateInitSuccessAction,
  AuthActionsUnion,
} from '../actions/auth.actions';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';

@Injectable()
export class AuthEffects {
  public createUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignUp),
      mergeMap(({ payload }) =>
        of(payload).pipe(
          map((payload) => {
            return payload;
          }),
          switchMap((payload) => this.authService.createUser(payload)),
          switchMap(({ user }) =>
            this.authService.createDBOfUser(payload, user.uid).pipe(
              map(() => {
                return user;
              })
            )
          ),
          map((user) => {
            this.router.navigate(['/']);
            this.authService.verifyUserEmail()
            return signUpSuccessAction({
              payload: {
                idUser: user.uid,
                refreshToken: user.refreshToken,
                isSignProgress: false,
              },
            });
          }),
          catchError((error) => of(signErrorAction({ payload: 'error' })))
        )
      )
    )
  );

  public signIn$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignIn),
      mergeMap(({ payload }) =>
        this.authService.signIn(payload).pipe(
          map(({ user }) => {
            this.router.navigate(['/']);
            if (!user.emailVerified) {
              this.authService.verifyUserEmail();
            } 
            return signInSuccessAction({
              payload: {
                idUser: user.uid,
                refreshToken: user.refreshToken,
                isSignProgress: false,
              },
            });
          }),
          catchError((error) => of(signErrorAction({ payload: 'error' })))
        )
      )
    )
  );

  public signOut$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignOut),
      switchMap(() =>
        this.authService.signOut().pipe(
          map(() => {
            this.router.navigate(['/login']);
            return signOutSuccessAction({ payload: 'complete' });
          })
        )
      )
    )
  );

  public authStateInit$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.Init),
      map(({ user }) => {
        if (user) {
          return authStateInitSuccessAction({
            payload: user
          })
        }
      })
    )
  );
  constructor(
    private actions$: Actions<AuthActionsUnion>,
    private authService: AuthService,
    private router: Router
  ) {}
}
