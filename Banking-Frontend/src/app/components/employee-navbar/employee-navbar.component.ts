import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrls: ['./employee-navbar.component.css']
})
export class EmployeeNavbarComponent {
  username: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.getUsername();
  }

  getUsername() {
    const storedUser = localStorage.getItem('BankingEmp');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.username = user.username || 'Guest';
    } else {
      this.username = 'Guest';
    }
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/employee-login']);
  }
}
