import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewRoomPage } from './review-room.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoomPageRoutingModule {}
