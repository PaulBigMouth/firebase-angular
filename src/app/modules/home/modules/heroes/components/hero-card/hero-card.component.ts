import { HeroResponseResult } from './../../../../../interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
})
export class HeroCardComponent implements OnInit {
  @Input() hero: HeroResponseResult;
  constructor() {}

  ngOnInit(): void {}
}
