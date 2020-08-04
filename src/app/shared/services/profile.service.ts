import { ProfileState } from './../reducers/profile.reducers';
import { Store } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { selectUserId } from '../selectors/auth.selectors';
import { selectFavoritesHeroes } from '../selectors/profile.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    private store: Store
  ) {}

  public getUserProfile(idUser: string): Observable<ProfileState> {
    return from(
      this.db.database
        .ref(`users/${idUser}`)
        .once('value')
        .then((snapshot) => {
          console.log(snapshot.val());
          return snapshot.val();
        })
    );
  }

  public uploadUserImage(image: File): Observable<string> {
    const ref = this.storage.ref(
      `userImages/${new Date().toLocaleTimeString().toString()}${image.name}`
    );

    return from(
      this.storage
        .ref(
          `userImages/${new Date().toLocaleTimeString().toString()}${
            image.name
          }`
        )
        .put(image)
    ).pipe(
      switchMap(() => {
        return ref.getDownloadURL().pipe(
          map((url) => {
            console.log(url);
            return url;
          })
        );
      })
    );
  }
  public setUserImage(url: string, image) {
    this.storage.ref(``);
  }

  public getFavoritesHeroes(userId: string): Observable<Array<string>> {
    return from(
      this.db.database
        .ref('/users')
        .child(userId)
        .child('heroes')
        .once('value')
        .then((snapshot) => snapshot.val())
    );
  }
  public pushHeroToFavorite(idHero: string): Observable<Promise<void>> {
    return this.store.select(selectUserId).pipe(
      withLatestFrom(this.store.select(selectFavoritesHeroes)),
      map(([userId, favoritesHeroes]) =>
        this.db.database
          .ref(`users/${userId}/heroes`)
          .set([...favoritesHeroes, idHero])
      )
    );
  }

  // public removeHeroFromFavorite(idHero: string): Observable<any> {
  //   return this.store.select(selectUserId).pipe(
  //     switchMap((userId) =>
  //       this.store.select(selectFavoritesHeroes).pipe(
  //         map((favoritesHeroes) => {
  //           const newFavoritesHeroes = favoritesHeroes.filter(
  //             (hero) => hero !== idHero
  //           );
  //           return this.db.database
  //             .ref(`users/${userId}/heroes`)
  //             .set(newFavoritesHeroes);
  //         })
  //       )
  //     )
  //   );
  // }
}
