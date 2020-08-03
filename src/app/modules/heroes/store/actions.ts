import { createAction, props, union } from '@ngrx/store';
import { ParamsForLoadHeroes, HeroResponseResult } from './reducers';
import { Message } from "../../interfaces"

export enum HeroesActions {
  GetHeroesLoad = '[HEROES] HEROES_LOAD',
  GetHeroesLoadSuccess = '[HEROES] HEROES_LOAD_SUCCESS',
  GetHeroesLoadError = '[HEROES] HEROES_LOAD_ERROR',
  GetHeroLoadDetails = '[HEROES] HERO_LOAD_DETAILS',
  GetHeroLoadDetailsSuccess = '[HEROES] HERO_LOAD_DETAILS_SUCCESS',
  PostHeroToFavoriteAction = '[HEROES] HERO_POST_TO_FAVORITE',
  PostHeroToFavoriteSuccessAction = '[HEROES] HERO_POST_TO_FAVORITE_SUCCESS',
  CheckHeroAction = '[HEROES] CHECK_HERO',
  CheckHeroSucccesAction = '[HEROES] CHECK_HERO__SUCCESS',
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
  props<{ payload: Message }>()
);

export const getHeroLoadDetailsAction = createAction(
  HeroesActions.GetHeroLoadDetails,
  props<{ id: string }>()
);

export const getHeroLoadDetailsSuccessAction = createAction(
  HeroesActions.GetHeroLoadDetailsSuccess,
  props<{ payload: HeroResponseResult }>()
);

export const postHeroToFavoriteAction = createAction(
  HeroesActions.PostHeroToFavoriteAction,
  props<{ id: string }>()
);

export const postHeroToFavoiteSuccessAction = createAction(
  HeroesActions.PostHeroToFavoriteSuccessAction,
  props<{ payload: any }>()
);

export const checkHeroAction = createAction(
  HeroesActions.CheckHeroAction,
  props<{ payload: string }>()
)

export const checkHeroSuccessAction = createAction(
  HeroesActions.CheckHeroSucccesAction,
  props<{ payload: any }>()
)

const all = union({
  getHeroesLoadAction,
  getHeroesLoadSuccessAction,
  getHeroesLoadErrorAction,
  getHeroLoadDetailsAction,
  getHeroLoadDetailsSuccessAction,
  postHeroToFavoriteAction,
  postHeroToFavoiteSuccessAction,
  checkHeroAction,
  checkHeroSuccessAction
});

export type HeroesActionsUnion = typeof all;
