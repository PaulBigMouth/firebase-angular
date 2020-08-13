import { ChatModule } from './../chat/chat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileMainComponent } from './components/profile-main/profile-main.component';
import { ProfileHeroesComponent } from './components/profile-heroes/profile-heroes.component';

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
  declarations: [
    ProfilePageComponent,
    ProfileMainComponent,
    ProfileHeroesComponent,
  ],
  providers: [],
  bootstrap: [ProfilePageComponent],
})
export class ProfileModule {}
