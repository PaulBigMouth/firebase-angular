import { selectHeroesLoader } from './../../../../shared/selectors/heroes.selectors';
import { HeroResponseResult } from './../../../../shared/interfaces/heroes.interface';
import { map, take, filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import {
  selectIdOfFavoritesHeroes,
  selectProfileState,
} from 'src/app/shared/selectors/profile.selectors';
import { getFavoritesHeroesByIdAction } from '../../../../shared/actions/heroes.actions';
import { selectFavoritesHeroes } from 'src/app/shared/selectors/heroes.selectors';

@Component({
  selector: 'app-profile-heroes',
  templateUrl: './profile-heroes.component.html',
  styleUrls: ['./profile-heroes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeroesComponent implements OnInit, OnDestroy {
  public sub: Subscription;
  public subIdOfHeroes: Subscription;
  public favoritesHeroes$: Observable<HeroResponseResult[]> = this.store.pipe(
    select(selectFavoritesHeroes),
  );
  public loader$: Observable<boolean> = this.store.pipe(select(selectHeroesLoader))

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.sub = this.store
      .select(selectProfileState)
      .pipe(
        filter((data) =>  !!data.heroes.length),
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

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.subIdOfHeroes) {
      this.subIdOfHeroes.unsubscribe();
    }
  }

  log() {
    console.log(this.favoritesHeroes$);
  }
}
