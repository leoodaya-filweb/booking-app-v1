import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: false,
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  apiUrl =  environment.apiUrl + 'user/index';
  constructor(
    private router: Router,
    private http: HttpClient, 
    private toastService: ToastService
  ) { }

  ngOnInit() {

    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.fetchUser();
  }

  logout() {
    localStorage.clear(); // or removeItem('auth_token')
    this.router.navigate(['/login']);
  }
  

  fetchUser() {
    const token = localStorage.getItem('auth_token');
  
    if (!token) {
      console.error('No auth token found. User may not be logged in.');
      return;
    }
  
    const headers = { Authorization: `Bearer ${token}` };
    const url = `${this.apiUrl}`; // Construct full API URL
  
    this.http.get<any>(url, { headers }).subscribe(
      (response) => {
        if (response) {
          this.user = response;
          // this.toastService.presentSuccessToast('User Information successfully loaded.');

        } else {
          this.toastService.presentErrorToast(response.message);
          this.user = null;
        }
      },
      (error) => {
        this.toastService.presentErrorToast('Error fetching user details:'+ error);
      }
    );
  }

}
