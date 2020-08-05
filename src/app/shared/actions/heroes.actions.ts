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
  GetFavoritesHeroesByIdErrorAction = '[HEROES] FAVORITES_HEROES_LOAD_BY_ID_ERROR'
}

export const getHeroesAction = createAction(
  HeroesActions.GetHeroesAction,
  props<{ payload: ParamsForLoadHeroes }>()
);

export const getHeroesSuccessAction = createAction(
  HeroesActions.GetHeroesSuccessAction,
  props<{ payload: HeroResponseResult[] }>()
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
  props<{message: string}>()
)

export const getFavoritesHeroesByIdAction = createAction(
  HeroesActions.GetFavoritesHeroesByIdAction,
  props<{id: number[]}>()
)

export const getFavoritesHeroesByIdSuccessAction = createAction(
  HeroesActions.GetFavoritesHeroesByIdSuccessAction,
  props<{ payload: any }>()
)

export const getFavoritesHeroesByIdErrorAction = createAction(
  HeroesActions.GetFavoritesHeroesByIdErrorAction,
  props<{ message: string }>()
)

const all = union({
  getHeroesAction,
  getHeroesSuccessAction,
  getHeroesErrorAction,
  getHeroDetailsAction,
  getHeroDetailsSuccessAction,
  getHeroDetailsErrorAction,
  getFavoritesHeroesByIdAction,
  getFavoritesHeroesByIdSuccessAction,
  getFavoritesHeroesByIdErrorAction
});

export type HeroesActionsUnion = typeof all;
