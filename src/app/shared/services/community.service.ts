import { ProfileState } from './../reducers/profile.reducers';
import { switchMap, map } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { selectIdOfFavoritesHeroes } from '../selectors/profile.selectors';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  constructor(private store: Store, private db: AngularFireDatabase) {}

  public getVisibleUsers(idUser: string): Observable<any> {
    return this.store.select(selectIdOfFavoritesHeroes).pipe(
      switchMap((favoritesHeroes) => {
        if (favoritesHeroes.length) {
          return favoritesHeroes.map((heroId) =>
            this.db.database
              .ref(`heroes/${heroId}/users`)
              .once('value')
              .then((snapshot) => {
                return snapshot.val();
              })
          );
        } else return of(null);
      }),
      switchMap((data) => {
        if (data) {
          return data.then((usersId) =>
            Promise.all(
              usersId.map(
                async (userId) =>
                  await this.db.database
                    .ref(`users/${userId}`)
                    .once('value')
                    .then((snapshot) => {
                      return snapshot.val();
                    })
              )
            )
          );
        }
        return of(null);
      })
    );
  }
}
