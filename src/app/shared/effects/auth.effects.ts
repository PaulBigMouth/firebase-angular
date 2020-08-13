import { authStateInitErrorAction } from './../actions/auth.actions';
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
      ofType(AuthActions.SignUpAction),
      mergeMap(({ payload }) =>
        of().pipe(
          switchMap(() => this.authService.createUser(payload)),
          switchMap(({ user }) =>
            this.authService.createDBOfUser(payload, user.uid).pipe(
              map(() => {
                return user;
              })
            )
          ),
          map((user) => {
            this.router.navigate(['/']);
            this.authService.verifyUserEmail();
            return signUpSuccessAction({
              payload: {
                idUser: user.uid,
                refreshToken: user.refreshToken,
                isSignProgress: false,
              },
            });
          }),
          catchError((error) => of(signErrorAction({ message: error.message })))
        )
      )
    )
  );

  public signIn$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignInAction),
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
          catchError((error) => of(signErrorAction({ message: error.message })))
        )
      )
    )
  );

  public signOut$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignOutAction),
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
      ofType(AuthActions.AuthStateInitAction),
      map(({ user }) => {
        if (user) {
          return authStateInitSuccessAction({
            payload: user,
          });
        }
      }),
      catchError((error) =>
        of(authStateInitErrorAction({ message: error.message }))
      )
    )
  );
  constructor(
    private actions$: Actions<AuthActionsUnion>,
    private authService: AuthService,
    private router: Router
  ) {}
}
