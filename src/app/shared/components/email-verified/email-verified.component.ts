import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailVerifiedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
