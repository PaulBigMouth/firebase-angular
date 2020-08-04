import { map, switchMap, mergeMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/app/modules/interfaces';

@Injectable()
export class AuthService {
  private user: firebase.User;
  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {}

  public createUser({
    email,
    password,
  }: User): Observable<firebase.auth.UserCredential> {
    console.log(email, password);
    return from(this.auth.createUserWithEmailAndPassword(email, password));
  }

  public signIn({ email, password }): Observable<firebase.auth.UserCredential> {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  public signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  public getUser(): Observable<firebase.User> {
    // this.auth.onAuthStateChanged((user) => console.log(user));
    return from(this.auth.user.pipe(map((user) => user)));
  }

  public verifyUserEmail(): Observable<firebase.Unsubscribe> {
    return from(
      this.auth.onAuthStateChanged((user) => {
        user.sendEmailVerification();
      })
    );
  }

  public createDBOfUser(user: User, idUser: string): Observable<any> {
    const { email, name } = user;
    console.log(email, name);
    return from(
      this.db.object(`/users/${idUser}`).set({
        email,
        name,
      })
    );
  }
}
