import { Subscription } from 'rxjs';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage implements OnInit, OnDestroy {
  public sub: Subscription;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params: Params) => {
      if (params.accessDenied) {
        alert('You need to sign in');
      } else if (params.sessionFailed) {
        alert('The token has expired');
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
