import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogActions} from '@angular/material/dialog';
import {Recipe} from '../../services/recipe.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {TextFieldModule} from '@angular/cdk/text-field';

@Component({
  selector: 'app-edit-recipe-dialog',
  templateUrl: './edit-recipe-dialog.component.html',
  styleUrls: ['./edit-recipe-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    TextFieldModule
  ],
})
export class EditRecipeDialogComponent implements OnInit {
  recipe: Recipe = {
    id: 0,
    title: '',
    description: '',
    image: '',
    author: ''
  };


  titleErrorMessage = '';
  descriptionErrorMessage = '';

  constructor(
    private dialogRef: MatDialogRef<EditRecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipe
  ) {
    if (data) {
      this.recipe = {...data};
    }
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveRecipe(): void {
    this.dialogRef.close(this.recipe);
  


  if (this.titleErrorMessage || this.descriptionErrorMessage) {
    console.error('Form contains errors:', this.titleErrorMessage, this.descriptionErrorMessage);
    return;
  }
 }

 validateTitle(): void {
  const maxLength = 20;
  if (this.recipe.title.length > maxLength) {
    this.titleErrorMessage = `Title must be less than ${maxLength} characters`;
  } else {
    this.titleErrorMessage = '';
  }
}

validateDescription(): void {
  const maxLength = 50; 
  if (this.recipe.description.length > maxLength) {
    this.descriptionErrorMessage = `Description must be less than ${maxLength} characters`;
  } else {
    this.descriptionErrorMessage = '';
  }
}

}
