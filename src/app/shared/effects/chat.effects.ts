import { switchMap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  ChatActionsUnion,
  ChatActions,
  getChatChannelsSuccessAction,
  getChatChannelsErrorAction,
  unsubscribeFromChatChannelsSuccessAction,
  sendMessageErrorAction,
  sendMessageSuccessAction,
} from './../actions/chat.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChatService } from './../services/chat.service';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ChatEffects {
  public getChatChannels$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.GetChatChannelsAction),
      switchMap(() =>
        this.chatService.getChatChannels().pipe(
          map(() => getChatChannelsSuccessAction()),
          catchError((e) =>
            of(getChatChannelsErrorAction({ message: e.message }))
          )
        )
      )
    )
  );

  public unsubFromChatChannels$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.UnsubscribeFromChatChannelsAction),
      switchMap(() =>
        this.chatService
          .unsubscribeFromDB()
          .pipe(map(() => unsubscribeFromChatChannelsSuccessAction()))
      )
    )
  );

  public sendMessage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.SendMessageAction),
      switchMap(({ message, idChannel }) =>
        this.chatService.sendMessage(message, idChannel).pipe(
          map(() => sendMessageSuccessAction({ payload: 'success' })),
          catchError((error) =>
            of(sendMessageErrorAction({ message: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions<ChatActionsUnion>,
    private chatService: ChatService
  ) {}
}
