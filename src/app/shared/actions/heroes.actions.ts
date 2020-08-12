import { Filter, HeroesResponse } from './../interfaces/heroes.interface';
import {
  ParamsForLoadHeroes,
  HeroResponseResult,
} from '../interfaces/heroes.interface';
import { createAction, props, union } from '@ngrx/store';

export enum HeroesActions {
  GetHeroesAction = '[HEROES] HEROES_LOAD',
  GetHeroesSuccessAction = '[HEROES] HEROES_LOAD_SUCCESS',
  GetHeroesErrorAction = '[HEROES] HEROES_LOAD_ERROR',

  GetHeroDetailsAction = '[HEROES] HERO_LOAD_DETAILS',
  GetHeroDetailsSuccessAction = '[HEROES] HERO_LOAD_DETAILS_SUCCESS',
  GetHeroDetailsErrorAction = '[HEROES] HERO_LOAD_DETAILS_ERROR',

  GetFavoritesHeroesByIdAction = '[HEROES] FAVORITES_HEROES_LOAD_BY_ID',
  GetFavoritesHeroesByIdSuccessAction = '[HEROES] FAVORITES_HEROES_LOAD_BY_ID_SUCCESS',
  GetFavoritesHeroesByIdErrorAction = '[HEROES] FAVORITES_HEROES_LOAD_BY_ID_ERROR',

  GetHeroesWithFiltersAction = '[HEROES] GET_HEROES_WITH_FILTERS',
  GetHeroesWithFiltersSuccessAction = '[HEROES] GET_HEROES_WITH_FILTERS_SUCCESS',
  GetHeroesWithFiltersErrorAction = '[HEROES] GET_HEROES_WITH_FILTERS_ERROR',

  UnsetHeroesStateAction = '[HEROES] UNSET_HEROES_STATE',
}

export const getHeroesAction = createAction(
  HeroesActions.GetHeroesAction,
  props<{ payload: ParamsForLoadHeroes }>()
);

export const getHeroesSuccessAction = createAction(
  HeroesActions.GetHeroesSuccessAction,
  props<{ payload: HeroesResponse }>()
);

export const getHeroesErrorAction = createAction(
  HeroesActions.GetHeroesErrorAction,
  props<{ message: string }>()
);

export const getHeroDetailsAction = createAction(
  HeroesActions.GetHeroDetailsAction,
  props<{ id: number }>()
);

export const getHeroDetailsSuccessAction = createAction(
  HeroesActions.GetHeroDetailsSuccessAction,
  props<{ payload: HeroResponseResult }>()
);

export const getHeroDetailsErrorAction = createAction(
  HeroesActions.GetHeroDetailsErrorAction,
  props<{ message: string }>()
);

export const getFavoritesHeroesByIdAction = createAction(
  HeroesActions.GetFavoritesHeroesByIdAction,
  props<{ id: number[] }>()
);

export const getFavoritesHeroesByIdSuccessAction = createAction(
  HeroesActions.GetFavoritesHeroesByIdSuccessAction,
  props<{ payload: HeroResponseResult[] }>()
);

export const getFavoritesHeroesByIdErrorAction = createAction(
  HeroesActions.GetFavoritesHeroesByIdErrorAction,
  props<{ message: string }>()
);

export const unsetHeroesStateAction = createAction(
  HeroesActions.UnsetHeroesStateAction
);

export const getHeroesWithFiltersAction = createAction(
  HeroesActions.GetHeroesWithFiltersAction,
  props<{ params: ParamsForLoadHeroes }>()
);

export const getHeroesWithFiltersSuccessAction = createAction(
  HeroesActions.GetHeroesWithFiltersSuccessAction,
  props<{ payload: HeroesResponse }>()
);

export const getHeroesWithFiltersErrorAction = createAction(
  HeroesActions.GetHeroesWithFiltersErrorAction,
  props<{ message: string }>()
);

const all = union({
  getHeroesAction,
  getHeroesSuccessAction,
  getHeroesErrorAction,
  getHeroDetailsAction,
  getHeroDetailsSuccessAction,
  getHeroDetailsErrorAction,
  getFavoritesHeroesByIdAction,
  getFavoritesHeroesByIdSuccessAction,
  getFavoritesHeroesByIdErrorAction,
  getHeroesWithFiltersAction,
  getHeroesWithFiltersSuccessAction,
  getHeroesWithFiltersErrorAction,
  unsetHeroesStateAction,
});

export type HeroesActionsUnion = typeof all;
