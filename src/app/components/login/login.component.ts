import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';  // Import AuthService
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
  loading: boolean = false; // Loading state
  errorMessage: string = ''; // Error message state

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.loading = true; // Activate loading
    this.authService.login(this.auth).subscribe(
      (response) => {
        this.loading = false;
        console.log('Login successful', response);
        this.isLoggedIn = true; // Set login state to true
        this.router.navigate(['/']); // Redirect to home on successful login
      },
      (error) => {
        this.loading = false; // Deactivate loading
        this.errorMessage = 'Login failed. Please check your username and password.'; // Show error message
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
