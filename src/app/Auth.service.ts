import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token?: string;  // JWT Token
  message?: string;
  isPremium?: boolean;  // User's premium status
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3080/api'; // Your backend API URL
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isPremiumSubject = new BehaviorSubject<boolean>(false);  // Track if user is premium
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  
  // Expose isPremium as an observable to allow external access
  public isPremium = this.isPremiumSubject.asObservable(); 

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    // Check authentication status (whether the JWT token exists or not)
    const token = localStorage.getItem('token');
    this.isAuthenticatedSubject.next(!!token);
    if (token) {
      this.refreshUserStatus();
    }
  }

  register(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password }, { withCredentials: true }).pipe(
      tap((response) => {
        // Store the JWT token and user information on successful login
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true);
        }
        if (response.isPremium !== undefined) {
          this.isPremiumSubject.next(response.isPremium);
        }
      })
    );
  }

  logout(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.isAuthenticatedSubject.next(false);
        this.isPremiumSubject.next(false);  // Reset premium status on logout
      })
    );
  }

  refresh(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/refresh`, { withCredentials: true });
    // This should send a new access token if the refresh token is valid
  }

  refreshUserStatus() {
    // Fetch user info to check premium status (if available in your backend)
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get<AuthResponse>(`${this.apiUrl}/user`, { headers: { Authorization: `Bearer ${token}` } }).subscribe(
        (response) => {
          if (response.isPremium !== undefined) {
            this.isPremiumSubject.next(response.isPremium);
          }
        },
        (error) => {
          console.error('Error refreshing user status:', error);
        }
      );
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
