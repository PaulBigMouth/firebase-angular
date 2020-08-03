import { catchError, switchMap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeroesService } from '../services/heroes.service';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  HeroesActionsUnion,
  HeroesActions,
  getHeroesLoadSuccessAction,
  getHeroesLoadErrorAction,
  getHeroLoadDetailsSuccessAction,
  postHeroToFavoiteSuccessAction,
  checkHeroSuccessAction
} from './actions';
import { HeroesResponse, HeroResponseResult } from './reducers';

@Injectable()
export class HeroesEffects {
  public loadHeroes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.GetHeroesLoad),
      switchMap(({ payload }) =>
        this.heroesService.getHeroes(payload).pipe(
          map((response: HeroesResponse) => response.results),
          map((heroes: HeroResponseResult[]) =>
            getHeroesLoadSuccessAction({ payload: heroes })
          )
          // catchError(error => getHeroesLoadErrorAction({payload: 'error load heroes'}))
        )
      )
    )
  );
  public loadHeroDetails$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
		ofType(HeroesActions.GetHeroLoadDetails),
		switchMap(({ id }) => this.heroesService.getHeroById(id).pipe(
			map((hero: any) => getHeroLoadDetailsSuccessAction({ payload: hero }))
		))
	)
  );

  public pushHeroToFavorite$: Observable<Action> = createEffect(() => this.actions$.pipe(
	  ofType(HeroesActions.PostHeroToFavoriteAction),
	  switchMap(({id}) => this.heroesService.pushToFavorite(id).pipe(
		  map((value: any) => {
			  console.log(value)
			  return value
		  }),
		  map((value) => postHeroToFavoiteSuccessAction({payload: 'hello'}))
	  ))
  ))

  public checkHero$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(HeroesActions.CheckHeroAction),
    switchMap(({ payload }) => this.heroesService.checkHero(payload).pipe(
      map(data => {
        return data
      }),
      map(object => checkHeroSuccessAction({payload: object}))
    ))
  ))

  constructor(
    private actions$: Actions<HeroesActionsUnion>,
    private heroesService: HeroesService
  ) {}
}
