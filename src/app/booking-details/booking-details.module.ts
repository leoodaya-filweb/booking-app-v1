import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingDetailsPageRoutingModule } from './booking-details-routing.module';

import { BookingDetailsPage } from './booking-details.page';
import { HttpClientModule } from '@angular/common/http'; // ✅ Import this

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingDetailsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [BookingDetailsPage]
})
export class BookingDetailsPageModule {}
