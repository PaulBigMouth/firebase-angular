import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Params, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { authAnimation } from '../../../../shared/animation/auth.animation';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [authAnimation],
})
export class AuthorizationPageComponent implements OnInit, OnDestroy {
  public sub: Subscription;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params: Params) => {
      if (params.accessDenied) {
        alert('You need to sign in');
      } else if (params.sessionFailed) {
        alert('The token has expired');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public prepareRoute(outlet: RouterOutlet): boolean {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
