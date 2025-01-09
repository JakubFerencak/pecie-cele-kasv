import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  auth = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private http: HttpClient) {}

  // Funkcia na registráciu
  register() {
    // Kontrola zhodnosti hesiel
    if (this.auth.password === this.auth.confirmPassword) {
      // Posielame údaje na backend cez POST požiadavku na správnu adresu
      this.http.post('http://127.0.0.1:8000/register', this.auth)
        .subscribe(response => {
          console.log('Registrácia úspešná', response);
          // Tu môžeš pridať akciu po úspešnej registrácii, napríklad presmerovanie
        }, error => {
          console.error('Chyba pri registrácii', error);
        });
    } else {
      console.log('Heslá sa nezhodujú');
    }
  }
}
