import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  user = {
    id: '',
    pass: ''
  };
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  constructor(private http: HttpClient, private router: Router) {}

  /*async login() {
    try {
      const response: any = await this.http.get(`http://localhost:8400/api/banking/alogin/${this.user.id}/${this.user.pass}`).toPromise();

      if (response.success) {
        localStorage.setItem('Banking', JSON.stringify(response.user));
        //alert(response.message);
        this.router.navigate(['/admin-dashboard']);
      } else {
        alert("Error" + response.message);
      }
    } catch (error) {
      alert("Username or Password Error");
      console.error("Error:", error);
    }
  }*/

    async login() {
      try {
        const response: any = await this.http.get(`http://localhost:8400/api/banking/alogin/${this.user.id}/${this.user.pass}`).toPromise();

        if (response.success) {
          localStorage.setItem('adminId', this.user.id);
          localStorage.setItem('adminPass', this.user.pass);
          localStorage.setItem('Banking', JSON.stringify(response.user));
          //alert(response.message);
          this.router.navigate(['/admin-dashboard']);
        } else {
          alert("Error" + response.message);
        }
      } catch (error) {
        alert("Username or Password Error");
        console.error("Error:", error);
      }
    }
}
