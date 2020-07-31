import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, ReplaySubject } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  loggedInSubject: ReplaySubject<any>;
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private ngZone: NgZone
  ) {
    this.loggedInSubject = new ReplaySubject();
    this.auth.onAuthStateChanged(this.loggedInSubject);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.loggedInSubject.pipe(
      map((user) => {
        if (user) {
          if (user.emailVerified) {
            return true;
          }
          this.router.navigate(['/emailVerified']);
          return false;
        }

        this.ngZone.run(() =>
          this.router.navigate(['/login'], {
            queryParams: {
              accessDenied: true,
            },
          })
        );
        return false;
      })
    );
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
