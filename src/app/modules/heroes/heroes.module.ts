import { HeroesPage } from './pages/heroes-page/heroes.page';
import { HeroPage } from './pages/hero-page/hero.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { NgModule } from '@angular/core';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroesFiltersComponent } from './components/heroes-filters/heroes-filters.component';

@NgModule({
  imports: [
    HeroesRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HeroesRoutingModule],
  declarations: [
    HeroesPage,
    HeroCardComponent,
    HeroPage,
    HeroesFiltersComponent,
  ],
  providers: [],
  bootstrap: [],
})
export class HeroesModule {}
