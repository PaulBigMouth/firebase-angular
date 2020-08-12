import { sendMessageAction } from './../../../../shared/actions/chat.actions';
import { FormGroup, FormControl } from '@angular/forms';
import {
  selectChatMessages,
  selectFormDisabled,
} from './../../../../shared/selectors/chat.selectors';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ChatMessage } from 'src/app/shared/interfaces/chat.interface';
import { selectUserId } from 'src/app/shared/selectors/auth.selectors';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewInit {
  public sub: Subscription;
  public userId$: Observable<string> = this.store.select(selectUserId);
  public form: FormGroup;
  public messages$: Observable<ChatMessage[]>;
  public formDisabled$: Observable<boolean> = this.store.select(
    selectFormDisabled
  );
  public idChannel: string;
  @ViewChild('chatWindow')
  public chatWindowRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      message: new FormControl(null),
    });
    this.sub = this.route.params.subscribe((params: Params) => {
      this.messages$ = this.store.pipe(
        select(selectChatMessages(params['id']))
      );
      this.idChannel = params['id'];

      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.scrollToBottom());
  }

  public sendMessage(): void {
    this.store.dispatch(
      sendMessageAction({ ...this.form.value, idChannel: this.idChannel })
    );
    this.form.reset();
    setTimeout(() => this.scrollToBottom('smooth'), 300);
  }

  public scrollToBottom(behavior?: string): void {
    if (this.chatWindowRef) {
      this.chatWindowRef.nativeElement.parentNode.scroll({
        top: this.chatWindowRef.nativeElement.clientHeight,
      });
    }
  }
}
