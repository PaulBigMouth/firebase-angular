import { selectChatMessages } from './../selectors/chat.selectors';
import { map, tap, take } from 'rxjs/operators';
import { pushChatChannelAction } from './../actions/chat.actions';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { selectUserId } from './../selectors/auth.selectors';
import { Store, select } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { selectIdOfChatChannels } from '../selectors/profile.selectors';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private db: AngularFireDatabase, private store: Store) {}

  public createChatChannel(
    penFriendId: string,
    penFriendChannels: { [id: string]: string }
  ): Observable<string> {
    return this.store.select(selectUserId).pipe(
      withLatestFrom(this.store.select(selectIdOfChatChannels)),
      switchMap(([userId, userChannels]) => {
        if (userChannels && penFriendChannels) {
          if (
            Object.keys(userChannels).find((key) => key === penFriendId) ||
            Object.keys(penFriendChannels).find((key) => key === userId)
          ) {
            return of(userChannels[penFriendId]);
          }
        }

        return this.db.database
          .ref('chatChannels')
          .push({
            users: [userId, penFriendId],
          })
          .then((ref) => {
            return this.db.database
              .ref(`chatChannels/${ref.key}/users`)
              .set([userId, penFriendId])
              .then(() =>
                this.db.database
                  .ref(`users/${userId}/channels`)
                  .set({ ...userChannels, [penFriendId]: ref.key })
              )
              .then(() =>
                this.db.database
                  .ref(`users/${penFriendId}/channels`)
                  .set({ ...penFriendChannels, [userId]: ref.key })
              )
              .then(() => ref.key);
          });
      })
    );
  }

  public sendMessage(message: string, idChannel: string): Observable<any> {
    return this.store
      .select(selectUserId)
      .pipe(
        tap((userId) =>
          this.db.database
            .ref(`chatChannels/${idChannel}/messages`)
            .push({
              uid: userId,
              createdAt: new Date().toLocaleDateString(),
              text: message,
            })
        )
      );
  }

  public getChatChannels(): Observable<any> {
    return this.store.select(selectIdOfChatChannels).pipe(
      switchMap((idOfChatChannels) => {
        if (idOfChatChannels) {
          return Object.keys(idOfChatChannels).map((id) =>
            this.db.database
              .ref(`chatChannels/${idOfChatChannels[id]}`)
              .on('value', (snapshot) => {
                this.store.dispatch(
                  pushChatChannelAction({
                    channel: {
                      [idOfChatChannels[id]]: snapshot.val(),
                    },
                  })
                );
              })
          );
        }
        return of({});
      })
    );
  }

  public unsubcribeFromDB(): Observable<void | Object> {
    return this.store.select(selectIdOfChatChannels).pipe(
      switchMap((idOfChatChannels) => {
        if (idOfChatChannels) {
          return from(
            Object.keys(idOfChatChannels).map((id) =>
              this.db.database.ref(`chatChannels/${idOfChatChannels[id]}`).off()
            )
          );
        }
        return of({});
      })
    );
  }
}
