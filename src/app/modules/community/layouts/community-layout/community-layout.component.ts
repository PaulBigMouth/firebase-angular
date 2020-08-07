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
import { selectUserId } from 'src/app/shared/selectors/auth.selectors';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-community-layout',
  templateUrl: './community-layout.component.html',
  styleUrls: ['./community-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityLayoutComponent implements OnInit, OnDestroy {
  public sub: Subscription;
  public users$: Observable<ProfileState[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
