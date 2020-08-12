import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { HeroesComponent } from './heroes.component';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { NgModule } from '@angular/core';
import { HeroesLayoutComponent } from './layouts/heroes-layout/heroes-layout.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroLayoutComponent } from './layouts/hero-layout/hero-layout.component';
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
    HeroesLayoutComponent,
    HeroCardComponent,
    HeroLayoutComponent,
    HeroesComponent,
    HeroesFiltersComponent,
  ],
  providers: [],
  bootstrap: [HeroesComponent],
})
export class HeroesModule {}
