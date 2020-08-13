import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommunityPageComponent } from './pages/community-page/community-page.component';

const routes: Routes = [{ path: '', component: CommunityPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityRoutingModule {}
