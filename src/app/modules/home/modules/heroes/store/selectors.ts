import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeroesState } from "./reducers"
// import {  } from '../../modules/interfaces';


const _selectHeroes = (state: HeroesState) => state.heroes 

export const selectHeroes = createSelector(_selectHeroes, (heroes: any) => Object.values(heroes.heroes))