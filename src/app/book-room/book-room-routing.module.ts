import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookRoomPage } from './book-room.page';

const routes: Routes = [
  {
    path: '',
    component: BookRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoomPageRoutingModule {}
