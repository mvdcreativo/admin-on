import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { LayoutModule } from "./layout/layout.module";

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { indexAuthInterceptor } from './auth/helpers/index-auth.interceptor';
import { registerLocaleData } from '@angular/common';
import localeEsUy from '@angular/common/locales/es-UY';

registerLocaleData(localeEsUy, 'es-Uy');


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    
  ],
  providers: [
    indexAuthInterceptor,
    {provide: MAT_DATE_LOCALE, useValue: 'es-UY'},
    {provide: LOCALE_ID, useValue: 'es-UY'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
