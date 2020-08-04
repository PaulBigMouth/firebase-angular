import {
  ParamsForLoadHeroes,
  HeroResponseResult,
} from '../interfaces/heroes.interface';
import { createAction, props, union } from '@ngrx/store';

export enum HeroesActions {
  GetHeroesLoad = '[HEROES] HEROES_LOAD',
  GetHeroesLoadSuccess = '[HEROES] HEROES_LOAD_SUCCESS',
  GetHeroesLoadError = '[HEROES] HEROES_LOAD_ERROR',
  GetHeroLoadDetails = '[HEROES] HERO_LOAD_DETAILS',
  GetHeroLoadDetailsSuccess = '[HEROES] HERO_LOAD_DETAILS_SUCCESS',
}

export const getHeroesLoadAction = createAction(
  HeroesActions.GetHeroesLoad,
  props<{ payload: ParamsForLoadHeroes }>()
);

export const getHeroesLoadSuccessAction = createAction(
  HeroesActions.GetHeroesLoadSuccess,
  props<{ payload: HeroResponseResult[] }>()
);

export const getHeroesLoadErrorAction = createAction(
  HeroesActions.GetHeroesLoadError,
  props<{ payload: string }>()
);

export const getHeroLoadDetailsAction = createAction(
  HeroesActions.GetHeroLoadDetails,
  props<{ id: string }>()
);

export const getHeroLoadDetailsSuccessAction = createAction(
  HeroesActions.GetHeroLoadDetailsSuccess,
  props<{ payload: HeroResponseResult }>()
);



const all = union({
  getHeroesLoadAction,
  getHeroesLoadSuccessAction,
  getHeroesLoadErrorAction,
  getHeroLoadDetailsAction,
  getHeroLoadDetailsSuccessAction,
});

export type HeroesActionsUnion = typeof all;
