import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const employeeId = localStorage.getItem('BankingEmp');
    if (employeeId) {
      return true;
    } else {
      this.router.navigate(['/employee-login']);
      return false;
    }
  }
}

