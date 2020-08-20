import { HomePage } from './pages/home-page/home.page';
import { HeroesModule } from '../heroes/heroes.module';
import { ProfileModule } from '../profile/profile.module';
import { CommunityModule } from '../community/community.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HomeRoutingModule,
    HttpClientModule,
    CommonModule,
    HeroesModule,
    ProfileModule,
    CommunityModule,
  ],
  exports: [],
  declarations: [HomePage],
  providers: [],
  bootstrap: [HomePage],
})
export class HomeModule {}
