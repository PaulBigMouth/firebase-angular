import { createChatChannelAction } from './../../../../shared/actions/profile.actions';
import { Store } from '@ngrx/store';
import { ProfileState } from './../../../../shared/reducers/profile.reducers';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input()
  public user: ProfileState;

  constructor(private store: Store) {}

  public sendMessage(): void {
    this.store.dispatch(
      createChatChannelAction({
        penFriendId: this.user.uid,
        channels: this.user.channels,
      })
    );
  }
}
