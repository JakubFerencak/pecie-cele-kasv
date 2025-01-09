import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recipe {
  title: string;
  description: string;
  // Add other fields as necessary
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'https://127.0.0.1:8000/recipes'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  // Fetch all recipes
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  // Add a new recipe
 
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>('http://127.0.0.1:8000/recipesadd', recipe); // Upravte URL podľa potreby
  }
  
}
