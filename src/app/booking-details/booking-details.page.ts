import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
  standalone: false
})
export class BookingDetailsPage  {
  id: any;
  bookingDetails: any = {}; // Initialize as an empty object

  apiUrl =  "";
  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private alertController: AlertController,
    private location: Location
  ) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(params =>{
        this.id = params['id'];
    });

    this.apiUrl =environment.apiUrl;

    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    

  }


  ionViewWillEnter() {
    this.fetchBookingDetails();
  }
  fetchBookingDetails(){
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
  
    this.http.get<any>(this.apiUrl + `bookings/view?id=${this.id}`, { headers }).subscribe(
      (response) => {
        if (response) {
         
          this.bookingDetails = response; 
        
          
        } else {
         
          this.bookingDetails = null;
        }
      },
      (error) => {
        console.error('Error fetching room details:', error);
      }
    );
  }


  cancelBooking() {
    // Confirm before canceling
    this.alertController.create({
      header: 'Cancel Booking',
      message: 'Are you sure you want to cancel this booking?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes, Cancel',
          handler: () => {
            const token = localStorage.getItem('auth_token');
            if (!token) {
              this.router.navigate(['/login']);
              return;
            }

            const headers = { Authorization: `Bearer ${token}` };
          
            this.http.get<any>(this.apiUrl + `bookings/cancel?id=${this.id}`, { headers }).subscribe(
              (response) => {
                if (response.success) {
                
                  this.toastService.presentSuccessToast('Booking Successfully Cancelled.')
                  this.location.back();

                
                  
                } else {
                
                  this.toastService.presentErrorToast(response.message);

                }
              },
              (error) => {
                this.toastService.presentErrorToast('Error cancelling booking:' + error);
                console.error('Error cancelling booking:', error);
              }
            );
          }
        }
      ]
    }).then(alert => alert.present());
  }

}
