import { EmailVerifiedPageComponent } from './pages/email-verified-page/email-verified-page.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SharedModule } from './../../shared/shared.module';
// import { AuthorizationLayoutComponent } from './layout/authorization-layout/authorization-layout.component';
import { NgModule } from '@angular/core';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
    AuthorizationRoutingModule,
  ],
  exports: [],
  declarations: [
    SignInFormComponent,
    SignUpFormComponent,
    SignInPageComponent,
    SignUpPageComponent,
    EmailVerifiedPageComponent,
  ],
  providers: [],
  bootstrap: [],
})
export class AuthorizationModule {}
