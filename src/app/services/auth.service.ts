import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable, BehaviorSubject, throwError, of} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000';
  private loginStatus = new BehaviorSubject<boolean>(false);
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  register(user: { username: string; email: string; password: string }): Observable<any> {
    const body = {
      username: user.username,
      email: user.email,
      password: user.password
    };
    return this.http.post(`${this.apiUrl}/register`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        let msg = 'Registration failed.';
        if (error.status === 400) msg = 'User already registered.';
        else if (error.status === 500) msg = 'Server error.';
        return throwError(() => msg);
      })
    );
  }


  login(username: string, password: string): Observable<any> {
    const body = new HttpParams().set('username', username).set('password', password);
    return this.http.post<any>(`${this.apiUrl}/token`, body.toString(), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('is_admin', response.is_admin ? 'true' : 'false');
        localStorage.setItem('username', response.username);
        this.loginStatus.next(true);
      }),
      catchError(err => this.handleError(err))
    );
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.loginStatus.next(false);
      return of(null);
    }
    return this.http.get<any>(`${this.apiUrl}/current_user`, {
      headers: {Authorization: `Bearer ${token}`}
    }).pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('is_admin', user.is_admin ? 'true' : 'false');
          localStorage.setItem('username', user.username);
          this.loginStatus.next(true);
        }
      }),
      catchError(err => this.handleError(err))
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('is_admin');
    this.loginStatus.next(false);
    this.router.navigate(['/login']);
  }

  handleError(error: HttpErrorResponse) {
    let msg = 'Unexpected error.';
    if (error.status === 401) msg = 'Incorrect username or password.';
    else if (error.status === 403) msg = 'Insufficient permissions.';
    else if (error.status === 404) msg = 'Not found.';
    else if (error.status === 500) msg = 'Internal server error .';
    this.errorMessage = msg;
    return throwError(() => msg);
  }
}
