import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNavbar: boolean = false;
  showAdminNavbar: boolean = false;
  showEmployeeNavbar: boolean = false;
  constructor(private router: Router) {

  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      const userRoutes = ['/dashboard', '/account', '/support','/transaction-form'];
      const adminRoutes = ['/admin-dashboard', '/user-management', '/system-config'];
      const employeeRoutes = ['/employee-dashboard'];

      this.showNavbar = userRoutes.includes(event.url);
      this.showAdminNavbar = adminRoutes.includes(event.url);
      this.showEmployeeNavbar = employeeRoutes.includes(event.url);
    }
  });
}
}
