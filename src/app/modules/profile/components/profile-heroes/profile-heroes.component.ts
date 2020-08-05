import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { selectIdOfFavoritesHeroes } from 'src/app/shared/selectors/profile.selectors';
import { getFavoritesHeroesByIdAction } from "../../../../shared/actions/heroes.actions"
import { selectFavoritesHeroes } from 'src/app/shared/selectors/heroes.selectors';

@Component({
  selector: 'app-profile-heroes',
  templateUrl: './profile-heroes.component.html',
  styleUrls: ['./profile-heroes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeroesComponent implements OnInit, OnDestroy {
  public sub: Subscription
  public favoritesHeroes$: Observable<any>;
  constructor(private store: Store) {}

  ngOnInit(): void {
   this.sub = this.store.select(selectIdOfFavoritesHeroes).pipe(
     map((idOfFavoritesHeroes) => this.store.dispatch(getFavoritesHeroesByIdAction({id: idOfFavoritesHeroes}))),
   ).subscribe(() => {
    this.favoritesHeroes$ = this.store.pipe(select(selectFavoritesHeroes))
   })
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }

  log() {
    console.log(this.favoritesHeroes$)
  }

}
