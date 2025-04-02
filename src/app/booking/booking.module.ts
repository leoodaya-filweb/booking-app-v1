import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingPageRoutingModule } from './booking-routing.module';

import { BookingPage } from './booking.page';
import { HttpClientModule } from '@angular/common/http'; // ✅ Import this

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingPageRoutingModule,
    HttpClientModule
  ],
  declarations: [BookingPage]
})
export class BookingPageModule {}
