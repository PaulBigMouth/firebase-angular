import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HeroesResponse } from '../../../../interfaces';

@Injectable()
export class HeroesService {
	private apiUrl: string = 'https://rickandmortyapi.com/api';
	private character: string = 'character';

	constructor(private http: HttpClient) {}

	public getHeroes(params: any = {}): Observable<HeroesResponse | HttpErrorResponse> {
		return this.http.get<HeroesResponse>(`${this.apiUrl}/${this.character}`, {
			params: new HttpParams({
				fromObject: params,
			}),
		});
	}
}
