import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'rooms/:id',
    loadChildren: () => import('./rooms/rooms.module').then( m => m.RoomsPageModule)
  },
  {
    path: 'room-details/:id',
    loadChildren: () => import('./room-details/room-details.module').then( m => m.RoomDetailsPageModule)
  },
  {
    path: 'book-room/:id',
    loadChildren: () => import('./book-room/book-room.module').then( m => m.BookRoomPageModule)
  },
  {
    path: 'booking-details/:id',
    loadChildren: () => import('./booking-details/booking-details.module').then( m => m.BookingDetailsPageModule)
  },
  {
    path: 'review-room/:id',
    loadChildren: () => import('./review-room/review-room.module').then( m => m.ReviewRoomPageModule)
  },
  {
    path: 'reviews/:id',
    loadChildren: () => import('./reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
