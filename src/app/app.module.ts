import { CommunityEffects } from './shared/effects/community.effects';
import { ProfileEffects } from './shared/effects/profile.effects';
import { AuthEffects } from './shared/effects/auth.effects';
import { HeroesEffects } from './shared/effects/heroes.effects';
import { SharedModule } from './shared/shared.module';
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
import { heroesReducer } from './shared/reducers/heroes.reducers';
import { authReducer } from './shared/reducers/auth.reducers';
import { profileReducer } from './shared/reducers/profile.reducers';
import { communityReducer } from "./shared/reducers/community.reducers"

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AuthorizationModule,
		AngularFireModule.initializeApp(environment.firebase),
		HomeModule,
		StoreModule.forRoot({heroes: heroesReducer, auth: authReducer, profile: profileReducer, community: communityReducer}),
		EffectsModule.forRoot([HeroesEffects, AuthEffects, ProfileEffects, CommunityEffects]),
		StoreDevtoolsModule.instrument({
			maxAge: 5,
		}),
		SharedModule

	],
	providers: [ { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true } ],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
