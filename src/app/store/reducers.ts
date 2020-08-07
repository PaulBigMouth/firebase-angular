import { on, ActionReducerMap } from '@ngrx/store';
import { ChatState, chatReducer } from './../shared/reducers/chat.reducers';
import {
  CommunityState,
  communityReducer,
} from './../shared/reducers/community.reducers';
import {
  ProfileState,
  profileReducer,
} from './../shared/reducers/profile.reducers';
import { AuthState, authReducer } from '../shared/reducers/auth.reducers';
import { HeroesState, heroesReducer } from '../shared/reducers/heroes.reducers';

export interface AppState {
  auth: AuthState;
  heroes: HeroesState;
  profile: ProfileState;
  community: CommunityState;
  chat: ChatState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  heroes: heroesReducer,
  community: communityReducer,
  chat: chatReducer,
  profile: profileReducer,
};
