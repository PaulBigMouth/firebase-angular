import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { signUpAction } from 'src/app/shared/actions/auth.actions';
import { selectSignProgress } from 'src/app/shared/selectors/auth.selectors';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent implements OnInit {

  public signProgress: boolean;
  public sub: Subscription;
  public form: FormGroup
  constructor(private store: Store, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
    this.sub = this.store.select(selectSignProgress).subscribe(progress => {
      this.signProgress = progress
      this.cd.detectChanges()      
    })
  }


  public onSubmit(): void {
    this.store.dispatch(signUpAction({payload: this.form.value}))
  }

}
