import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { EmailVerifiedComponent } from './shared/components/email-verified/email-verified.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'login',
		loadChildren: () => import('./modules/authorization/authorization.module').then((m) => m.AuthorizationModule),
	},
	{
		path: '',
		loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
		canActivate: [ AuthGuard ],
	},
	{ path: 'emailVerified', component: EmailVerifiedComponent },
	{ path: '**', component: NotFoundComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
})
export class AppRoutingModule {}
