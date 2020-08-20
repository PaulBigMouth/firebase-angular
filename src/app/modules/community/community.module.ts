import { CommunityPage } from './pages/community-page/community.page';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommunityRoutingModule } from './community-routing.module';
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
  imports: [CommunityRoutingModule, CommonModule, SharedModule],
  exports: [],
  declarations: [CommunityPage, UserCardComponent],
  providers: [],
  bootstrap: [CommunityPage],
})
export class CommunityModule {}
