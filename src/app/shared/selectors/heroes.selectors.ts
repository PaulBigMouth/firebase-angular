import { HeroesState } from './../reducers/heroes.reducers';
import { ProfileState } from './../reducers/profile.reducers';
import { selectProfileState } from './profile.selectors';
import { AppState } from './../../store/reducers';
import { createSelector } from '@ngrx/store';

const selectHeroesState = (state: AppState) => state.heroes;

export const selectHeroes = createSelector(
  selectHeroesState,
  (heroesState: HeroesState) => {
    return Object.values(heroesState.heroes);
  }
);

export const selectPages = createSelector(
  selectHeroesState,
  (heroesState: HeroesState) => heroesState.pages
);

export const selectHeroDetails = createSelector(
  selectHeroesState,
  (heroesState: HeroesState, props: { id: string | number }) =>
    heroesState.heroes[props.id]
);

export const selectHeroFavoriteState = (id: number) =>
  createSelector(selectProfileState, (profileState: ProfileState) => {
    return (profileState.heroes || []).includes(id);
  });

export const selectFavoritesHeroes = createSelector(
  [selectHeroesState, selectProfileState],
  (heroesState, profileState) =>
    profileState.heroes.reduce((prev, curr) => {
      return [...prev, heroesState.heroes[curr]];
    }, [])
);

export const selectHeroesLoader = createSelector(
  selectHeroesState,
  (heroesState: HeroesState) => heroesState.loader
);
