import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  adminId: string | null = null;
  adminPass: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
    this.adminId = localStorage.getItem("adminId");
    this.adminPass = localStorage.getItem("adminPass");

    console.log("Admin ID:", this.adminId);
    console.log("Admin Password:", this.adminPass);
  }

  fetchUsers() {
    console.log("🔍 Fetching users...");
    this.http.get<any[]>('http://localhost:8400/api/banking/users').subscribe({
      next: (data) => {
        console.log("✅ Users fetched from API:", data);
        this.users = data.map(user => ({
          name: user.username,
          id: user.username,
          role: user.isAdmin ? 'Admin' : user.isEmployee ? 'Employee' : 'User',
          status: user.freeze ? 'Active' : 'Suspended'
        }));
      },
      error: (error) => {
        console.error("❌ Error fetching users:", error);
      }
    });
  }


  toggleStatus(user: any) {
    const adminId = localStorage.getItem("adminId");
    const adminPass = localStorage.getItem("adminPass");

    console.log("Admin ID:", adminId);
    console.log("Admin Password:", adminPass);
    console.log("User ID:", user.id);

    if (!adminId || !adminPass) {
      alert("❌ Admin login required");
      return;
    }
    const apiUrl = `http://localhost:8400/api/banking/alogin/${adminId}/${adminPass}/freeze/${user.id}`;

    this.http.put(apiUrl, {})
      .subscribe({
        next: (response: any) => {
          alert(response);
          user.status = user.status === 'Active' ? 'Suspended' : 'Active';
        },
        error: (error) => {
          user.status = user.status === 'Active' ? 'Suspended' : 'Active';
          //alert("❌ Failed to update status: " + (error.error?.message || "Unknown Error"));
          //console.error("Error:", error);
        }
      });
}
goBack() {
  this.router.navigate(['/admin-dashboard']);
}

}
