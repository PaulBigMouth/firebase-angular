import { ProfileState } from './../reducers/profile.reducers';
import { union, createAction, props } from '@ngrx/store';

export enum ProfileActions {
  InitProfileStateAction = '[PROFILE] INIT_PROFILE_STATE',
  InitProfileStateSuccessAction = '[PROFILE] INIT_PROFILE_STATE_SUCCESS',
  InitProfileStateErrorAction = '[PROFILE] INIT_PROFILE_STATE_ERROR',
  GetFavoritesHeroesAction = '[PROFILE] GET_FAVORITES_HEROES',
  GetFavoritesHeroesSuccessAction = '[PROFILE] GET_FAVORITES_HEROES_SUCCESS',
  GetFavoritesHeroesErrorAction = '[PROFILE] GET_FAVORITES_HEROES_ERROR',
  PostHeroToFavoriteAction = '[PROFILE] POST_HERO_TO_FAVORITE',
  PostHeroToFavoriteSuccessAction = '[PROFILE] POST_HERO_TO_FAVORITE_SUCCESS',
  PostHeroToFavoriteErrorAction = '[PROFILE] POST_HERO_TO_FAVORITE_PROFILE',
  RemoveHeroFromFavoriteAction = '[PROFILE] REMOVE_HERO_FROM_FAVORITE',
  RemoveHeroFromFavoriteSuccessAction = '[PROFILE] REMOVE_HERO_FROM_FAVORITE_SUCCESS',
  RemoveHeroFromFavoriteErrorAction = '[PROFILE] REMOVE_HERO_FROM_FAVORITE_ERROR',
  UploadUserImageAction = '[PROFILE] UPLOAD_USER_IMAGE',
  UploadUserImageSuccessAction = '[PROFILE] UPLOAD_USER_IMAGE_SUCCESS',
  UploadUserImageErrorAction = '[PROFILE] UPLOAD_USER_IMAGE_ERROR',
  UpdateUserNameAction = '[PROFILE] UPDATE_USER_NAME',
  UpdateUserNameSuccessAction = '[PROFILE] UPDATE_USER_NAME_SUCCESS',
  UpdateUserNameErrorAction = '[PROFILE] UPDATE_USER_NAME_ERROR',
  CreateChatChannelAction = '[CHAT] CREATE_CHAT_CHANNEL',
  CreateChatChannelSuccessAction = '[CHAT] CREATE_CHAT_CHANNEL_SUCCESS',
  CreateChatChannelErrorAction = '[CHAT] CREATE_CHAT_CHANNEL_ERROR',
}

export const initProfileStateAction = createAction(
  ProfileActions.InitProfileStateAction,
  props<{ userId: string }>()
);

export const initProfileStateSuccessAction = createAction(
  ProfileActions.InitProfileStateSuccessAction,
  props<{ state: ProfileState }>()
);

export const initProfileStateErrorAction = createAction(
  ProfileActions.InitProfileStateErrorAction,
  props<{ message: string }>()
);

export const getFavoritesHeroesAction = createAction(
  ProfileActions.GetFavoritesHeroesAction,
  props<{ userId: string }>()
);

export const getFavoritesHeroesSuccessAction = createAction(
  ProfileActions.GetFavoritesHeroesSuccessAction,
  props<{ payload: number[] }>()
);

export const getFavoritesHeroesErrorAction = createAction(
  ProfileActions.GetFavoritesHeroesErrorAction,
  props<{ message: string }>()
);

export const postHeroToFavoriteAction = createAction(
  ProfileActions.PostHeroToFavoriteAction,
  props<{ idHero: number }>()
);

export const postHeroToFavoriteSuccessAction = createAction(
  ProfileActions.PostHeroToFavoriteSuccessAction,
  props<{ payload: number }>()
);

export const postHeroToFavoriteErrorAction = createAction(
  ProfileActions.PostHeroToFavoriteErrorAction,
  props<{ message: string }>()
);

export const removeHeroFromFavoriteAction = createAction(
  ProfileActions.RemoveHeroFromFavoriteAction,
  props<{ idHero: number }>()
);

export const removeHeroFromFavoriteSuccessAction = createAction(
  ProfileActions.RemoveHeroFromFavoriteSuccessAction,
  props<{ payload: number[] }>()
);

export const removeHeroFromFavoriteErrorAction = createAction(
  ProfileActions.RemoveHeroFromFavoriteErrorAction,
  props<{ message: string }>()
);

export const uploadUserImageAction = createAction(
  ProfileActions.UploadUserImageAction,
  props<{ file: File }>()
);

export const uploadUserImageSuccessAction = createAction(
  ProfileActions.UploadUserImageSuccessAction,
  props<{ payload: string }>()
);

export const uploadUserImageErrorAction = createAction(
  ProfileActions.UploadUserImageErrorAction,
  props<{ message: string }>()
);

export const updateUserNameAction = createAction(
  ProfileActions.UpdateUserNameAction,
  props<{ name: string }>()
);

export const updateUserNameSuccessAction = createAction(
  ProfileActions.UpdateUserNameSuccessAction,
  props<{ payload: string }>()
);

export const updateUserNameErrorAction = createAction(
  ProfileActions.UpdateUserNameErrorAction,
  props<{ message: string }>()
);

export const createChatChannelAction = createAction(
  ProfileActions.CreateChatChannelAction,
  props<{ penFriendId: string; channels: { [id: string]: string } }>()
);

export const createChatChannelSuccessAction = createAction(
  ProfileActions.CreateChatChannelSuccessAction,
  props<{ channelId: string }>()
);

export const createChatChannelErrorAction = createAction(
  ProfileActions.CreateChatChannelErrorAction,
  props<{ message: string }>()
);

const all = union({
  initProfileStateAction,
  initProfileStateSuccessAction,
  initProfileStateErrorAction,
  getFavoritesHeroesAction,
  getFavoritesHeroesSuccessAction,
  getFavoritesHeroesErrorAction,
  postHeroToFavoriteAction,
  postHeroToFavoriteSuccessAction,
  postHeroToFavoriteErrorAction,
  removeHeroFromFavoriteAction,
  removeHeroFromFavoriteSuccessAction,
  removeHeroFromFavoriteErrorAction,
  uploadUserImageAction,
  uploadUserImageSuccessAction,
  uploadUserImageErrorAction,
  updateUserNameAction,
  updateUserNameSuccessAction,
  updateUserNameErrorAction,
  createChatChannelAction,
  createChatChannelSuccessAction,
  createChatChannelErrorAction,
});

export type ProfileActionsUnion = typeof all;
