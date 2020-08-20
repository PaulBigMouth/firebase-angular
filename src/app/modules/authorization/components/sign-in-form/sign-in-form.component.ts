import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { selectSignProgress } from '../../../../shared/selectors/auth.selectors';
import { signInAction } from '../../../../shared/actions/auth.actions';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public signProgress: boolean;
  public sub: Subscription;

  constructor(private store: Store, private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.sub = this.store
      .select(selectSignProgress)
      .subscribe((progress: boolean) => {
        this.signProgress = progress;
        this.cd.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public onSubmit(): void {
    this.store.dispatch(signInAction({ payload: this.form.value }));
  }
}
