import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityLayoutComponent } from './layouts/community-layout/community-layout.component';
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
	imports: [ CommunityRoutingModule, CommonModule, SharedModule ],
	exports: [],
	declarations: [ CommunityLayoutComponent, UserCardComponent ],
	providers: [],
	bootstrap: [ CommunityLayoutComponent ],
})
export class CommunityModule {}
