import { Chat } from './../../../../shared/interfaces/chat.interface';
import { unsubFromChatChannelsAction } from './../../../../shared/actions/chat.actions';
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
import { getChatChannelsAction } from 'src/app/shared/actions/chat.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy {
  public loader$: Observable<boolean> = this.store.pipe(
    select(selectChatLoader)
  );
  public chatChannels$: Observable<string[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getChatChannelsAction());
    this.chatChannels$ = this.store.pipe(select(selectChatChannels));
  }

  ngOnDestroy(): void {
    this.store.dispatch(unsubFromChatChannelsAction());
  }
}
