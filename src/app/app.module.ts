import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeApiService } from './core/_base/server/fake-api/fake-api.service';
import { AuthService } from './core/auth';
import { HttpUtilsService } from './core/_base/crud/utils/http-utils.service';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    environment.isMockEnabled ? HttpClientInMemoryWebApiModule.forRoot(FakeApiService, {
      passThruUnknownUrl: true,
      dataEncapsulation: false
    }) : [],
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([]),
    AuthModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [
    AuthService,
    HttpUtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
