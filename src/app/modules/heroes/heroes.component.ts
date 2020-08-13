import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-heroes-component',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent {}
