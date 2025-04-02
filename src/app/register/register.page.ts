import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  registerForm: FormGroup;
  apiUrl = environment.apiUrl + 'auth/register';
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } 
  }

  async register() {

    const {fullName ,email, password } = this.registerForm.value;

    if (this.registerForm.valid) {
      
      // console.log('Registration Successful', this.registerForm.value);
      try {


        const response: any = await this.http.post(this.apiUrl, {fullName, email, password}).toPromise();

        if(response.success){
          this.toastService.presentSuccessToast('Registration Successful');

          this.registerForm.reset();
          this.router.navigate(['/login']);

        }else{
          this.toastService.presentErrorToast(response.message);
        }
      } catch (error) {

        this.toastService.presentErrorToast('An error occurred: ' + JSON.stringify(error));
        
      }
    }
    else{
      this.toastService.presentErrorToast('Please fill out the form correctly.');
    }
  }
}
