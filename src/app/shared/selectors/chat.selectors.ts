import { ChatState } from './../reducers/chat.reducers';
import { createSelector } from '@ngrx/store';
import { AppState } from './../../store/reducers';

export const selectChatState = (state: AppState) => state.chat

export const selectChatLoader = createSelector(
    selectChatState,
    (chatState: ChatState) => chatState.chatLoader
)