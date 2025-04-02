import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookRoomPageRoutingModule } from './book-room-routing.module';

import { BookRoomPage } from './book-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookRoomPageRoutingModule
  ],
  declarations: [BookRoomPage]
})
export class BookRoomPageModule {}
