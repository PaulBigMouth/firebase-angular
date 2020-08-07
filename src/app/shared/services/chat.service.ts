import { map } from 'rxjs/operators';
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
          console.log(
            Object.keys(userChannels).find((key) => key === penFriendId),
            Object.keys(penFriendChannels).find((key) => key === userId)
          );
          if (
            Object.keys(userChannels).find((key) => key === penFriendId) ||
            Object.keys(penFriendChannels).find((key) => key === userId)
          ) {
            console.log('12341231');
            return of(null);
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

  public getChatChannels(): Observable<any> {
    return this.store.select(selectIdOfChatChannels).pipe(
      switchMap((idOfChatChannels) => {
        if (Object.keys(idOfChatChannels).length) {
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
      })
    );
  }

  public unsubcribeFromDB(): Observable<void> {
    return this.store.select(selectIdOfChatChannels).pipe(
      switchMap((idOfChatChannels) => {
        if (Object.keys(idOfChatChannels).length) {
          return from(
            Object.keys(idOfChatChannels).map((id) =>
              this.db.database.ref(`chatChannels/${idOfChatChannels[id]}`).off()
            )
          );
        }
      })
    );
  }
}
