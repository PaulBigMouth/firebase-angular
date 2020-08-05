import { HeroResponseResult } from './../interfaces/heroes.interface';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HeroesResponse } from '../interfaces/heroes.interface';
import { withLatestFrom } from 'rxjs/operators';
import { selectUserId } from '../selectors/auth.selectors';
import { selectIdOfFavoritesHeroes } from '../selectors/profile.selectors';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private apiUrl: string = 'https://rickandmortyapi.com/api';
  private character: string = 'character';

  constructor(
    private http: HttpClient,
    private store: Store,
    private db: AngularFireDatabase
  ) {}

  public getHeroes(
    params: any = {}
  ): Observable<HeroesResponse | HttpErrorResponse> {
    return this.http.get<HeroesResponse>(`${this.apiUrl}/${this.character}`, {
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }

  public getHeroById(id: number | number[]): Observable<HeroResponseResult | HeroesResponse> {
    console.log(id)
    return this.http.get<HeroResponseResult | HeroesResponse>(`${this.apiUrl}/${this.character}/${id}`);
  }

  public getFavoritesHeroes(userId: string): Observable<Array<number>> {
    return from(
      this.db.database
        .ref('/users')
        .child(userId)
        .child('heroes')
        .once('value')
        .then((snapshot) => snapshot.val())
    );
  }
  public pushHeroToFavorite(idHero: number): Observable<Promise<void>> {
    return this.store.select(selectUserId).pipe(
      withLatestFrom(this.store.select(selectIdOfFavoritesHeroes)),
      map(([userId, favoritesHeroes]) =>
        this.db.database
          .ref(`users/${userId}/heroes`)
          .set([...favoritesHeroes, idHero])
          .then(() => {
            this.db.database
              .ref(`heroes/${idHero}/users`)
              .once('value')
              .then((snapshot) => {
                const ref = this.db.database.ref(`heroes/${idHero}/users`);
                if (snapshot.val()) {
                  ref.set([...snapshot.val(), userId]);
                } else {
                  ref.set([userId]);
                }
              });
          })
      )
    );
  }

  public removeHeroFromFavorite(idHero: number): Observable<number[]> {
    return this.store.select(selectUserId).pipe(
      withLatestFrom(this.store.select(selectIdOfFavoritesHeroes)),
      map(([userId, favoritesHeroes]) => {
        const newFavoritesHeroes = favoritesHeroes.filter(
          (heroId) => heroId !== +idHero
        );
        this.db.database
          .ref(`users/${userId}/heroes`)
          .set(newFavoritesHeroes).then(() => {
            this.db.database.ref(`heroes/${idHero}/users`).once('value').then((snapshot) => {
              const newData = snapshot.val().filter(uid => uid !== userId)
              this.db.database.ref(`heroes/${idHero}/users`).set(newData)
            })
          })
        return newFavoritesHeroes
      })
    );
  }
}
