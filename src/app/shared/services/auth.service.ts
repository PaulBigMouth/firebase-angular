import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/modules/interfaces';

@Injectable()
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  public createUser(
    user: User
  ): Observable<firebase.auth.UserCredential | void> {
    const { email, password, name } = user;

    return from(
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => alert(error))
    );
  }
  public signIn({
    email,
    password,
  }): Observable<firebase.auth.UserCredential | void> {
    return from(
      this.auth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => console.log(error))
    );
  }
  public signOut(): Observable<void> {
    return from(this.auth.signOut());
  }
  public getUser(): Observable<firebase.User> {
    return from(this.auth.currentUser)
  }
  public verifyUserEmail(): Observable<firebase.Unsubscribe> {
    return from(
      this.auth.onAuthStateChanged((user) => {
         user.sendEmailVerification();
      })
    );
  }
}
