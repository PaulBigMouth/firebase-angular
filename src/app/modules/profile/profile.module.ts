import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { ProfileLayoutComponent } from './layouts/profile-layout/profile-layout.component';
import { ProfileMainComponent } from './components/profile-main/profile-main.component';
import { ProfileHeroesComponent } from './components/profile-heroes/profile-heroes.component';
import { ProfileChatComponent } from './components/profile-chat/profile-chat.component';

@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    ProfileLayoutComponent,
    ProfileMainComponent,
    ProfileHeroesComponent,
    ProfileChatComponent,
  ],
  providers: [],
  bootstrap: [ProfileLayoutComponent],
})
export class ProfileModule {}
