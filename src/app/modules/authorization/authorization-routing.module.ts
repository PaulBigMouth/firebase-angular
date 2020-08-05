import { EmailVerifiedComponent } from './../../shared/components/email-verified/email-verified.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthorizationLayoutComponent } from './layout/authorization-layout/authorization-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
    {path: '', component: AuthorizationLayoutComponent, children: [
      {path: '', component: SignInComponent},
      {path: 'signUp', component: SignUpComponent},
      {path: 'emailVerified', component: EmailVerifiedComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
