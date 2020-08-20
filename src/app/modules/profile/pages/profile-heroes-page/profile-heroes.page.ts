import {
  selectHeroesLoader,
  selectFavoritesHeroes,
} from '../../../../shared/selectors/heroes.selectors';
import { HeroResponseResult } from '../../../../shared/interfaces/heroes.interface';
import { take, filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import {
  selectProfileState,
  selectIdOfFavoritesHeroes,
} from '../../../../shared/selectors/profile.selectors';
import { getFavoritesHeroesByIdAction } from '../../../../shared/actions/heroes.actions';

@Component({
  selector: 'app-profile-heroes-page',
  templateUrl: './profile-heroes.page.html',
  styleUrls: ['./profile-heroes.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeroesPage implements OnInit, OnDestroy {
  public sub: Subscription;
  public subIdOfHeroes: Subscription;
  public favoritesHeroes$: Observable<HeroResponseResult[]> = this.store.pipe(
    select(selectFavoritesHeroes)
  );
  public loader$: Observable<boolean> = this.store.pipe(
    select(selectHeroesLoader)
  );

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.sub = this.store
      .select(selectProfileState)
      .pipe(
        filter((data) => !!data.heroes.length),
        take(1)
      )
      .subscribe(() => {
        this.subIdOfHeroes = this.store
          .select(selectIdOfFavoritesHeroes)
          .pipe(take(1))
          .subscribe((idOfFavoritesHeroes) => {
            this.store.dispatch(
              getFavoritesHeroesByIdAction({ id: idOfFavoritesHeroes })
            );
          });
      });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.subIdOfHeroes) {
      this.subIdOfHeroes.unsubscribe();
    }
  }
}
