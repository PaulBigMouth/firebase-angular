import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

import { InputComponent } from './components/input/input.component';
import { AuthorizationLayoutComponent } from './layout/authorization-layout/authorization-layout.component';
import { NgModule } from '@angular/core';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { reducer } from "./store/reducers"
import { AuthEffects } from './store/effects';
import { SignInFormComponent } from './components/sign-in/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './components/sign-up/sign-up-form/sign-up-form.component';
@NgModule({
  imports: [
    AuthorizationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [],
  declarations: [
    AuthorizationLayoutComponent,
    InputComponent,
    SignInComponent,
    SignUpComponent,
    SignInFormComponent,
    SignUpFormComponent,
  ],
  providers: [],
  bootstrap: [AuthorizationLayoutComponent],
})
export class AuthorizationModule {}
