import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  activeSection: string = 'overview';
  dashboardData: any = {};
  username: string | null = '';
  
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchDashboardData();
    this.getUsername();
  }
  getUsername() {
    const storedUser = localStorage.getItem('Banking');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.username = user.username || 'Guest';
    } else {
      this.username = 'Guest';
    }
  }
  fetchDashboardData() {
    this.http.get<any>('http://localhost:8400/api/banking/alogin/dashboard').subscribe(
      data => {
        this.dashboardData = data;
      },
      error => {
        console.error('Error fetching dashboard data:', error);
      }
    );
  }

  showSection(section: string) {
    this.activeSection = section;
  }

  navigateToSection(section: string) {
    this.router.navigate([`/admin-dashboard/${section}`]);
  }

  logout() {
    localStorage.removeItem('adminId');
    this.router.navigate(['/admin-login']);
  }
}
