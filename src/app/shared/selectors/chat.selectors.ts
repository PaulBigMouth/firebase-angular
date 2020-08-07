import { ChatState } from './../reducers/chat.reducers';
import { createSelector } from '@ngrx/store';
import { AppState } from './../../store/reducers';

export const selectChatState = (state: AppState) => state.chat;

export const selectChatLoader = createSelector(
  selectChatState,
  (chatState: ChatState) => chatState.chatLoader
);

export const selectChatChannels = createSelector(
  selectChatState,
  (chatState: ChatState) => {
    return chatState.chatChannels
      ? Object.keys(chatState.chatChannels).reduce(
          (prev, curr) => [
            ...prev,
            { url: curr, ...chatState.chatChannels[curr] },
          ],
          []
        )
      : [];
  }
);

export const selectChatMessages = (id: string) =>
  createSelector(selectChatState, (chatState: ChatState) =>
    chatState?.chatChannels[id]?.messages
      ? Object.values(chatState.chatChannels[id].messages)
      : []
  );

export const selectFormDisabled = createSelector(
  selectChatState,
  (chatState: ChatState) => chatState.formDisabled
);
