import { switchMap, map } from 'rxjs/operators';
import { HeroesService } from '../services/heroes.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HeroesActions, HeroesLoadError, HeroesLoadSuccess } from './actions';
import { HeroesResponse } from '../../../../interfaces';

@Injectable()
export class HeroesEffects {
  @Effect()
  loadHeroes$ = this.actions$.pipe(
    ofType(HeroesActions.HeroesLoad),
    switchMap(({ payload }) => {
      return this.heroesService.getHeroes(payload).pipe(
        map((response: HeroesResponse) => {
          if (response) {
            return new HeroesLoadSuccess(response.results);
          }
          return new HeroesLoadError('Error');
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private heroesService: HeroesService
  ) {}
}
