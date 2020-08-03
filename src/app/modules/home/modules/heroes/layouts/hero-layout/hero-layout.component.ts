import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-hero-layout',
	templateUrl: './hero-layout.component.html',
	styleUrls: [ './hero-layout.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroLayoutComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
