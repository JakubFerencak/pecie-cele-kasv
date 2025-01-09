import {Component, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to the login status to get updates on changes
    this.authService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;  // Update the UI whenever login state changes
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;  // Set the local state to false on logout
  }
}
