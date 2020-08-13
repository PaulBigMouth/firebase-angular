import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { HeroesPageComponent } from './pages/heroes-page/heroes-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const heroesRoutes: Routes = [
  // {
  //   path: '',
  //   component: HeroesComponent,
  //   children: [
  //     { path: '', component: HeroesLayoutComponent },
  //     { path: ':id', component: HeroLayoutComponent },
  //   ],
  // },
  { path: '', component: HeroesPageComponent },
  { path: ':id', component: HeroPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(heroesRoutes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
