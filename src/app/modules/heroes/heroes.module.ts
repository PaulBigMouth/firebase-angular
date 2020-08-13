import { HeroesPageComponent } from './pages/heroes-page/heroes-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { HeroesComponent } from './heroes.component';
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
    HeroesPageComponent,
    HeroCardComponent,
    HeroPageComponent,
    HeroesComponent,
    HeroesFiltersComponent,
  ],
  providers: [],
  bootstrap: [HeroesComponent],
})
export class HeroesModule {}
