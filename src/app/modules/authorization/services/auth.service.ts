import { Injectable } from '@angular/core';
import {auth} from "firebase/app"
import {AngularFireAuth} from "@angular/fire/auth"
import {AngularFireStore} from "@angular/fire/storage"
import { User } from "../../interfaces"
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    user = null
    constructor(private auth : AngularFireAuth, private afs: AngularFireStore, private store: Store) {
        this.auth.authState.subscribe(user => {
            if(user) {
                this.setUser(user)
                
            }
        })
    }
    setUser(user) {
        this.user = user
    }
    signIn(user: User) {
        this.auth.idToken
    }
    signUp() {

    }

    signOut(): void {

    }

}