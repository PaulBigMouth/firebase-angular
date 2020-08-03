import { AuthService } from './../shared/services/auth.service';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, ReplaySubject } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
	loggedInSubject: ReplaySubject<any>;
	constructor(private router: Router, private auth: AngularFireAuth, private ngZone: NgZone, private authService: AuthService) {
		this.loggedInSubject = new ReplaySubject();
		this.auth.onAuthStateChanged(this.loggedInSubject);
		// console.log(this.loggedInSubject);
		
	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		// return this.authService.isAuth.pipe(
		// })
		// )
		return this.loggedInSubject.pipe(
			map((user: firebase.User) => {
				
				if (user) {
					if (user.emailVerified) {
						// this.store.dispatch(new Init());
						return true;
					}
					this.router.navigate([ '/emailVerified' ]);
					return false;
				}
				this.auth.onAuthStateChanged((user) => console.log(user));
				
				this.ngZone.run(
					() =>
						this.router.navigate([ '/login' ], {
							queryParams: {
								accessDenied: true,
							},
						}),
					console.log(user),
				);
				return false;
			}),
		);
	}
	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.canActivate(route, state);
	}
}
