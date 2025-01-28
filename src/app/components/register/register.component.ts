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

// Dekorátor @Component definuje komponentu Angularu, vrátane selektora, šablóny a štýlov
@Component({
  selector: 'app-register', // Názov selektora, ktorý reprezentuje túto komponentu v HTML
  standalone: true, // Komponenta je samostatná (nemusí byť súčasťou modulu)
  imports: [
    // Importy potrebných modulov z Angular Material a Angularu
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html', // Cesta k HTML šablóne tejto komponenty
  styleUrls: ['./register.component.css'], // Cesta k CSS súboru s štýlmi pre túto komponentu
})
export class RegisterComponent {
  hide = true; // Premenná na prepínanie zobrazenia/skrývania hesla
  errorMessage: string | null = ''; // Premenná na uloženie chybovej správy
  successMessage: string | null = ''; // Premenná na uloženie správy o úspechu
  auth = {
    // Objekt na uchovanie údajov registračného formulára
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Konštruktor na inicializáciu AuthService a Router, ktoré sú injektované pomocou Dependency Injection
  constructor(private authService: AuthService, private router: Router) {}

  // Funkcia register() sa vykoná pri odoslaní registračného formulára
  register(form: NgForm) {
    const { username, email, password, confirmPassword } = this.auth; // Destrukturalizácia údajov z auth objektu

    // Kontrola, či sa heslá zhodujú
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.'; // Nastavenie chybovej správy
      this.successMessage = null; // Vynulovanie správy o úspechu
      return; // Ukončenie funkcie, ak heslá nesúhlasia
    }

    const payload = { username, email, password }; // Vytvorenie objektu s údajmi na odoslanie na backend

    console.log('Sending to backend:', payload); // Debugging - výpis údajov do konzoly

    // Zavolanie služby AuthService na odoslanie registračných údajov na backend
    this.authService.register({ username, email, password }).subscribe(
      response => {
        // Ak registrácia prebehne úspešne
        console.log('Registration successful:', response); // Debugging - výpis úspešnej odpovede
        this.successMessage = 'Registration successful!'; // Nastavenie správy o úspechu
        this.router.navigate(['/login']); // Presmerovanie užívateľa na stránku prihlásenia
        this.errorMessage = null; // Vynulovanie chybovej správy
      },
      error => {
       
        console.error('Registration failed:', error); 
        if (error.status === 409) { // Ak server vráti HTTP 409 - Conflict
          this.errorMessage = 'Username is already taken.';
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
  
        this.successMessage = null;
      }
    );
  }
}
