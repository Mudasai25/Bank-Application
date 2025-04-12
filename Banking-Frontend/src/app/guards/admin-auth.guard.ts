import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const adminId = localStorage.getItem('Banking');

    if (adminId) {
      return true;
    } else {
      this.router.navigate(['/admin-login']);
      return false;
    }
  }
}

