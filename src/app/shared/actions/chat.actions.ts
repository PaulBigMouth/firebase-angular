import { Chat } from './../interfaces/chat.interface';
import { createAction, props, union } from '@ngrx/store';


export enum ChatActions {
    GetChatChannelsAction = '[CHAT] GET_CHAT_CHANNELS',
    GetChatChannelsSuccessAction = '[CHAT] GET_CHAT_CHANNELS_SUCCESS',
    GetChatChannelsErrorAction = '[CHAT] GET_CHAT_CHANNELS_ERROR',

    UnsubFromChatChannelssAction = '[CHAT] UNSUB_FROM_CHAT_CHANNEL',
    UnsubFromChatChannelsSuccessAction = '[CHAT] UNSUB_FROM_CHAT_SUCCESS',
    UnsubFromChatChannelsErrorAction = '[CHAT] UNSUB_FROM_CHAT_ERROR',

    PushChatChannelAction = '[CHAT] PUSH_CHAT_CHANNEL',

    SendMessageAction = '[CHAT] SEND_MESSAGE',
    SendMessageSuccessAction = '[CHAT] SEND_MESSAGE_SUCCESS',
    SendMessageErrorAction = '[CHAT] SEND_MESSAGE_ERROR',

    UnsetChatStateAction = '[CHAT] UNSET_CHAT_STATE'
}

export const getChatChannelsAction = createAction(
    ChatActions.GetChatChannelsAction
)

export const getChatChannelsSuccessAction = createAction(
    ChatActions.GetChatChannelsSuccessAction,
    props<{ payload: any }>()
)

export const getChatChannelsErrorAction = createAction(
    ChatActions.GetChatChannelsErrorAction,
    props<{ message: string }>()
)

export const unsubFromChatChannelsAction = createAction(
    ChatActions.UnsubFromChatChannelssAction
)

export const unsubFromChatChannelsSuccessAction = createAction(
    ChatActions.UnsubFromChatChannelsSuccessAction,
    props<{ message: string }>()
)

export const unsubFromChatChannelsErrorAction = createAction(
    ChatActions.UnsubFromChatChannelsErrorAction,
    props<{ message: string }>()
)

export const pushChatChannelAction = createAction(
    ChatActions.PushChatChannelAction,
    props<{ channel: {[id: string]: Chat} }>()
)

export const sendMessageAction = createAction(
    ChatActions.SendMessageAction,
    props<{ message: string, idChannel: string }>()
)

export const sendMessageSuccessAction = createAction(
    ChatActions.SendMessageSuccessAction,
    props<{ payload: any }>()
)

export const sendMessageErrorAction = createAction(
    ChatActions.SendMessageErrorAction,
    props<{ message: string }>()
)

export const unsetChatStateAction = createAction(
    ChatActions.UnsetChatStateAction
)

const all = union({
    getChatChannelsAction,
    getChatChannelsSuccessAction,
    getChatChannelsErrorAction,
    unsubFromChatChannelsAction,
    unsubFromChatChannelsSuccessAction,
    unsubFromChatChannelsErrorAction,
    pushChatChannelAction,
    sendMessageAction,
    sendMessageSuccessAction,
    sendMessageErrorAction,
    unsetChatStateAction
})

export type ChatActionsUnion = typeof all