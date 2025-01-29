import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {RecipeService, Recipe} from '../../services/recipe.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ViewRecipeComponent implements OnInit {
  recipe: Recipe;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Recipe,
    private dialogRef: MatDialogRef<ViewRecipeComponent>
  ) {
    this.recipe = {...data};
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }


  formatList(text?: string): string[] {
    if (!text) return [];
    return text.split(/\d+\.\s?/g)
      .map(item => item.trim()) 
      .filter(item => item !== ""); 
  }
}