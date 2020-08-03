import { getHeroesLoadAction } from './../../store/actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectHeroes } from '../../store/selectors';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { HeroResponseResult } from '../../store/reducers';

@Component({
  selector: 'app-heroes-layout',
  templateUrl: './heroes-layout.component.html',
  styleUrls: ['./heroes-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesLayoutComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private cd: ChangeDetectorRef) {}
  public page: number = 1;
  public heroes$: Observable<HeroResponseResult[]>;

  ngOnInit(): void {
    this.store.dispatch(
      getHeroesLoadAction({ payload: { page: this.page.toString() } })
    );
    this.heroes$ = this.store.pipe(select(selectHeroes));
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll', [])
  public onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 6) {
      this.page++;
      console.log('12');
      this.store.dispatch(
        getHeroesLoadAction({ payload: { page: this.page.toString() } })
      );
      this.cd.detectChanges();
    }
  }
}
