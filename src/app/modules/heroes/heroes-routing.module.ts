import { HeroesPage } from './pages/heroes-page/heroes.page';
import { HeroPage } from './pages/hero-page/hero.page';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const heroesRoutes: Routes = [
  { path: '', component: HeroesPage },
  { path: ':id', component: HeroPage },
];

@NgModule({
  imports: [RouterModule.forChild(heroesRoutes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
