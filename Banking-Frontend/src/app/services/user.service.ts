import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8400/api/banking';

  constructor(private http: HttpClient) {}

  getUserDetails(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${username}`);
  }
}
