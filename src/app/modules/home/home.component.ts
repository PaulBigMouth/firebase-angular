import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public links = [
    { name: 'Heroes', url: '/heroes' },
    { name: 'Community', url: '/community' },
    { name: 'Profile', url: '/profile' },
  ];
  constructor() {}

  ngOnInit(): void {}

  public toggleBurgerMenu(): void {
    document.querySelector('.main__header__nav').classList.toggle('open');
  }
}
