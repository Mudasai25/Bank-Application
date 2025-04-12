import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDashboardService {
  private apiUrl = 'http://localhost:8400/api/banking';

  constructor(private http: HttpClient) {}

  getAllLoans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/loans`).pipe(
      catchError(error => {
        console.error('Error fetching loans:', error);
        return throwError(error);
      })
    );
  }

  approveLoan(loanId: string, status: boolean): Observable<string> {
    const storedEmployee = localStorage.getItem('BankingEmp');
    console.log("Employye"+storedEmployee);
    if (!storedEmployee) {
      return throwError(() => new Error('Employee credentials not found'));
    }

    const employee = JSON.parse(storedEmployee);
    const { username, password } = employee;

    return this.http.put<string>(
      `${this.apiUrl}/elogin/${username}/${password}/loan/approve/${loanId}/${status}`,
      {}
    ).pipe(
      catchError(error => {
        console.error(`Error updating loan ${loanId}`, error);
        return throwError(error);
      })
    );
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      catchError(error => {
        console.error('Error fetching users', error);
        return throwError(error);
      })
    );
  }

  getFeedbacks(): Observable<any[]> {
    const storedEmployee = localStorage.getItem('BankingEmp');
    console.log("hello sai"+storedEmployee);
    if (!storedEmployee) {
      return throwError(() => new Error('Employee credentials not found'));
    }

    const employee = JSON.parse(storedEmployee);
    const { username, password } = employee;
    console.log("hel "+username);
    return this.http.get<any[]>(`${this.apiUrl}/elogin/${username}/${password}/getfeedbacks`).pipe(
      catchError(error => {
        console.error('Error fetching feedbacks:', error);
        return throwError(error);
      })
    );
}


  getFinancialReports(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reports`).pipe(
      catchError(error => {
        console.error('Error fetching financial reports', error);
        return throwError(error);
      })
    );
  }

  getUserTransactionHistory(employeeId: string, password: string, userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/elogin/${employeeId}/${password}/trans/${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching transaction history', error);
        return throwError(error);
      })
    );
}


  getPendingApprovals(): Observable<any[]> {
    const storedEmployee = localStorage.getItem('Employee');
    if (!storedEmployee) {
      return throwError(() => new Error('Employee credentials not found'));
    }

    const employee = JSON.parse(storedEmployee);
    const { username, password } = employee;

    return this.http.get<any[]>(`${this.apiUrl}/elogin/${username}/${password}/approve`).pipe(
      catchError(error => {
        console.error('Error fetching pending approvals', error);
        return throwError(error);
      })
    );
  }
}
