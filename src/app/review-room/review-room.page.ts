import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-review-room',
  templateUrl: './review-room.page.html',
  styleUrls: ['./review-room.page.scss'],
  standalone:false
})
export class ReviewRoomPage implements OnInit {
  reviewText = '';
  rating = 0;
  selectedBookingId: any;
  apiUrl = environment.apiUrl + "reviews/create"

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastService: ToastService,

  ) { }

  ngOnInit() {
    // Redirect if not already logged in
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
    }

     this.selectedBookingId = this.route.snapshot.paramMap.get('id'); // Get ID from URL
     console.log(this.selectedBookingId);
  }

  async submitReview() {

    const token = localStorage.getItem('auth_token');

    if (!token) {
      console.error('No auth token found. User may not be logged in.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });  

    
    if (!this.reviewText.trim()) {
      this.toastService.presentErrorToast('Please enter a review.');
      return;
    }

  
    try {
     
      const response: any = await this.http.post(
        this.apiUrl,
        {
          booking_id: this.selectedBookingId,
          comment: this.reviewText,
          rating: this.rating
        },
        { headers }
      ).toPromise();
  
      if (response.success) {
        this.toastService.presentSuccessToast(response.message);
        this.router.navigate(['/booking']); // Redirect after success
      } else {
        this.toastService.presentErrorToast(response.message);
      }
    } catch (error) {
      console.error('Review submission failed:', error);
        this.toastService.presentErrorToast('An error occurred: ' + JSON.stringify(error));
    }

    

    
  }
  



  setRating(value: number) {
    this.rating = value;
  }
}
