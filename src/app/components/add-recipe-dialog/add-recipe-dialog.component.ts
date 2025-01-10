import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.css'],
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AddRecipeDialogComponent implements OnInit {
  recipe = { title: '', description: '', author: '' };

  constructor(
    private dialogRef: MatDialogRef<AddRecipeDialogComponent>,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveRecipe(): void {
    this.recipeService.addRecipe(this.recipe).subscribe(response => {
      console.log('Recipe saved successfully', response);
      this.dialogRef.close();
    }, error => {
      console.error('Error saving recipe', error);
    });
  }
}