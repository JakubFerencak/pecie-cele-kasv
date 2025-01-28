import {Component, OnInit} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Recipe, RecipeService} from '../../services/recipe.service';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.css'],
  imports: [CommonModule, MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, TextFieldModule]
})
export class AddRecipeDialogComponent implements OnInit {
  recipe: Recipe = {
    id: 0, 
    title: '', 
    description: '', 
    author: '',
    image: '', 
    procedure: '',
    ingredients: ''};

    errorMessage = '';

  constructor(
    private dialogRef: MatDialogRef<AddRecipeDialogComponent>,
    private recipeService: RecipeService
  ) {
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  validateTitle():boolean{
    const maxLength = 50;
    if(this.recipe.title.length > maxLength){
      this.errorMessage = `Title must be less than ${maxLength} characters`;
      return false;
    }
    this.errorMessage = '';
    return true;  
  }

  saveRecipe(f: NgForm): void {
    const currentUser = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (currentUser) {
      this.recipe.author = currentUser;
    }

    if (!token) {
      console.error('No token found. User not authenticated.');
      return;
    }

    this.recipeService.addRecipe(this.recipe, token).subscribe(
      response => {
        console.log('Recipe saved successfully', response);
        this.recipeService.fetchRecipes();
        this.dialogRef.close();
      },
      error => {
        console.error('Error saving recipe', error);
      }
    );
  }
}
