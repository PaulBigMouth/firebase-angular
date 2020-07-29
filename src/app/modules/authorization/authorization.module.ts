import { environment } from './../../../environments/environment';
import { InputComponent } from './components/input/input.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthorizationLayoutComponent } from './layout/authorization-layout/authorization-layout.component';
import { NgModule } from '@angular/core';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../authorization/services/auth.service';

@NgModule({
  imports: [
    AuthorizationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,

  ],
  exports: [],
  declarations: [
    AuthorizationLayoutComponent,
    AuthFormComponent,
    InputComponent,
  ],
  providers: [AuthService],
  bootstrap: [AuthorizationLayoutComponent],
})
export class AuthorizationModule {}
