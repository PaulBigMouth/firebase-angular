import { SharedModule } from './../../shared/shared.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthorizationLayoutComponent } from './layout/authorization-layout/authorization-layout.component';
import { NgModule } from '@angular/core';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignInFormComponent } from './components/sign-in/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './components/sign-up/sign-up-form/sign-up-form.component';
@NgModule({
  imports: [
    AuthorizationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
  ],
  exports: [],
  declarations: [
    AuthorizationLayoutComponent,
    SignInComponent,
    SignUpComponent,
    SignInFormComponent,
    SignUpFormComponent,
  ],
  providers: [],
  bootstrap: [AuthorizationLayoutComponent],
})
export class AuthorizationModule {}
