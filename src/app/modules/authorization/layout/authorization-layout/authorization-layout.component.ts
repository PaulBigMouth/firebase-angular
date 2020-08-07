import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authorization-layout',
  templateUrl: './authorization-layout.component.html',
  styleUrls: ['./authorization-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationLayoutComponent implements OnInit, OnDestroy {
  public sub: Subscription
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params: Params) => {
      if(params['accessDenied']) {
        alert('You need to sign in')
      } else if(params['sessionFailed']) {
        alert('The token has expired')
      }
    })
  }
  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }

}
