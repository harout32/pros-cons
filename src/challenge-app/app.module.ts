import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { LoginPageComponent, ProConPageComponent } from '@pages';
import { LoginComponent, ProConListComponent } from '@components';
import { ProsConsRequestService, AuthorizeRequestService } from '@services/api';
import { AuthService, ProConService } from '@services';
import { ProConResolveService } from '@services/resolvers';
registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginComponent,
    ProConPageComponent,
    ProConListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    ProsConsRequestService,
    AuthorizeRequestService,
    AuthService,
    ProConService,
    ProConResolveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 