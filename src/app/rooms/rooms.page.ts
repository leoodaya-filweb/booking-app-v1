import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
  standalone: false
})
export class RoomsPage implements OnInit {
  rooms: any[] = []; // All rooms from API
  filteredRooms: any[] = []; // Filtered rooms for search
  apiUrl = environment.apiUrl + 'rooms/index';
  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastServive: ToastService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        console.log('Room ID: ', params['id']);
        console.log('Category: ', params['category']);
    });

        
  }

 
  ionViewWillEnter() {
    this.fetchRooms();
  }

  viewRoom(room: any) {
    this.router.navigate([`/room-details/${room.id}`]);
  }

  getStarsArray(rating: number): string[] {
    let stars: string[] = [];
    let fullStars = Math.floor(rating);
    let halfStar = rating % 1 !== 0;
    let emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push("star");
    }

    if (halfStar) {
      stars.push("star-half-outline");
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push("star-outline");
    }

    return stars;
  }

  fetchRooms() {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      console.error('No auth token found. User may not be logged in.');
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any>(this.apiUrl, { headers }).subscribe(
      (response) => {
        if (response) {
          this.rooms = response.rooms;
          this.filteredRooms = [...this.rooms]; // Initialize filtered list
          console.log(response);
        } else {
          this.rooms = [];
          this.filteredRooms = [];
          console.log(response);
        }
      },
      (error) => {
        console.error('API Error:', error);
        this.handleApiError(error);
      }
    );
  }

  handleApiError(error: any) {
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

  filterRooms(event: any) {
    const searchTerm = event.target.value?.toLowerCase() || '';

    if (!searchTerm) {
      this.filteredRooms = [...this.rooms]; // Reset if empty
      return;
    }

    this.filteredRooms = this.rooms.filter(room =>
      room.name.toLowerCase().includes(searchTerm)
      
    );
  }
}
