import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HeroesService } from './services/heroes.service';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { NgModule } from '@angular/core';
import { HeroesLayoutComponent } from './layouts/heroes-layout/heroes-layout.component';
import { heroesReducer } from "./store/reducers"
import { HeroesEffects } from './store/effects'

@NgModule({
    imports: [HeroesRoutingModule, CommonModule, StoreModule.forFeature('heroes', heroesReducer), EffectsModule.forFeature([HeroesEffects])],
    exports: [],
    declarations: [HeroesLayoutComponent],
    providers: [HeroesService],
    bootstrap: [HeroesLayoutComponent]
})
export class HeroesModule {

}