import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string | null = '';
  userData: any = {};
  showDropdown = false;
  apiUrl = 'http://localhost:8400/api/banking/login';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const storedUser = localStorage.getItem('Banking');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.username = user.username || 'Guest';

      this.http.get(`${this.apiUrl}/${user.username}/${user.password}/details`)
        .subscribe(
          (response) => {
            this.userData = response;
          },
          (error) => {
            console.error("Error fetching user details:", error);
          }
        );
    } else {
      this.username = 'Guest';
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    if (!event.target || !(event.target as HTMLElement).closest('.user-info')) {
      this.showDropdown = false;
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
