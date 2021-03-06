import { selectSignProgress } from './../../../../shared/selectors/auth.selectors';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { signUpAction } from '../../../../shared/actions/auth.actions';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit, OnDestroy {
  public signProgress: boolean;
  public sub: Subscription;
  public form: FormGroup;

  constructor(private store: Store, private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
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
    this.store.dispatch(signUpAction({ payload: this.form.value }));
  }
}
