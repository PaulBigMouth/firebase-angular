import {
  unsubscribeFromChatChannelsAction,
  getChatChannelsAction,
} from './../../../../shared/actions/chat.actions';
import {
  selectChatLoader,
  selectChatChannels,
} from './../../../../shared/selectors/chat.selectors';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage implements OnInit, OnDestroy {
  public loader$: Observable<boolean> = this.store.pipe(
    select(selectChatLoader)
  );
  public chatChannels$: Observable<string[]>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(getChatChannelsAction());
    this.chatChannels$ = this.store.pipe(select(selectChatChannels));
  }

  public ngOnDestroy(): void {
    this.store.dispatch(unsubscribeFromChatChannelsAction());
  }

  public trackByChannelId(index: string, item: string): string {
    return `${item}`;
  }
}
