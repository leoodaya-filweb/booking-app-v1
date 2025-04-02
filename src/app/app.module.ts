import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';  // Import Ionic Storage
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment-timezone';
import { ReactiveFormsModule } from '@angular/forms';

moment.tz.setDefault('Asia/Manila');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,  
    FormsModule,
    IonicStorageModule.forRoot() 
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
