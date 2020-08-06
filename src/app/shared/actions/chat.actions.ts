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


const all = union({
    getChatChannelsAction,
    getChatChannelsSuccessAction,
    getChatChannelsErrorAction,
    unsubFromChatChannelsAction,
    unsubFromChatChannelsSuccessAction,
    unsubFromChatChannelsErrorAction,
    pushChatChannelAction
})

export type ChatActionsUnion = typeof all