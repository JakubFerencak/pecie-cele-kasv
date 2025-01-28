import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../services/auth.service';
import {RecipeService, Recipe} from '../../services/recipe.service';
import {EditRecipeDialogComponent} from '../edit-recipe-dialog/edit-recipe-dialog.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {ViewRecipeComponent} from '../view-recipe/view-recipe.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-landing',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButton,MatIconModule],
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
    this.authService.getCurrentUser().subscribe(user => {         //ziskavaa udaje o prihlasenom uzivatelovi
      if (user) {
        this.currentUser = user.username;
        this.isAdmin = user.is_admin;
      }
    });
    this.recipeService.recipes$.subscribe((recipes) => {           //sleduje zmeny v receptoch
      this.recipes = recipes;
      this.cd.detectChanges();
    });
    this.recipeService.fetchRecipes();
  }

  viewRecipe(recipe: Recipe): void {                 //zobrazi dialogove okno s receptom
    this.dialog.open(ViewRecipeComponent, {          //vytvori dialogove okno s receptom a odovzda mu data
      data: {...recipe}
    });
  }

  canEditOrDelete(recipe: Recipe): boolean {         // kontroluje ci uzivatel moze upravit alebo vymazat recept
    return this.isAdmin || recipe.author === this.currentUser;
  }

  deleteRecipe(recipeId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe((confirmed) => {  //
      if (confirmed) {
        const token = localStorage.getItem('token');
        this.recipeService.deleteRecipe(recipeId, token!).subscribe(() => {
          this.recipeService.fetchRecipes();
        });
      }
    });
  } 

  openEditDialog(recipe: Recipe): void {
    if (!this.canEditOrDelete(recipe)) {     // ak nema pravo upravit recept, tak zrusi akciu
      return;
    }
    const dialogRef = this.dialog.open(EditRecipeDialogComponent, {   //otvori okno pre upravu receptu
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

  private canDeleteAsAuthor(recipeId: number): boolean {    // overuje ci autor moze zmazat recept
    const recipe = this.recipes.find((r) => r.id === recipeId);     //najde recept podla id
    if (!recipe) {     //ak recept neexistuje, tak false
      return false;
    }
    return recipe.author === this.currentUser;     // povolenei zmazat recept len autori
  }
}
