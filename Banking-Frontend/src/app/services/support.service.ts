import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private apiUrl = 'http://localhost:8400/api/banking';

  constructor(private http: HttpClient) {}

  submitQuery(message: string): Observable<any> {
    const storedBanking = localStorage.getItem('Banking');
    console.log("hello sai"+storedBanking);
    if (!storedBanking) {
      return throwError(() => new Error('Banking credentials not found'));
    }

    const banking = JSON.parse(storedBanking);
    const { username, password } = banking;
      console.log("hello sai"+username+password);
    return this.http.put(
      `${this.apiUrl}/login/${username}/${password}/feedback/${encodeURIComponent(message)}`,
      {message:message},
      { responseType: 'text' }
    ).pipe(
      catchError(error => {
        console.error('Error sending query:', error);
        return throwError(error);
      })
    );
  }
}
