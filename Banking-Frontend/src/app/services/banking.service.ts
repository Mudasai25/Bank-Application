import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankingService {
  private baseUrl = 'http://localhost:8400/api/banking';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/register`, user);
  }
  login(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/login/${username}/${password}`);
  }

  deposit(userId: string, amount: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/deposit/${userId}/${amount}`, {});
  }


  withdraw(userId: string, amount: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/withdraw/${userId}/${amount}`, {});
  }

  getBalance(userId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/balance/${userId}`);
  }

  applyLoan(userId: string, loanType: string, amount: number, duration: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/loan/${userId}/${loanType}/${amount}/${duration}`, {});
 }

}
