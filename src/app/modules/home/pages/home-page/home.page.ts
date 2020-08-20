import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  public links = [
    { name: 'Heroes', url: '/heroes' },
    { name: 'Community', url: '/community' },
    { name: 'Profile', url: '/profile' },
  ];

  public ngOnInit(): void {}

  public toggleBurgerMenu(): void {
    document.querySelector('.main__header__nav').classList.toggle('open');
  }
}
