import { postHeroToFavoriteSuccessAction } from './../actions/profile.actions';
import { ProfileService } from './../services/profile.service';
import {
  ProfileActions,
  getFavoritesHeroesSuccessAction,
  initProfileStateSuccessAction,
  ProfileActionsUnion,
} from './../actions/profile.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileEffects {

  public initProfileState$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(ProfileActions.InitProfileStateAction),
      switchMap(({userId}) => this.profileService.getUserProfile(userId).pipe(
          map(profileState => {
              console.log(profileState)
              return initProfileStateSuccessAction({state: profileState})
          })
      ))
  ))

  public loadFavoritesHeroes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.GetFavoritesHeroesAction),
      switchMap(({ userId }) =>
        this.profileService.getFavoritesHeroes(userId).pipe(
          map((data) => {
            console.log(data);
            return data;
          }),
          map((data) => {
            if (data) {
              return getFavoritesHeroesSuccessAction({ payload: data });
            }
            // return getFavoritesHeroesSuccessAction()
          })
        )
      )
    )
  );
  public pushHeroToFavorite$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(ProfileActions.PostHeroToFavoriteAction),
      switchMap(({idHero}) => this.profileService.pushHeroToFavorite(idHero).pipe(
          map(value => {
              console.log(value)
              return value
          }),
          map(() => postHeroToFavoriteSuccessAction({payload: 'hello'}))
      ))
  ))
  // public removeHeroFromFavorite$: Observable<Action> = createEffect(() => this.actions$.pipe(
  //     ofType(HeroesActions.RemoveHeroFromFavoriteAction),
  //     switchMap(({id}) => this.heroesService.removeHeroFromFavorite(id).pipe(
  //       map(() => removeHeroFromFavoriteSuccessAction({payload: id}))
  //     ))
  //   ))

  constructor(
    private actions$: Actions<ProfileActionsUnion>,
    private profileService: ProfileService
  ) {}
}
