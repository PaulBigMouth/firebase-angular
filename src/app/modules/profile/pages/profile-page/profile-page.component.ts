import { unsetChatStateAction } from './../../../../shared/actions/chat.actions';
import { unsetCommunityStateAction } from './../../../../shared/actions/community.actions';
import { unsetHeroesStateAction } from './../../../../shared/actions/heroes.actions';
import {
  unsetAuthStateAction,
  signOutAction,
} from './../../../../shared/actions/auth.actions';
import {
  selectAvatarUrl,
  selectProfileLoader,
} from './../../../../shared/selectors/profile.selectors';
import {
  uploadUserImageAction,
  unsetProfileStateAction,
} from './../../../../shared/actions/profile.actions';
import { Store, select } from '@ngrx/store';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent implements OnInit {
  @ViewChild('fileInput')
  public inputRef: ElementRef;
  public avatarUrl$: Observable<string>;
  public loader$: Observable<boolean>;
  public links = [
    { name: 'Main', url: '/profile/main' },
    { name: 'Characters ', url: '/profile/characters' },
    { name: 'Messages', url: '/profile/messages' },
  ];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.avatarUrl$ = this.store.pipe(select(selectAvatarUrl));
    this.loader$ = this.store.pipe(select(selectProfileLoader));
  }

  public signOut(): void {
    this.store.dispatch(signOutAction());
    this.store.dispatch(unsetAuthStateAction());
    this.store.dispatch(unsetHeroesStateAction());
    this.store.dispatch(unsetProfileStateAction());
    this.store.dispatch(unsetCommunityStateAction());
    this.store.dispatch(unsetChatStateAction());
  }

  public onFileUpload($event: any): void {
    const file = $event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.store.dispatch(uploadUserImageAction({ file }));
    };
    reader.readAsDataURL(file);
  }

  public triggerClick(): void {
    this.inputRef.nativeElement.click();
  }
}
