import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomDetailsPageRoutingModule } from './room-details-routing.module';

import { RoomDetailsPage } from './room-details.page';
import { HttpClientModule } from '@angular/common/http'; // ✅ Import this

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomDetailsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RoomDetailsPage]
})
export class RoomDetailsPageModule {}
