import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/rentasAuto';
  private currentUserType: 'uscomun' | 'admin' | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  checkConnection(): Observable<any> {
    return this.http.get(`${this.baseUrl}/uscomun/getAll`).pipe(
      catchError(error => {
        console.error('Error verificando conexión:', error);
        return throwError(() => error);
      })
    );
  }

  login(credentials: {email: string, password: string}, userType: 'uscomun' | 'admin'): Observable<any> {
    this.currentUserType = userType;
    const endpoint = userType === 'uscomun' ? '/uscomun/login' : '/admin/login';
    
    return this.http.post(`${this.baseUrl}${endpoint}`, credentials, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(response => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          localStorage.setItem('userType', userType);
          // Redirigir según tipo de usuario
          const redirectTo = userType === 'uscomun' ? '/home' : '/homeadmin';
          this.router.navigate([redirectTo]);
        }
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => error);
      })
    );
  }

  register(userData: any, userType: 'uscomun' | 'admin'): Observable<any> {
    const endpoint = userType === 'uscomun' ? '/uscomun/add' : '/admin/add';
    
    return this.http.post(`${this.baseUrl}${endpoint}`, userData, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(error => {
        console.error('Error en registro:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getUserType(): 'uscomun' | 'admin' | null {
    return localStorage.getItem('userType') as 'uscomun' | 'admin' | null;
  }

  // Nuevo método para verificar si el usuario actual es admin
  isAdmin(): boolean {
    return this.getUserType() === 'admin';
  }
}