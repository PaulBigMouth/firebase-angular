import { selectUserId } from './../../../../shared/selectors/auth.selectors';
import { ProfileState } from './../../../../shared/reducers/profile.reducers';
import { selectVisibleUsers } from './../../../../shared/selectors/community.selectors';
import { map, take } from 'rxjs/operators';
import { getVisibleUsersAction } from './../../../../shared/actions/community.actions';
import { Store, select } from '@ngrx/store';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-community-page',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityPage implements OnInit, OnDestroy {
  public sub: Subscription;
  public users$: Observable<ProfileState[]>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.sub = this.store
      .select(selectUserId)
      .pipe(
        map((idUser) => this.store.dispatch(getVisibleUsersAction({ idUser }))),
        take(1)
      )
      .subscribe(() => {
        this.users$ = this.store.pipe(select(selectVisibleUsers));
      });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public trackByUserId(index: number, item: ProfileState): string {
    return `${item.uid}`;
  }
}
