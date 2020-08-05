import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { switchMap, map } from "rxjs/operators";
import { HeroesResponse, HeroResponseResult } from "../interfaces/heroes.interface";
import { HeroesService } from "../services/heroes.service";
import { HeroesActions, HeroesActionsUnion, getHeroesSuccessAction, getHeroDetailsSuccessAction, getFavoritesHeroesByIdSuccessAction, } from "../actions/heroes.actions";

@Injectable()
export class HeroesEffects {

  public loadHeroes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroesActions.GetHeroesAction),
      switchMap(({ payload }) =>
        this.heroesService.getHeroes(payload).pipe(
          map((response: HeroesResponse) => response.results),
          map((heroes: HeroResponseResult[]) =>
            getHeroesSuccessAction({ payload: heroes })
          )
        )
      )
    )
  );

  public loadHeroDetails$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
		ofType(HeroesActions.GetHeroDetailsAction),
		switchMap(({ id }) => this.heroesService.getHeroById(id).pipe(
			map((hero: HeroResponseResult) => getHeroDetailsSuccessAction({ payload: hero }))
		))
	)
  );

  public loadHeroesById$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(HeroesActions.GetFavoritesHeroesByIdAction),
    switchMap(({ id }) => this.heroesService.getHeroById(id).pipe(
      map(heroes => getFavoritesHeroesByIdSuccessAction({payload: heroes}))
    ))
  ))

  constructor(
    private actions$: Actions<HeroesActionsUnion>,
    private heroesService: HeroesService
  ) {}
}