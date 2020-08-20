import { authStateInitAction } from '../actions/auth.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { initProfileStateAction } from '../actions/profile.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private store: Store
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> {
    return this.authService.initUser().pipe(
      map((user) => {
        if (user) {
          if (user.emailVerified) {
            this.store.dispatch(
              authStateInitAction({
                user: {
                  idUser: user.uid,
                  refreshToken: user.refreshToken,
                  isSignProgress: false,
                },
              })
            );
            this.store.dispatch(initProfileStateAction({ userId: user.uid }));
            return true;
          }

          this.router.navigate(['/login/emailVerified']);
          return false;
        }
        this.ngZone.run(() => {
          this.router.navigate(['/login'], {
            queryParams: {
              accessDenied: true,
            },
          });
        });
        return false;
      })
    );
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> {
    return this.canActivate(route, state);
  }
}
