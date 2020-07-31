import { Action } from '@ngrx/store';
import {
  ParamsForLoadHeroes,
  Message,
  HeroResponseResult,
} from '../../../../interfaces';

export enum HeroesActions {
  HeroesLoad = '[HEROES] HEROES_LOAD',
  HeroesLoadSuccess = '[HEROES] HEROES_LOAD_SUCCESS',
  HeroesLoadError = '[HEROES] HEROES_LOAD_ERROR',
}

export type HeroesUnion = HeroesLoadSuccess;

export class HeroesLoad implements Action {
  readonly type = HeroesActions.HeroesLoad;

  constructor(public paylod: ParamsForLoadHeroes) {}
}

export class HeroesLoadSuccess implements Action {
  readonly type = HeroesActions.HeroesLoadSuccess;

  constructor(public payload: HeroResponseResult[]) {}
}

export class HeroesLoadError implements Action {
  readonly type = HeroesActions.HeroesLoadError;

  constructor(public payload: Message = 'error') {}
}
