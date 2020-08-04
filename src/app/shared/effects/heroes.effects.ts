import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { switchMap, map } from "rxjs/operators";
import { HeroesResponse, HeroResponseResult } from "../interfaces/heroes.interface";
import { HeroesService } from "../services/heroes.service";
import { HeroesActions, getHeroesLoadSuccessAction, getHeroLoadDetailsSuccessAction, HeroesActionsUnion, } from "../actions/heroes.actions";

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



  // public removeHeroFromFavorite$: Observable<Action> = createEffect(() => this.actions$.pipe(
  //   ofType(HeroesActions.RemoveHeroFromFavoriteAction),
  //   switchMap(({id}) => this.heroesService.removeHeroFromFavorite(id).pipe(

  //   ))
  // ))

  constructor(
    private actions$: Actions<HeroesActionsUnion>,
    private heroesService: HeroesService
  ) {}
}