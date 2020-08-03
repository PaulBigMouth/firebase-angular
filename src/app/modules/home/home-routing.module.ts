import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'heroes',
        loadChildren: () =>
          import('../heroes/heroes.module').then((m) => m.HeroesModule),
      },
      {
        path: 'community',
        loadChildren: () =>
          import('../community/community.module').then(
            (m) => m.CommunityModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      { path: '', redirectTo: '/heroes', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
