import { AuthService } from './../../../../shared/services/auth.service';
import { Store } from '@ngrx/store';
import { SignOut } from '../../../../store/auth/actions';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: [ './main-layout.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
	constructor(private store: Store, private authService: AuthService) {}

	ngOnInit(): void {}

	logOut() {
		this.store.dispatch(new SignOut());
	}
}
