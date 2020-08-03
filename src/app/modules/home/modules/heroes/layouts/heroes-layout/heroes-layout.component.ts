import { Store, select } from '@ngrx/store';
import { Observable, Subscription, from } from 'rxjs';
import { selectHeroes } from '../../store/selectors';
import { HeroesLoad } from '../../store/actions';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy, HostListener } from '@angular/core';
import { HeroResponseResult } from '../../../../../interfaces';

@Component({
	selector: 'app-heroes-layout',
	templateUrl: './heroes-layout.component.html',
	styleUrls: [ './heroes-layout.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesLayoutComponent implements OnInit, OnDestroy {
	constructor(private store: Store, private cd: ChangeDetectorRef) {}
	page: number = 1;
	heroes$: Observable<any>;
	flag = false;
	ngOnInit(): void {
		this.store.dispatch(new HeroesLoad({ page: this.page.toString() }));
		this.heroes$ = this.store.pipe(select(selectHeroes));
	}

	ngOnDestroy(): void {}
	@HostListener('window:scroll', [])
	onScroll(): void {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 6) {
			this.page++;
			console.log('12');
			this.store.dispatch(new HeroesLoad({ name: 'mrs_sanchez' }));
			this.cd.detectChanges();
		}
	}
}
