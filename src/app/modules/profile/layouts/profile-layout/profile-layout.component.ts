import {
  selectAvatarUrl,
  selectProfileLoader,
} from './../../../../shared/selectors/profile.selectors';
import { uploadUserImageAction } from './../../../../shared/actions/profile.actions';
import { Store, select } from '@ngrx/store';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { signOutAction } from 'src/app/shared/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileLayoutComponent implements OnInit {
  @ViewChild('fileInput') public inputRef: ElementRef;
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
