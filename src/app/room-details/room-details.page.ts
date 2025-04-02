import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.page.html',
  styleUrls: ['./room-details.page.scss'],
  standalone: false
})
export class RoomDetailsPage implements OnInit {

  roomId: number | null = null;  // Declare as number
  room: any;
  apiUrl =  environment.apiUrl;
  checkinDate: string = new Date().toISOString(); // Set to today's date
  checkoutDate: string = new Date().toISOString(); // Set to today's date
  totalPrice: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private alertController: AlertController,
    private location: Location

  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id'); // Get ID from URL
    this.checkinDate = new Date().toISOString(); // Set to today's date
    this.checkoutDate = new Date().toISOString(); // Set to today's date
    if (idParam) {
      this.roomId = parseInt(idParam, 10); 
    }


    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    // Construct API URL safely
    this.fetchRoomDetails();
    this.calculateTotalPrice();
  }

  fetchRoomDetails() {
    const token = localStorage.getItem('auth_token');
  
    if (!token) {
      console.error('No auth token found. User may not be logged in.');
      return;
    }
  
    const headers = { Authorization: `Bearer ${token}` };
    const url =this.apiUrl + `rooms/view?id=${this.roomId}`;

    this.http.get<any>(url, { headers }).subscribe(
      (response) => {
        if (response) {
         
          this.room = response; 

        } else {
          console.warn('No room data found.');
          this.room = null;
        }
      },
      (error) => {
        console.error('Error fetching room details:', error);
      }
    );
  }

  calculateTotalPrice() {
    if (this.checkinDate && this.checkoutDate && this.room) {
      const checkin = new Date(this.checkinDate);
      const checkout = new Date(this.checkoutDate);

      const diffTime = checkout.getTime() - checkin.getTime();
      const nights = Math.ceil(diffTime / (1000 * 3600 * 24)); // Convert milliseconds to days

      this.totalPrice = nights * this.room.price;
    }
  }
  
  async bookRoom() {
    if (!this.room || !this.checkinDate || !this.checkoutDate) {
      this.toastService.presentErrorToast('Please select valid check-in and check-out dates.');
      return;
    }
  
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
  
    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 19).replace('T', ' '); // Convert to 'YYYY-MM-DD HH:MM:SS'
    };
  
    if (formatDate(this.checkoutDate) <= formatDate(this.checkinDate)) {
      this.toastService.presentWarningToast("Invalid checkout date. Please select a date after the check-in date.");
      return;
    }
    
    const bookingData = {
      room_id: this.room.id,
      checkin: formatDate(this.checkinDate),
      checkout: formatDate(this.checkoutDate),
      price: this.totalPrice,
    };
  
    const headers = { Authorization: `Bearer ${token}` };
  
    // **Show Confirmation Alert**
    const formatDateToLong = (dateString: string): string => {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      // hour: '2-digit',
      // minute: '2-digit',
      // hour12: true
      };
      return date.toLocaleString('en-US', options);
    };

    const alert = await this.alertController.create({
      header: 'Confirm Booking',
      message: `Are you sure you want to book ${this.room.name} from ${formatDateToLong(this.checkinDate)} to ${formatDateToLong(this.checkoutDate)}?`,
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        console.log('Booking canceled');
        }
      },
      {
        text: 'Confirm',
        handler: () => {

        this.http.post(this.apiUrl + 'bookings/create', bookingData, { headers })
          .subscribe(
          (response: any) => {
            console.log('Booking Response:', response);
            if (response.success) {
            this.toastService.presentSuccessToast(response.message);
            this.location.back();

            } else {
            this.toastService.presentErrorToast(response.message);
            }
          },
          (error) => {
            console.error('Error Booking Room:', error);
            this.toastService.presentErrorToast(error.error?.message || 'Booking failed. Please try again.');
          }
          );
        }
      }
      ]
    });
  
    await alert.present();
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
  
}
