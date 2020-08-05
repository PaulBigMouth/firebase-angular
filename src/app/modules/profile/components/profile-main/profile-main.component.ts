import { selectUserName } from './../../../../shared/selectors/profile.selectors';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMainComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public sub: Subscription;
  public editFlag: boolean;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
    this.sub = this.store.pipe(select(selectUserName)).subscribe((name) => {
      console.log(name);
      this.form.patchValue({
        name,
      });
      console.log(this.form.value);
    });
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public changeEditFlag(): void {
    this.editFlag = !this.editFlag;
  }
}
