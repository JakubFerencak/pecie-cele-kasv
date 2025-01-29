import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register', 
  standalone: true, 
  imports: [
   
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.css'], 
})
export class RegisterComponent {
  hide = true; 
  errorMessage: string | null = ''; 
  successMessage: string | null = ''; 
  auth = {
  
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };


  constructor(private authService: AuthService, private router: Router) {}

  
  register(form: NgForm) {
    const { username, email, password, confirmPassword } = this.auth; 

    
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.'; 
      this.successMessage = null; 
      return; 
    }

    const payload = { username, email, password }; 

    console.log('Sending to backend:', payload); 

    
    this.authService.register({ username, email, password }).subscribe(
      response => {
        
        console.log('Registration successful:', response); 
        this.successMessage = 'Registration successful!'; 
        this.router.navigate(['/login']); 
        this.errorMessage = null; 
      },
      error => {
       
        console.error('Registration failed:', error); 
        if (error.status === 409) {
          this.errorMessage = 'Conflict';
        } else {
          this.errorMessage = 'Username is already taken.';
        }
  
        this.successMessage = null;
      }
    );
  }
}
