import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: [ './main-layout.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
	links = [{name: 'Heroes', url: '/heroes'}, {name: "Community", url: '/community'}]
	constructor() {}

	ngOnInit(): void {}

	
}
