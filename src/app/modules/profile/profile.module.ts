import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { ProfileLayoutComponent } from './layouts/profile-layout/profile-layout.component';
import { ProfileMainComponent } from './components/profile-main/profile-main.component';
import { ProfileHeroesComponent } from './components/profile-heroes/profile-heroes.component';

@NgModule({
	imports: [ ProfileRoutingModule, CommonModule, SharedModule ],
	exports: [],
	declarations: [ ProfileLayoutComponent, ProfileMainComponent, ProfileHeroesComponent ],
	providers: [],
	bootstrap: [ ProfileLayoutComponent ],
})
export class ProfileModule {}
