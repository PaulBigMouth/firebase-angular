import { EmailVerifiedPage } from './pages/email-verified-page/email-verified.page';
import { SignUpPage } from './pages/sign-up-page/sign-up.page';
import { SignInPage } from './pages/sign-in-page/sign-in.page';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SharedModule } from './../../shared/shared.module';
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
    SignInPage,
    SignUpPage,
    EmailVerifiedPage,
  ],
  providers: [],
  bootstrap: [],
})
export class AuthorizationModule {}
