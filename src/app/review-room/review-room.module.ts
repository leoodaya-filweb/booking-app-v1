import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewRoomPageRoutingModule } from './review-room-routing.module';

import { ReviewRoomPage } from './review-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewRoomPageRoutingModule
  ],
  declarations: [ReviewRoomPage]
})
export class ReviewRoomPageModule {}
