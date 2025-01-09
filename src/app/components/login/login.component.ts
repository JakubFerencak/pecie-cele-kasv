import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';  // Import HttpClient
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatIconModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  auth = {
    username: '',
    password: ''
  };
  hide = true;
  isLoggedIn = false;  // Track login state

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginData = {
      username: this.auth.username,
      password: this.auth.password
    };

    this.authService.login(loginData).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.isLoggedIn = true;  // Set login state to true
        // Store user data or session cookie here if needed
        this.router.navigate(['/']);  // Redirect to home on successful login
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  logout() {
    this.isLoggedIn = false;  // Set login state to false
    // Clear session or cookies here if needed
    console.log('User logged out');
  }
}
