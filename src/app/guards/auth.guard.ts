import { authStateInitAction } from './../modules/authorization/store/actions';
import { AuthService } from './../shared/services/auth.service';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, ReplaySubject, of } from 'rxjs';
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
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private ngZone: NgZone,
    private store: Store
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> {
    // this.store.dispatch(authStateInitAction());
    return of(true);
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> {
    return this.canActivate(route, state);
  }
}
