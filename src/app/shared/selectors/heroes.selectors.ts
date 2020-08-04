import { ProfileState } from './../reducers/profile.reducers';
import { selectProfileState } from './profile.selectors';
import { AppState } from './../../store/reducers';
import { HeroesState } from "../reducers/heroes.reducers";
import { createSelector } from "@ngrx/store";

const selectHeroesState = (state: AppState) => state.heroes;

export const selectHeroes = createSelector(
  selectHeroesState,
  (heroesState: HeroesState) => Object.values(heroesState.heroes)
);


export const selectHeroDetails = createSelector(
  selectHeroesState,
  (heroesState: HeroesState, props: { id: string | number; }) => heroesState.heroes[props.id]
)

export const selectHeroFavoriteState = (id: number) => createSelector(
  selectProfileState,
  (profileState: ProfileState) => {
    console.log(typeof +id, typeof profileState.heroes[0])
    return (profileState.heroes || []).includes(+id)
  }
)


