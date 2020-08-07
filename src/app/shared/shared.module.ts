import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmailVerifiedComponent } from './components/email-verified/email-verified.component';
import { InputComponent } from './components/input/input.component';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './components/preloader/preloader.component';

import { NgModule } from '@angular/core';


@NgModule({
    declarations: [PreloaderComponent, InputComponent, EmailVerifiedComponent, NotFoundComponent, ToastComponent],
    imports: [CommonModule, RouterModule],
    exports: [PreloaderComponent, InputComponent, EmailVerifiedComponent, NotFoundComponent, ToastComponent]
})
export class SharedModule {

}