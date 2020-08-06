import { ProfileState } from './../reducers/profile.reducers';
import { map, mergeMap } from 'rxjs/operators';
import { CommunityService } from './../services/community.service';
import { switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import {
  CommunityActionsUnion,
  CommunityActions,
  getVisibleUsersSuccessAction,
  getVisibleUsersErrorAction
} from './../actions/community.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CommunityEffects {
  public getVisibleUsers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CommunityActions.GetVisibleUsersAction),
      switchMap(({ idUser }) =>
        this.communityService.getVisibleUsers(idUser).pipe(
          map((data: ProfileState[] | null) => {
            if (data) {
              const newData = data.filter((user) => user.uid !== idUser);
              return getVisibleUsersSuccessAction({ payload: newData });
            }
            // return getVisibleUsersSuccessAction({ payload: [] });
            return getVisibleUsersErrorAction({message: 'error_load_visible_users'})
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions<CommunityActionsUnion>,
    private communityService: CommunityService
  ) {}
}
