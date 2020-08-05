import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { HeroResponseResult } from '../../../../shared/interfaces/heroes.interface';
import { getHeroesAction } from 'src/app/shared/actions/heroes.actions';
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
  public heroes$: Observable<HeroResponseResult[]>;

  ngOnInit(): void {
    this.store.dispatch(
      getHeroesAction({ payload: { page: this.page.toString() } })
    );
    this.heroes$ = this.store.pipe(select(selectHeroes));
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll', [])
  public onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 6) {
      this.page++;
      this.store.dispatch(
        getHeroesAction({ payload: { page: this.page.toString() } })
      );
      this.cd.detectChanges();
    }
  }
}
