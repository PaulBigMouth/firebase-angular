import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { User } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {}

  public createUser({
    email,
    password,
  }: User): Observable<firebase.auth.UserCredential> {
    return from(this.auth.createUserWithEmailAndPassword(email, password));
  }

  public signIn({ email, password }): Observable<firebase.auth.UserCredential> {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  public signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  public initUser(): Observable<firebase.User> {
    return this.auth.user;
  }

  public getUser(): Observable<firebase.User> {
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
    return from(
      this.db.object(`/users/${idUser}`).set({
        email,
        name,
        uid: idUser,
      })
    );
  }
}
