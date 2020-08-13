import { ToastComponent } from './components/toast/toast.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InputComponent } from './components/input/input.component';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { NgModule } from '@angular/core';
import { FormSelectComponent } from './components/form-select/form-select.component';

@NgModule({
  declarations: [
    PreloaderComponent,
    InputComponent,
    NotFoundComponent,
    ToastComponent,
    FormSelectComponent,
  ],
  imports: [CommonModule],
  exports: [
    PreloaderComponent,
    InputComponent,
    NotFoundComponent,
    ToastComponent,
    FormSelectComponent,
  ],
})
export class SharedModule {}
