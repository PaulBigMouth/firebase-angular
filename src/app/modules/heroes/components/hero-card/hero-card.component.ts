import { HeroResponseResult } from '../../../../shared/interfaces/heroes.interface';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCardComponent implements OnInit {
  @Input() hero: HeroResponseResult;
  constructor() {}

  ngOnInit(): void {}
}
