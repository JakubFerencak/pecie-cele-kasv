import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000'; // Adjust your backend address
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Store the login state

  constructor(private http: HttpClient) {
    // Try to get initial login state from localStorage (if you want persistence)
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState === 'true') {
      this.isLoggedInSubject.next(true);
    }
  }

  // Observable to watch login state
  getLoginStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  register(data: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      // Assuming backend sets the cookie, after login, mark as logged in
      tap(() => {
        this.isLoggedInSubject.next(true); // Update login status
        localStorage.setItem('isLoggedIn', 'true'); // Save login status
      })
    );
  }

  logout() {
    // Clear any authentication data
    this.isLoggedInSubject.next(false); // Set logged out state
    localStorage.removeItem('isLoggedIn'); // Clear the login status in localStorage
  }
}
