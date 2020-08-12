import { selectPages, selectHeroesLoader } from './../../../../shared/selectors/heroes.selectors';
import { Filter } from './../../../../shared/interfaces/heroes.interface';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { HeroResponseResult } from '../../../../shared/interfaces/heroes.interface';
import {
  getHeroesAction,
  getHeroesWithFiltersAction,
} from 'src/app/shared/actions/heroes.actions';
import { selectHeroes } from 'src/app/shared/selectors/heroes.selectors';

@Component({
  selector: 'app-heroes-layout',
  templateUrl: './heroes-layout.component.html',
  styleUrls: ['./heroes-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesLayoutComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private cd: ChangeDetectorRef) {}

  public page: number = 1;
  public maxPage: number;
  public pagesSub: Subscription;

  public heroes$: Observable<HeroResponseResult[]>;

  
  public loaderSub: Subscription
  public loader: boolean

  ngOnInit(): void {
    this.store.dispatch(
      getHeroesAction({ payload: { page: this.page.toString() } })
    );
    this.heroes$ = this.store.pipe(select(selectHeroes));
    this.pagesSub = this.store.select(selectPages).subscribe((pages) => {
      this.maxPage = pages;
    });
    this.loaderSub = this.store.select(selectHeroesLoader).subscribe(loader => {
      this.loader = loader
    })
  }

  ngOnDestroy(): void {
    if (this.pagesSub) {
      this.pagesSub.unsubscribe();
    }
    if(this.loaderSub) {
      this.loaderSub.unsubscribe()
    }
  }

  @HostListener('window:scroll', [])
  public onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 6 &&
      this.page < this.maxPage &&
      !this.loader
    ) {
      this.page++;
      this.store.dispatch(
        getHeroesAction({ payload: { page: this.page.toString() } })
      );
      this.cd.detectChanges();
    }
  }

  public applyFilters(filter: Filter): void {
    this.store.dispatch(
      getHeroesWithFiltersAction({ params: { ...filter, page: '0' } })
    );
    this.page = 0;
  }
}
