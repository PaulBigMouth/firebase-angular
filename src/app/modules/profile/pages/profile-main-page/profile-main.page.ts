import { updateUserNameAction } from './../../../../shared/actions/profile.actions';
import { selectUserName } from './../../../../shared/selectors/profile.selectors';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-profile-main-page',
  templateUrl: './profile-main.page.html',
  styleUrls: ['./profile-main.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMainPage implements OnInit, OnDestroy {
  public form: FormGroup;
  public sub: Subscription;

  constructor(private store: Store, private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
    this.form.disable();
    this.sub = this.store.pipe(select(selectUserName)).subscribe((name) => {
      this.form.setValue({
        name,
      });
      this.cd.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public changeEditFlag(): void {
    if (this.form.disabled) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }
  public onSave(): void {
    this.store.dispatch(updateUserNameAction(this.form.value));
    this.form.disable();
  }
}
