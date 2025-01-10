import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000';
  private loginStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current_user`, { withCredentials: true });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }, { withCredentials: true });
  }

  logout(): void {
    // Implement logout logic here
    this.loginStatus.next(false);
  }
}