import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  author: string;
  image?: string;
  procedure?: string;
  ingredients?: string;
}

@Injectable({providedIn: 'root'})
export class RecipeService {
  private apiUrl = 'http://127.0.0.1:8000/recipes';
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  recipes$ = this.recipesSubject.asObservable();
  errorMessage = '';

  constructor(private http: HttpClient) {
  }

  fetchRecipes(): void {
    this.http.get<Recipe[]>(this.apiUrl).pipe(
      tap(recipes => this.recipesSubject.next(recipes)),
      catchError(err => this.handleError(err))
    ).subscribe();
  }

  getRecipes(): Observable<Recipe[]> {
    return this.recipes$;
  }

  addRecipe(recipe: Recipe, token: string): Observable<Recipe> {
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.post<Recipe>(this.apiUrl, recipe, {headers}).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateRecipe(id: number, updatedRecipe: Recipe, token: string): Observable<Recipe> {
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, updatedRecipe, {headers}).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteRecipe(recipeId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.delete(`${this.apiUrl}/${recipeId}`, {headers}).pipe(
      catchError(err => this.handleError(err))
    );
  }

  handleError(error: HttpErrorResponse) {
    let msg = 'Unexpected error.';
    if (error.status === 401) msg = 'You are not logged in.';
    else if (error.status === 403) msg = 'Insufficient permissions.';
    else if (error.status === 404) msg = 'Not found.';
    else if (error.status === 500) msg = 'Internal server error .';
    this.errorMessage = msg;
    return throwError(() => msg);
  }
}
