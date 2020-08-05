import { HeroesService } from './../services/heroes.service';
import {
  postHeroToFavoriteSuccessAction,
  uploadUserImageSuccessAction,
  updateUserNameSuccessAction,
  removeHeroFromFavoriteSuccessAction,
} from './../actions/profile.actions';
import { ProfileService } from './../services/profile.service';
import {
  ProfileActions,
  getFavoritesHeroesSuccessAction,
  initProfileStateSuccessAction,
  ProfileActionsUnion,
} from './../actions/profile.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileEffects {
  public initProfileState$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.InitProfileStateAction),
      switchMap(({ userId }) =>
        this.profileService.getUserProfile(userId).pipe(
          map((profileState) => {
            return initProfileStateSuccessAction({ state: profileState });
          })
        )
      )
    )
  );

  public loadFavoritesHeroes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.GetFavoritesHeroesAction),
      switchMap(({ userId }) =>
        this.heroesService.getFavoritesHeroes(userId).pipe(
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
  public pushHeroToFavorite$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.PostHeroToFavoriteAction),
      switchMap(({ idHero }) =>
        this.heroesService.pushHeroToFavorite(idHero).pipe(
          map((value) => {
            console.log(value);
            return value;
          }),
          map(() => postHeroToFavoriteSuccessAction({ payload: idHero }))
        )
      )
    )
  );

  public removeHeroFromFavorite$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ProfileActions.RemoveHeroFromFavoriteAction),
    switchMap(({idHero}) => this.heroesService.removeHeroFromFavorite(idHero).pipe(
      map((newFavoriteHeroes) => removeHeroFromFavoriteSuccessAction({payload: newFavoriteHeroes}))
    ))
  ))

  public uploadUserImage$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.UploadUserImageAction),
      switchMap(({ file }) =>
        this.profileService.uploadUserImage(file).pipe(
          switchMap((url) => this.profileService.setUserImage(url).pipe(map(() => url))),
          map((url) => uploadUserImageSuccessAction({ payload: url }))
        )
      )
    )
  );

  public updateUserName$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.UpdateUserNameAction),
      switchMap(({ name }) =>
        this.profileService
          .changeName(name)
          .pipe(map(() => updateUserNameSuccessAction({ payload: name })))
      )
    )
  );

  constructor(
    private actions$: Actions<ProfileActionsUnion>,
    private profileService: ProfileService,
    private heroesService: HeroesService
  ) {}
}
