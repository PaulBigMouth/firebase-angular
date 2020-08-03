import { HeroesModule } from '../heroes/heroes.module';
import { ProfileModule } from '../profile/profile.module';
import { CommunityModule } from '../community/community.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
@NgModule({
  imports: [HomeRoutingModule, HttpClientModule, CommonModule, HeroesModule, ProfileModule, CommunityModule],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
  bootstrap: [HomeComponent],
})
export class HomeModule {}
