import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { selectFavoritesHeroes } from 'src/app/shared/selectors/profile.selectors';

@Component({
  selector: 'app-profile-heroes',
  templateUrl: './profile-heroes.component.html',
  styleUrls: ['./profile-heroes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeroesComponent implements OnInit {
  public favoritesHeroes$: Observable<number[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.favoritesHeroes$ = this.store.pipe(select(selectFavoritesHeroes));
  }
}
