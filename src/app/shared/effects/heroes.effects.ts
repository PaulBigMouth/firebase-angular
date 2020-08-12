import { getHeroesWithFiltersErrorAction } from './../actions/heroes.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  HeroesResponse,
  HeroResponseResult,
} from '../interfaces/heroes.interface';
import { HeroesService } from '../services/heroes.service';
import {
  HeroesActions,
  HeroesActionsUnion,
  getHeroesSuccessAction,
  getHeroDetailsSuccessAction,
  getFavoritesHeroesByIdSuccessAction,
  getHeroesWithFiltersSuccessAction,
} from '../actions/heroes.actions';

@Injectable()
export class HeroesEffects {
  public loadHeroes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.GetHeroesAction),
      switchMap(({ payload }) =>
        this.heroesService
          .getHeroes(payload)
          .pipe(
            map((response: HeroesResponse) =>
              getHeroesSuccessAction({ payload: response })
            )
          )
      )
    )
  );

  public loadHeroesWithFilters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.GetHeroesWithFiltersAction),
      switchMap(({ params }) =>
        this.heroesService.getHeroes(params).pipe(
          map((response: HeroesResponse) =>
            getHeroesWithFiltersSuccessAction({ payload: response })
          ),
          catchError((e) =>
            of(getHeroesWithFiltersErrorAction({ message: e.message }))
          )
        )
      )
    )
  );

  public loadHeroDetails$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.GetHeroDetailsAction),
      switchMap(({ id }) =>
        this.heroesService
          .getHeroById(id)
          .pipe(
            map((hero: HeroResponseResult) =>
              getHeroDetailsSuccessAction({ payload: hero })
            )
          )
      )
    )
  );

  public loadHeroesById$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.GetFavoritesHeroesByIdAction),
      switchMap(({ id }) =>
        this.heroesService.getHeroesById(id).pipe(
          map((heroes) => {
            if (Array.isArray(heroes)) {
              return getFavoritesHeroesByIdSuccessAction({ payload: heroes });
            }
            return getFavoritesHeroesByIdSuccessAction({ payload: [heroes] });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions<HeroesActionsUnion>,
    private heroesService: HeroesService
  ) {}
}
