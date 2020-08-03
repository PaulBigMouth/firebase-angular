import { SignOut } from './../../../../../authorization/store/actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-profile-layout',
	templateUrl: './profile-layout.component.html',
	styleUrls: [ './profile-layout.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileLayoutComponent implements OnInit {
	links = [ { name: 'Main', url: '/profile/main' }, { name: 'Characters ', url: '/profile/characters' } ];
	constructor(private store: Store) {}

	ngOnInit(): void {}

	logOut() {
		this.store.dispatch(new SignOut());
	}
}
