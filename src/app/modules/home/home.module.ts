import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';



@NgModule({
    imports: [HomeRoutingModule],
    exports: [],
    declarations: [MainLayoutComponent],
    providers: [],
    bootstrap: [MainLayoutComponent]
})
export class HomeModule {}