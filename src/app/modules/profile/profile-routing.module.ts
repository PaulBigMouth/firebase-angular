import { ProfileMainPage } from './pages/profile-main-page/profile-main.page';
import { ProfileHeroesPage } from './pages/profile-heroes-page/profile-heroes.page';
import { ProfilePage } from './pages/profile-page/profile.page';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: ProfileMainPage },
      { path: 'characters', component: ProfileHeroesPage },
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
