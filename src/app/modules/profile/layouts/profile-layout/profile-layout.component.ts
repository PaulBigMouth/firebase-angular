
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { signOutAction } from 'src/app/modules/authorization/store/actions';

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

	public logOut(): void {
		this.store.dispatch(signOutAction())
	}

}
