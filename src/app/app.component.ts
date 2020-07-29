import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

declare var firebase
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {
  title = 'firebase-auth';
  ngOnInit() {
    console.log(firebase)
  }
}
