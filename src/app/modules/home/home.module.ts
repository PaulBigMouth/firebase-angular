
import { HeroesModule } from './modules/heroes/heroes.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    HomeRoutingModule,
    HeroesModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [],
  declarations: [MainLayoutComponent],
  providers: [],
  bootstrap: [MainLayoutComponent],
})
export class HomeModule {}
