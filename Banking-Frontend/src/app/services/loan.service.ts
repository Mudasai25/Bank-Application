import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseUrl = 'http://localhost:8400/api/banking/loans';

  constructor(private http: HttpClient) {}

  applyLoan(userId: string, loanAmount: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/apply`, { userId, loanAmount });
  }
}
