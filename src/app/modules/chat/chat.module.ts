import { ChatWindowPage } from './pages/chat-window-page/chat-window.page';
import { ChatPage } from './pages/chat-page/chat.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    ChatRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [ChatPage, ChatWindowPage],
  providers: [],
  bootstrap: [ChatPage],
})
export class ChatModule {}
