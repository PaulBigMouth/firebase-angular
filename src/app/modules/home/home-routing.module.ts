import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{ path: '', redirectTo: '/heroes', pathMatch: 'full' },
			{
				path: 'heroes',
				loadChildren: () => import('./modules/heroes/heroes.module').then((m) => m.HeroesModule),
			},
			{
				path: 'community',
				loadChildren: () => import('./modules/community/community.module').then((m) => m.CommunityModule),
			},
			{
				path: 'profile',
				loadChildren: () => import('./modules/profile/profile.module').then((m) => m.ProfileModule),
			},
		],
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class HomeRoutingModule {}
