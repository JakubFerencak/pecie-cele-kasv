import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component'; // Ensure the path is correct
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterModule], // Include RouterModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
