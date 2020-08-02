import { SignIn, SignUp } from '../../store/actions';
import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { selectSignProgress } from '../../store/selectors';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit, OnDestroy {
  @Input() sign: string;
  form: FormGroup;
  sub: Subscription;
  signProgress: any;
  constructor(private store: Store, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.sign === 'up') {
      this.form = new FormGroup({
        name: new FormControl(null, Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      });
    } else {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      });
    }
    this.sub = this.store.select(selectSignProgress).subscribe((progress) => {
      this.signProgress = progress;
      this.cd.detectChanges();
    });
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit() {
    if (this.sign === 'up') {
      this.store.dispatch(new SignUp(this.form.value));
    } else {
      this.store.dispatch(new SignIn(this.form.value));
    }
  }
}
