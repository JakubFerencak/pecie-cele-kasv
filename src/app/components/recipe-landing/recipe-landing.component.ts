import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../services/auth.service';
import {RecipeService, Recipe} from '../../services/recipe.service';
import {EditRecipeDialogComponent} from '../edit-recipe-dialog/edit-recipe-dialog.component';
import {MatButton} from '@angular/material/button';
import {ViewRecipeComponent} from '../view-recipe/view-recipe.component';

@Component({
  selector: 'app-recipe-landing',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButton],
  templateUrl: './recipe-landing.component.html',
  styleUrls: ['./recipe-landing.component.css']
})
export class RecipeLandingComponent implements OnInit {
  recipes: Recipe[] = [];
  currentUser: string | null = null;
  isAdmin: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUser = user.username;
        this.isAdmin = user.is_admin;
      }
    });
    this.recipeService.recipes$.subscribe((recipes) => {
      this.recipes = recipes;
      this.cd.detectChanges();
    });
    this.recipeService.fetchRecipes();
  }

  viewRecipe(recipe: Recipe): void {
    this.dialog.open(ViewRecipeComponent, {
      data: {...recipe}
    });
  }

  canEditOrDelete(recipe: Recipe): boolean {
    return this.isAdmin || recipe.author === this.currentUser;
  }

  deleteRecipe(recipeId: number): void {
    if (!this.isAdmin && !this.canDeleteAsAuthor(recipeId)) {
      return;
    }
    const token = localStorage.getItem('token');
    this.recipeService.deleteRecipe(recipeId, token!).subscribe(() => {
      this.recipeService.fetchRecipes();
    });
  }

  openEditDialog(recipe: Recipe): void {
    if (!this.canEditOrDelete(recipe)) {
      return;
    }
    const dialogRef = this.dialog.open(EditRecipeDialogComponent, {
      data: {...recipe}
    });
    dialogRef.afterClosed().subscribe((updatedRecipe: Recipe | undefined) => {
      if (updatedRecipe) {
        const token = localStorage.getItem('token');
        this.recipeService.updateRecipe(recipe.id, updatedRecipe, token!).subscribe(() => {
          this.recipeService.fetchRecipes();
        });
      }
    });
  }

  private canDeleteAsAuthor(recipeId: number): boolean {
    const recipe = this.recipes.find((r) => r.id === recipeId);
    if (!recipe) {
      return false;
    }
    return recipe.author === this.currentUser;
  }
}
