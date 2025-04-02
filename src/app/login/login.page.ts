import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, HttpClientModule], 
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  apiUrl: string = environment.apiUrl+'auth/login'; // Replace with your Yii API endpoint

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // Redirect if already logged in
    // const token = localStorage.getItem('auth_token');
    // if (token) {
    //   this.router.navigate(['/home']);
    // }

    // Initialize form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Handle form submission
  async onSubmit() {
    if (this.loginForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      const response: any = await this.http.post(this.apiUrl, { email, password }).toPromise();

      if (response.success) {
        
        this.toastService.presentSuccessToast(response.message);
        localStorage.setItem('auth_token', response.access_token);
        this.router.navigate(['/home']);
      } else {
        this.toastService.presentErrorToast(response.message)
      }
    } catch (error) {
        console.error('Login failed', JSON.stringify(error)); 
        this.toastService.presentErrorToast('An error occurred: ' + JSON.stringify(error));
    }
  
  }

  // Navigate to registration page
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
