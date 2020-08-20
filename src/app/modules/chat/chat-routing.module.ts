import { ChatWindowPage } from './pages/chat-window-page/chat-window.page';
import { ChatPage } from './pages/chat-page/chat.page';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ChatPage,
    children: [{ path: ':id', component: ChatWindowPage }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
