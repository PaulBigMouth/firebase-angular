import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { HeroesService } from '../services/heroes.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HeroesActions, HeroesLoadError, HeroesLoadSuccess, HeroesLoad } from './actions';
import { HeroesResponse } from '../../../../interfaces';
import { EMPTY } from 'rxjs';

@Injectable()
export class HeroesEffects {
	@Effect()
	loadHeroes$ = this.actions$.pipe(
		ofType(HeroesActions.HeroesLoad),
		switchMap((action: HeroesLoad) => {
			return this.heroesService.getHeroes(action.paylod).pipe(
				map((response: HeroesResponse) => {
					if (response) {
						return new HeroesLoadSuccess(response.results);
					}
					return new HeroesLoadError('Empty response');
				}),
				catchError((err) => {
					console.log(err);
					return EMPTY;
				}),
			);
		}),
	);

	constructor(private actions$: Actions, private heroesService: HeroesService) {}
}
