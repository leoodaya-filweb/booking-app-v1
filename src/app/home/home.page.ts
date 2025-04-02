import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  user = 'John Doe'; // You can fetch this dynamically
  activeBookings: any[] = [];
  topRooms: any[] = [];
  searchQuery: string = '';

  apiUrl = environment.apiUrl +'bookings/index'; // Replace with your actual API URL

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastServive: ToastService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Redirect if not already logged in
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    // this.fetchActiveBookings();

 
  }

  ionViewWillEnter() {
    // Runs every time the page is viewed
    this.fetchActiveBookings();
  }


  // ionViewDidEnter() {
  //   this.fetchActiveBookings();
  // }


  searchRooms() {
    if (this.searchQuery.trim()) {
      this.navCtrl.navigateForward(['/rooms/0'], {
        queryParams: { search: this.searchQuery }
      });
    }
  }

  openCategory(category: string) {
    console.log('Opening category:', category);
    this.navCtrl.navigateForward(`/rooms/${0}/${category}`);

  }

  viewRoom(room: any) {
    this.router.navigate([`/room-details/${room.id}`]);
  }

  viewBooking(booking: any) {
    console.log('Viewing Booking:', booking.id);
    this.router.navigate([`/booking-details/${booking.id}`]);
  }



  goToProfile() {

    this.router.navigate(['/profile']);
  }

  fetchActiveBookings() {
    const token = localStorage.getItem('auth_token'); // Retrieve token
  
    if (!token) {
      console.error('No auth token found. User may not be logged in.');
      return;
    }
  
    const headers = { Authorization: `Bearer ${token}` }; // Add Authorization header
  
    this.http.get<any>(this.apiUrl, { headers }).subscribe(
      (response) => {
        if (response.active_bookings) {
          this.activeBookings = response.active_bookings;
          this.topRooms = response.topRooms; 
          this.user = response.user_name;
        } else {
          this.activeBookings = []; 
          
        }
      },
      (error) => {
        console.error('API Error:', error);
  
        if (error.status === 401) {
          this.toastServive.presentErrorToast('Session expired. Please log in again.');
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          this.toastServive.presentErrorToast('You do not have permission to view this room.');
        } else if (error.status === 404) {
          this.toastServive.presentErrorToast('Room not found.');
        } else {
          this.toastServive.presentErrorToast('Something went wrong. Please try again later.');
        }
      }
    );
  }
  
  

  getStarsArray(rating: number): string[] {
    let stars: string[] = [];
    let fullStars = Math.floor(rating); // Full stars
    let halfStar = rating % 1 !== 0; // Check for half star
    let emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars
  
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push("star");
    }
  
    // Add half star if applicable
    if (halfStar) {
      stars.push("star-half-outline");
    }
  
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push("star-outline");
    }
  
    return stars;
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      this.fetchActiveBookings();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }
}
