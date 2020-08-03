import { AppState } from "../../../store/reducers";
import { createSelector, props } from '@ngrx/store';
import { HeroesState } from './reducers';

const selectHeroesState = (state: AppState) => state.heroes;

export const selectHeroes = createSelector(
  selectHeroesState,
  (heroesState: HeroesState) => Object.values(heroesState.heroes)
);


export const selectHeroDetails = createSelector(
  selectHeroesState,
  (heroesState: HeroesState, props) => heroesState.heroes[props.id]
)

export const selectIsFavorite = createSelector(
  selectHeroesState,
  (heroesState: HeroesState) => heroesState.isFavorite
)