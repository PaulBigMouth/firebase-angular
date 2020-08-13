import { ProfileState } from './../reducers/profile.reducers';
import { Store } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { selectUserId } from '../selectors/auth.selectors';

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
          return snapshot.val();
        })
    );
  }

  public uploadUserImage(image: File): Observable<string> {
    return this.store.select(selectUserId).pipe(
      switchMap((userId) => {
        const ref = this.storage.ref(`userImages/${userId}`);
        return from(ref.put(image)).pipe(switchMap(() => ref.getDownloadURL()));
      })
    );
  }

  public setUserImage(url: string): Observable<any> {
    return this.store.select(selectUserId).pipe(
      map((userId) => {
        return this.db.database.ref(`users/${userId}/avatarImageUrl`).set(url);
      })
    );
  }

  public changeName(name: string): Observable<any> {
    return this.store
      .select(selectUserId)
      .pipe(
        switchMap((userId) =>
          this.db.database.ref(`users/${userId}/name`).set(name)
        )
      );
  }
}
