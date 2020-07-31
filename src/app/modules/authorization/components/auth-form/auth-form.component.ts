import { SignIn, SignUp } from './../../../../store/auth/actions';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../../store/auth/actions';
import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-auth-form',
	templateUrl: './auth-form.component.html',
	styleUrls: [ './auth-form.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit, OnChanges {
	@Input() sign: string;
	form: FormGroup;

	constructor(private cd: ChangeDetectorRef, private store: Store) {}

	ngOnInit(): void {
		if (this.sign === 'up') {
			this.form = new FormGroup({
				name: new FormControl(null, Validators.required),
				email: new FormControl('', [ Validators.required, Validators.email ]),
				phone: new FormControl('', [
					Validators.required,
					Validators.pattern(/[()][0-9][0-9][0-9][)]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/g),
				]),
				password: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
			});
		} else {
			this.form = new FormGroup({
				email: new FormControl('', [ Validators.required, Validators.email ]),
				password: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
			});
		}
	}
	ngOnChanges() {}
	onSubmit(): void {
		this.form.disable();

		if (this.sign === 'up') {
			this.store.dispatch(new SignUp(this.form.value));
		} else {
			this.store.dispatch(new SignIn(this.form.value));
		}
		this.form.enable();
	}
}
