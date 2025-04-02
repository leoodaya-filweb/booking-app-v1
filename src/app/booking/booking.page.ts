import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { ActionSheetController, NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: false
})
export class BookingPage {

  activeBookings: any[] = [];
  pastBookings: any[] = [];

  apiUrl = environment.apiUrl+'bookings/index'; // Replace with your actual API URL

  isModalOpen = false;
  reviewText = '';
  rating = 5;
  selectedBookingId: number | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastServive: ToastService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    // Redirect if not already logged in
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
    }
 
  }

  ionViewWillEnter() {
    // Runs every time the page is viewed
    this.fetchActiveBookings();
  }

  viewBooking(booking: any) {
    console.log('Viewing Booking:', booking.id);
    this.router.navigate([`/booking-details/${booking.id}`]);
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
          this.pastBookings = response.past_bookings;
        } else {
          this.activeBookings = []; 
          this.pastBookings = []; 
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


 openModal(bookingId: number) {
    this.selectedBookingId = bookingId;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedBookingId = null;
  }

  submitReview() {
    console.log('Review Submitted:', {
      bookingId: this.selectedBookingId,
      reviewText: this.reviewText,
      rating: this.rating
    });

    // You can add API submission logic here

    this.closeModal(); // Close modal after submission
  }
}
