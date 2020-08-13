import { ProfileHeroesComponent } from './components/profile-heroes/profile-heroes.component';
import { ProfileMainComponent } from './components/profile-main/profile-main.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: ProfileMainComponent },
      { path: 'characters', component: ProfileHeroesComponent },
      {
        path: 'messages',
        loadChildren: () =>
          import('../chat/chat.module').then((m) => m.ChatModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
