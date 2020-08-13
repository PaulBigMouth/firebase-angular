// import { AuthorizationLayoutComponent } from './layout/authorization-layout/authorization-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailVerifiedPageComponent } from './pages/email-verified-page/email-verified-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AuthorizationLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: SignInComponent,
  //       data: { animation: 'authAnimation' },
  //     },
  //     {
  //       path: 'signUp',
  //       component: SignUpComponent,
  //       data: { animation: 'authAnimation' },
  //     },
  //     {
  //       path: 'emailVerified',
  //       component: EmailVerifiedPageComponent,
  //       data: { animation: 'authAnimation' },
  //     },
  //   ],
  // },
  { path: '', component: SignInPageComponent },
  { path: 'signUp', component: SignUpPageComponent },
  { path: 'emailVerified', component: EmailVerifiedPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
