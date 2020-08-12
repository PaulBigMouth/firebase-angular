import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { NgModule } from '@angular/core';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';

@NgModule({
  imports: [
    ChatRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [ChatComponent, ChatWindowComponent],
  providers: [],
  bootstrap: [ChatComponent],
})
export class ChatModule {}
