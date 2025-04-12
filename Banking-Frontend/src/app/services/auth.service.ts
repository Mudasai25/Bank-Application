import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8400';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/login/${username}/${password}`).pipe(
      catchError(() => {
        return throwError(() => new Error('User has not found'));
      })
    );
  }

  register(user: any): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/register`, user).pipe(
      catchError((error) => {
        return throwError(() => new Error('Registration failed'));
      })
    );
  }
  employeeLogin(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/employee-login/${username}/${password}`);
  }
  adminLogin(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin-login/${username}/${password}`);
  }

  logout() {
    localStorage.removeItem('employeeId');
  }
}
