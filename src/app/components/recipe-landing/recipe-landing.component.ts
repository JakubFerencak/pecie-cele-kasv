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
    // Načítame recepty prihláseného používateľa
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;  // Uložíme recepty do premennej
    });
  }

    // Pridajte metódu viewRecipe, ktorá sa zavolá pri kliknutí na tlačidlo
    viewRecipe(recipe: Recipe): void {
      // Tu môžete spracovať zobrazenie detailov receptu (napr. zobraziť ďalšie informácie v dialógovom okne alebo inej stránke)
      console.log('Zobraziť recept:', recipe);
}

}
