import { TokenInterceptor } from './classes/token.interceptor';
import { AuthService } from './shared/services/auth.service';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from '@angular/fire';
import { environment } from './../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { HomeModule } from './modules/home/home.module';
import { ToastComponent } from './shared/components/toast/toast.component';
import { EmailVerifiedComponent } from './shared/components/email-verified/email-verified.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

@NgModule({
	declarations: [ AppComponent, ToastComponent, EmailVerifiedComponent, NotFoundComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AuthorizationModule,
		AngularFireModule.initializeApp(environment.firebase),
		HomeModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({
			maxAge: 5,
		}),
	],
	providers: [ AuthService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true } ],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
