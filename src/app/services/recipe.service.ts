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
  private apiUrl = 'https://your-api-endpoint.com/recipes'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }
}
