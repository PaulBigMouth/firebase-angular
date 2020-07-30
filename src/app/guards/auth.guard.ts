import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private auth: AngularFireAuth) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>{
      return from(this.auth.onAuthStateChanged((user) => {
         if(user) {
            if(user.emailVerified) {
                this.router.navigate(['/'])
                return true
            }
            this.router.navigate(['/veryfiedEmail'])
            return false
         } 
         this.router.navigate(['/login'], {
             queryParams: {
                 accessDenied: true
             }
         })
         return false
      }).then((flag) => flag)).pipe(
          tap(() => false)
      )
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
