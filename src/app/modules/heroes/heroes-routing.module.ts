import { HeroesComponent } from './heroes.component';
import { HeroLayoutComponent } from './layouts/hero-layout/hero-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeroesLayoutComponent } from './layouts/heroes-layout/heroes-layout.component';

export const heroesRoutes: Routes = [
	{
		path: '',
		component: HeroesComponent,
		children: [ { path: '', component: HeroesLayoutComponent }, { path: ':id', component: HeroLayoutComponent } ],
	},
];

@NgModule({
	imports: [ RouterModule.forChild(heroesRoutes) ],
	exports: [ RouterModule ],
})
export class HeroesRoutingModule {}
