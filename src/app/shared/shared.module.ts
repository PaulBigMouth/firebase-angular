import { InputComponent } from './components/input/input.component';
import { HeroesService } from './services/heroes.service';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './components/preloader/preloader.component';

import { NgModule } from '@angular/core';


@NgModule({
    declarations: [PreloaderComponent, InputComponent],
    imports: [CommonModule],
    exports: [PreloaderComponent, InputComponent]
})
export class SharedModule {

}