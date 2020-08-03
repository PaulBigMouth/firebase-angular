import { map } from 'rxjs/operators';
import { selectUserId } from '../../authorization/store/selectors';
import { AngularFireDatabase } from '@angular/fire/database';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HeroesResponse } from '../store/reducers';

@Injectable()
export class HeroesService {
	private apiUrl: string = 'https://rickandmortyapi.com/api';
	private character: string = 'character';

	constructor(private http: HttpClient, private store: Store, private db: AngularFireDatabase) {}

	public getHeroes(params: any = {}): Observable<HeroesResponse | HttpErrorResponse> {
		return this.http.get<HeroesResponse>(`${this.apiUrl}/${this.character}`, {
			params: new HttpParams({
				fromObject: params,
			}),
		});
	}

	public getHeroById(id: string): Observable<any> {
		return this.http.get<any>(`${this.apiUrl}/${this.character}/${id}`)
	}

	public pushToFavorite(idHero: string): Observable<Promise<void>> {
		return this.store.select(selectUserId).pipe(
			map(userId => this.db.object(`/users/${userId}/heroes/${idHero}`).set({
				id: idHero
			}))
		)
	}

	public checkHero(idHero: string): Observable<boolean> {
		return this.store.select(selectUserId).pipe(
			map(userId => this.db.object(`/users/${userId}`)),
			map((data) => {
				return data.query.ref.key
			}),
			map(key => {
				if(key === 'null') {
					return false
				}
				return true
			})
		)
	}
}
