import { EmailVerifiedPage } from './pages/email-verified-page/email-verified.page';
import { SignUpPage } from './pages/sign-up-page/sign-up.page';
import { SignInPage } from './pages/sign-in-page/sign-in.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: SignInPage },
  { path: 'signUp', component: SignUpPage },
  { path: 'emailVerified', component: EmailVerifiedPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
