import { ProfileState } from './../reducers/profile.reducers';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CommunityService } from './../services/community.service';
import { switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import {
  CommunityActionsUnion,
  CommunityActions,
  getVisibleUsersSuccessAction,
  getVisibleUsersErrorAction,
} from './../actions/community.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CommunityEffects {
  public getVisibleUsers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CommunityActions.GetVisibleUsersAction),
      switchMap(({ idUser }) =>
        this.communityService.getVisibleUsers(idUser).pipe(
          map((data: ProfileState[] | null) => {
            const newData = data.filter((user) => user.uid !== idUser);
            return getVisibleUsersSuccessAction({ payload: newData });
          }),
          catchError((e) =>
            of(getVisibleUsersErrorAction({ message: e.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions<CommunityActionsUnion>,
    private communityService: CommunityService
  ) {}
}
