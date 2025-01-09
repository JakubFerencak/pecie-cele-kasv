import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-recipe-landing',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './recipe-landing.component.html',
  styleUrls: ['./recipe-landing.component.css']
})
export class RecipeLandingComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(
      (data) => this.recipes = data,
      (error) => console.error(error)
    );
  }
}
