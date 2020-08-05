import { uploadUserImageAction } from './../../../../shared/actions/profile.actions';

import { AuthService } from './../../../../shared/services/auth.service';

import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { signOutAction } from 'src/app/shared/actions/auth.actions';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileLayoutComponent implements OnInit {
  @ViewChild('fileInput') public inputRef: ElementRef;
  links = [
    { name: 'Main', url: '/profile/main' },
    { name: 'Characters ', url: '/profile/characters' },
  ];
  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit(): void {}

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
