import { ChatWindowDirective } from './directives/chat/chat-window.directive';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmailVerifiedComponent } from './components/email-verified/email-verified.component';
import { InputComponent } from './components/input/input.component';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './components/preloader/preloader.component';

import { NgModule } from '@angular/core';
import { FormSelectComponent } from './components/form-select/form-select.component';

@NgModule({
  declarations: [
    PreloaderComponent,
    InputComponent,
    EmailVerifiedComponent,
    NotFoundComponent,
    ToastComponent,
    FormSelectComponent,
    ChatWindowDirective,
  ],
  imports: [CommonModule],
  exports: [
    PreloaderComponent,
    InputComponent,
    EmailVerifiedComponent,
    NotFoundComponent,
    ToastComponent,
    FormSelectComponent,
    ChatWindowDirective,
  ],
})
export class SharedModule {}
