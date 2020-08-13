import {
  getChatChannelsAction,
  ChatActionsUnion,
  getChatChannelsSuccessAction,
  pushChatChannelAction,
  sendMessageAction,
  sendMessageSuccessAction,
  sendMessageErrorAction,
  unsetChatStateAction,
  unsubscribeFromChatChannelsAction,
} from './../actions/chat.actions';
import { createReducer, on } from '@ngrx/store';
import { Chat } from './../interfaces/chat.interface';

const initialState: ChatState = {
  chatChannels: null,
  chatLoader: false,
  formDisabled: false,
};

export interface ChatState {
  chatChannels: {
    [id: string]: Chat;
  };
  chatLoader: boolean;
  formDisabled: boolean;
}

const reducer = createReducer<ChatState>(
  initialState,
  on(getChatChannelsAction, (state, action) => ({
    ...state,
    chatLoader: true,
  })),
  on(getChatChannelsSuccessAction, (state, action) => ({
    ...state,
    chatLoader: false,
  })),
  on(pushChatChannelAction, (state, action) => ({
    ...state,
    chatChannels: {
      ...state.chatChannels,
      ...action.channel,
    },
  })),
  on(unsubscribeFromChatChannelsAction, (state) => ({
    ...state,
    chatChannels: null,
  })),
  on(sendMessageAction, (state) => ({
    ...state,
    formDisabled: true,
  })),
  on(sendMessageSuccessAction, (state) => ({
    ...state,
    formDisabled: false,
  })),
  on(sendMessageErrorAction, (state) => ({
    ...state,
    formDisabled: false,
  })),
  on(unsetChatStateAction, () => initialState)
);

export function chatReducer(
  state: ChatState,
  action: ChatActionsUnion
): ChatState {
  return reducer(state, action);
}
