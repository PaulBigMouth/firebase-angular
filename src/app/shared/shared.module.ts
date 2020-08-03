import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './components/preloader/preloader.component';

import { NgModule } from '@angular/core';


@NgModule({
    declarations: [PreloaderComponent],
    exports: [CommonModule],
    imports: [CommonModule],
    entryComponents: [PreloaderComponent]
})
export class SharedModule {

}