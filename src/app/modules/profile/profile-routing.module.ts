import { ProfileChatComponent } from './components/profile-chat/profile-chat.component';
import { ProfileHeroesComponent } from './components/profile-heroes/profile-heroes.component';
import { ProfileMainComponent } from './components/profile-main/profile-main.component';
import { ProfileLayoutComponent } from './layouts/profile-layout/profile-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ProfileLayoutComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: ProfileMainComponent },
      { path: 'characters', component: ProfileHeroesComponent },
      { path: 'messages', component: ProfileChatComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
