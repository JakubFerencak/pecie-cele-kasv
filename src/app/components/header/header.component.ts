import {Component, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddRecipeDialogComponent } from '../add-recipe-dialog/add-recipe-dialog.component';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, 
    MatToolbarModule, 
    MatButtonModule, 
    RouterModule, 
    NgIf,
    MatDialogModule,
    ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;  // Pridajte premennú pre používateľské meno

  constructor(
    private dialog: MatDialog, 
    private recipeService: RecipeService, 
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Subscribe to the login status to get updates on changes
    this.authService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;  // Update the UI whenever login state changes
    });

    // Získajte aktuálneho používateľa, ak je prihlásený
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.username = user.username;  // Nastavte username po získaní údajov
      }
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;  // Set the local state to false on logout
    this.username = null;  // Reset username on logout
  }

  openAddRecipeDialog() {
    const dialogRef = this.dialog.open(AddRecipeDialogComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Pridajte meno prihláseného používateľa ako autora, ak je používateľ prihlásený
        if (this.username) {
          result.author = this.username;
        }
  
        // Pošlite recept do služby
        this.recipeService.addRecipe(result).subscribe(
          (response) => console.log('Recept bol úspešne pridaný!', response),
          (error) => console.error('Chyba pri pridávaní receptu', error)
        );
      }
    });
  }
}
