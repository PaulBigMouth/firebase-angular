import { ProfileModule } from './modules/profile/profile.module';
import { CommunityModule } from './modules/community/community.module';

import { HeroesModule } from './modules/heroes/heroes.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [ HomeRoutingModule, HeroesModule, HttpClientModule, CommonModule, CommunityModule, ProfileModule ],
	exports: [],
	declarations: [ MainLayoutComponent ],
	providers: [],
	bootstrap: [ MainLayoutComponent ],
})
export class HomeModule {}
