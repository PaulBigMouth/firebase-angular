import { ProfileHeroesPage } from './pages/profile-heroes-page/profile-heroes.page';
import { ProfileMainPage } from './pages/profile-main-page/profile-main.page';
import { ProfilePage } from './pages/profile-page/profile.page';
import { ChatModule } from './../chat/chat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ChatModule,
  ],
  exports: [],
  declarations: [ProfilePage, ProfileMainPage, ProfileHeroesPage],
  providers: [],
  bootstrap: [ProfilePage],
})
export class ProfileModule {}
