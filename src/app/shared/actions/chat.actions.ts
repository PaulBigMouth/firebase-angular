import { Chat } from './../interfaces/chat.interface';
import { createAction, props, union } from '@ngrx/store';

export enum ChatActions {
  GetChatChannelsAction = '[CHAT] GET_CHAT_CHANNELS',
  GetChatChannelsSuccessAction = '[CHAT] GET_CHAT_CHANNELS_SUCCESS',
  GetChatChannelsErrorAction = '[CHAT] GET_CHAT_CHANNELS_ERROR',

  UnsubscribeFromChatChannelsAction = '[CHAT] UNSUBSCRIBE_FROM_CHAT',
  UnsubscribeFromChatChannelsSuccessAction = '[CHAT] UNSUBSCRIBE_FROM_CHAT_SUCCESS',
  UnsubscribeFromChatChannelsErrorAction = '[CHAT] UNSUBSCRIBE_FROM_CHAT_ERROR',

  PushChatChannelAction = '[CHAT] PUSH_CHAT_CHANNEL',

  SendMessageAction = '[CHAT] SEND_MESSAGE',
  SendMessageSuccessAction = '[CHAT] SEND_MESSAGE_SUCCESS',
  SendMessageErrorAction = '[CHAT] SEND_MESSAGE_ERROR',

  UnsetChatStateAction = '[CHAT] UNSET_CHAT_STATE',
}

export const getChatChannelsAction = createAction(
  ChatActions.GetChatChannelsAction
);

export const getChatChannelsSuccessAction = createAction(
  ChatActions.GetChatChannelsSuccessAction
);

export const getChatChannelsErrorAction = createAction(
  ChatActions.GetChatChannelsErrorAction,
  props<{ message: string }>()
);

export const unsubscribeFromChatChannelsAction = createAction(
  ChatActions.UnsubscribeFromChatChannelsAction
);

export const unsubscribeFromChatChannelsSuccessAction = createAction(
  ChatActions.UnsubscribeFromChatChannelsSuccessAction
);

export const unsubscribeFromChatChannelsErrorAction = createAction(
  ChatActions.UnsubscribeFromChatChannelsErrorAction,
  props<{ message: string }>()
);

export const pushChatChannelAction = createAction(
  ChatActions.PushChatChannelAction,
  props<{ channel: { [id: string]: Chat } }>()
);

export const sendMessageAction = createAction(
  ChatActions.SendMessageAction,
  props<{ message: string; idChannel: string }>()
);

export const sendMessageSuccessAction = createAction(
  ChatActions.SendMessageSuccessAction,
  props<{ payload: any }>()
);

export const sendMessageErrorAction = createAction(
  ChatActions.SendMessageErrorAction,
  props<{ message: string }>()
);

export const unsetChatStateAction = createAction(
  ChatActions.UnsetChatStateAction
);

const all = union({
  getChatChannelsAction,
  getChatChannelsSuccessAction,
  getChatChannelsErrorAction,
  unsubscribeFromChatChannelsAction,
  unsubscribeFromChatChannelsSuccessAction,
  unsubscribeFromChatChannelsErrorAction,
  pushChatChannelAction,
  sendMessageAction,
  sendMessageSuccessAction,
  sendMessageErrorAction,
  unsetChatStateAction,
});

export type ChatActionsUnion = typeof all;
