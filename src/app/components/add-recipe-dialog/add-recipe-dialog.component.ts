import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.css'],
  imports: [MatDialogModule, FormsModule,MatFormField,MatLabel]
})
export class AddRecipeDialogComponent implements OnInit {
  recipe = { title: '', description: '', author: '' };

  constructor(
    private dialogRef: MatDialogRef<AddRecipeDialogComponent>,
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    // Získaj aktuálneho používateľa pri otvorení dialógu
    this.authService.getCurrentUser().subscribe(user => {
      this.recipe.author = user.username; // Nastav autora ako meno prihláseného používateľa
    });
  }

  saveRecipe() {
    this.dialogRef.close(this.recipe); // Odoslať údaje do hlavného komponentu
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
