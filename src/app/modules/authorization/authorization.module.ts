import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

import { InputComponent } from './components/input/input.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthorizationLayoutComponent } from './layout/authorization-layout/authorization-layout.component';
import { NgModule } from '@angular/core';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { authReducer } from './store/reducers';
import { AuthEffects } from './store/effects';
@NgModule({
  imports: [
    AuthorizationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [],
  declarations: [
    AuthorizationLayoutComponent,
    AuthFormComponent,
    InputComponent,
    SignInComponent,
    SignUpComponent,
  ],
  providers: [],
  bootstrap: [AuthorizationLayoutComponent],
})
export class AuthorizationModule {}
