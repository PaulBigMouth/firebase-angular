import { environment } from './../../../environments/environment';
import { HeroResponseResult } from './../interfaces/heroes.interface';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
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
  constructor(
    private http: HttpClient,
    private store: Store,
    private db: AngularFireDatabase
  ) {}

  public getHeroes(params = {}): Observable<HeroesResponse> {
    return this.http.get<HeroesResponse>(environment.apiUrlHero, {
      params: new HttpParams({
        fromObject: params,
      }),
    });
  }

  public getHeroById(id: number): Observable<HeroResponseResult> {
    return this.http.get<HeroResponseResult>(`${environment.apiUrlHero}/${id}`);
  }

  public getHeroesById(id: number[]): Observable<HeroResponseResult[]> {
    return this.http.get<HeroResponseResult[]>(
      `${environment.apiUrlHero}/${id}`
    );
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
          .set(newFavoritesHeroes)
          .then(() => {
            this.db.database
              .ref(`heroes/${idHero}/users`)
              .once('value')
              .then((snapshot) => {
                const newData = snapshot.val().filter((uid) => uid !== userId);
                this.db.database.ref(`heroes/${idHero}/users`).set(newData);
              });
          });
        return newFavoritesHeroes;
      })
    );
  }
}
