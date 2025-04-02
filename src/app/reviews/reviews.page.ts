import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
  standalone: false
})
export class ReviewsPage implements OnInit {

  roomId: number | null = null;  // Declare as number
  apiUrl = environment.apiUrl;
   // Initialize with default values to avoid undefined errors
  reviews: any = {
    id: null,
    name: '',
    average_rating: 0,
    total_reviews: 0,
    reviews: []
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    const idParam = this.route.snapshot.paramMap.get('id'); // Get ID from URL
    if (idParam) {
      this.roomId = parseInt(idParam, 10); 
    }

    console.log(this.roomId);
    

    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.fetchReviews();

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



  fetchReviews() {
    const token = localStorage.getItem('auth_token');
  
    if (!token) {
      console.error('No auth token found. User may not be logged in.');
      return;
    }
  
    const headers = { Authorization: `Bearer ${token}` };
    const url =this.apiUrl + `reviews/view?id=${this.roomId}`;

    this.http.get<any>(url, { headers }).subscribe(
      (response) => {
        if (response) {
         
          this.reviews = response; 

        } else {
          console.warn('No reviews found.');
          this.reviews = null;
        }
      },
      (error) => {
        console.error('Error fetching reviews details:', error);
      }
    );
  }


}
