import { NgModule } from '@angular/core';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityLayoutComponent } from './layouts/community-layout/community-layout.component';

@NgModule({
	imports: [ CommunityRoutingModule ],
	exports: [],
	declarations: [ CommunityLayoutComponent ],
	providers: [],
	bootstrap: [ CommunityLayoutComponent ],
})
export class CommunityModule {}
