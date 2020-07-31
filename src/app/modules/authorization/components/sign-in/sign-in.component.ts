import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: [ './sign-in.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit, OnChanges {
	constructor(private cd: ChangeDetectorRef) {}

	ngOnInit(): void {}
	ngOnChanges(changes): void {
		// this.cd.reattach();
	}
}
