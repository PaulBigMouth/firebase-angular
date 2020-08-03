import { HeroesComponent } from './heroes.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HeroesService } from './services/heroes.service';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { NgModule } from '@angular/core';
import { HeroesLayoutComponent } from './layouts/heroes-layout/heroes-layout.component';
import { reducer } from './store/reducers';
import { HeroesEffects } from './store/effects';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroesFiltersComponent } from './components/heroes-filters/heroes-filters.component';
import { HeroLayoutComponent } from './layouts/hero-layout/hero-layout.component';

@NgModule({
	imports: [
		HeroesRoutingModule,
		CommonModule,
		StoreModule.forFeature('heroes', reducer),
		EffectsModule.forFeature([ HeroesEffects ]),
	],
	exports: [ HeroesRoutingModule ],
	declarations: [
		HeroesLayoutComponent,
		HeroCardComponent,
		HeroesFiltersComponent,
		HeroLayoutComponent,
		HeroesComponent,
	],
	providers: [ HeroesService ],
	bootstrap: [ HeroesComponent ],
})
export class HeroesModule {}
