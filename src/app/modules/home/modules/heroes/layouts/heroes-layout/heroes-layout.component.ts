import { Store, select } from '@ngrx/store';
import { Observable, Subscription, from } from 'rxjs';
import { selectHeroes } from "../../store/selectors"
import { HeroesLoad } from "../../store/actions"
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';



@Component({
  selector: 'app-heroes-layout',
  templateUrl: './heroes-layout.component.html',
  styleUrls: ['./heroes-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesLayoutComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private cd: ChangeDetectorRef) {}
  page: number = 1;
  sub: Subscription;
  heroes: any
  ngOnInit(): void {
    this.store.dispatch(new HeroesLoad({ page: this.page.toString() }));
    this.sub = this.store.select(selectHeroes).subscribe(heroes => {
      this.heroes = heroes
      this.cd.detectChanges()
      console.log(this.heroes)
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  logHeroes() {
    console.log(this.heroes);
    
  }
}
