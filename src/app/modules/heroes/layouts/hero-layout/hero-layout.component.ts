import { selectIsFavorite } from './../../store/selectors';
import { HeroResponseResult } from '../../store/reducers';
import { getHeroLoadDetailsAction, checkHeroAction } from './../../store/actions';
import { ActivatedRoute, Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { of, Subscription, Observable } from 'rxjs';
import { selectHeroDetails } from '../../store/selectors';

@Component({
  selector: 'app-hero-layout',
  templateUrl: './hero-layout.component.html',
  styleUrls: ['./hero-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroLayoutComponent implements OnInit, OnDestroy {
  public hero$: Observable<HeroResponseResult>;
  public sub: Subscription;
  public isFavorite$: Observable<boolean>
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.store.dispatch(checkHeroAction({payload: params['id']}))
      this.store.dispatch(getHeroLoadDetailsAction({ id: params['id'] }));
      this.hero$ = this.store.pipe(
        select(selectHeroDetails, { id: params['id'] })
      );
      this.isFavorite$ = this.store.pipe(
        select(selectIsFavorite)
      )
    });
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public pushToFavorite(): void {
    
  }
}
