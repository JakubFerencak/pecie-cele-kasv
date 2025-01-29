import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AddRecipeDialogComponent} from '../add-recipe-dialog/add-recipe-dialog.component';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
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
  username: string | null = null;

  constructor(
    private dialog: MatDialog,
    private recipeService: RecipeService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.authService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });

    this.authService.getCurrentUser().subscribe(user => {
      this.username = user ? user.username : null;
      this.cdr.detectChanges();
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.username = null;
  }

  openAddRecipeDialog() {
    const dialogRef = this.dialog.open(AddRecipeDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const token = localStorage.getItem('access_token'); // Retrieve token
        if (this.username && token) {
          result.author = this.username;
          this.recipeService.addRecipe(result, token).subscribe(
            () => {
              console.log('Recipe added successfully!');
              this.recipeService.fetchRecipes();
            },
            (error) => console.error('Error adding recipe', error)
          );
        } else {
          console.error('User is not logged in or token not found');
        }
      }
    });
  }
}
