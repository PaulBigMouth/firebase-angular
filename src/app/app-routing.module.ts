import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard"


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
 
const routes: Routes = [
  {path: 'login', loadChildren: () => import('./modules/authorization/authorization.module').then(m => m.AuthorizationModule)},
  {path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
