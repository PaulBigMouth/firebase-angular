import { selectPushToFavoritesBtnDisabled } from './../../../../shared/selectors/profile.selectors';
import {
  postHeroToFavoriteAction,
  removeHeroFromFavoriteAction,
} from '../../../../shared/actions/profile.actions';
import { selectHeroFavoriteState } from './../../../../shared/selectors/heroes.selectors';
import { selectHeroDetails } from '../../../../shared/selectors/heroes.selectors';
import { HeroResponseResult } from '../../../../shared/interfaces/heroes.interface';
import { getHeroDetailsAction } from '../../../../shared/actions/heroes.actions';
import { ActivatedRoute, Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroPageComponent implements OnInit, OnDestroy {
  public hero$: Observable<HeroResponseResult>;
  public sub: Subscription;
  public isFavoriteSub: Subscription;
  public isFavorite: boolean;
  public btnDisabled$: Observable<boolean> = this.store.select(
    selectPushToFavoritesBtnDisabled
  );
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.store.dispatch(getHeroDetailsAction({ id: params.id }));
      this.isFavoriteSub = this.store
        .pipe(select(selectHeroFavoriteState(+params.id)))
        .subscribe((flag) => {
          this.isFavorite = flag;
          this.cd.detectChanges();
        });
      this.hero$ = this.store.pipe(
        select(selectHeroDetails, { id: params.id })
      );
      this.cd.detectChanges();
    });
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.isFavoriteSub) {
      this.isFavoriteSub.unsubscribe();
    }
  }

  public pushToFavorite(idHero: number): void {
    if (!this.isFavorite) {
      this.store.dispatch(postHeroToFavoriteAction({ idHero }));
    } else {
      this.store.dispatch(removeHeroFromFavoriteAction({ idHero }));
    }
    this.cd.detectChanges();
  }
}
