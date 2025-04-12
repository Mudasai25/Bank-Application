import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent {
  user = {
    id: '',
    pass: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  async login() {
    try {
      const response: any = await this.http.get(`http://localhost:8400/api/banking/elogin/${this.user.id}/${this.user.pass}`).toPromise();

      if (response.success) {
        localStorage.setItem('BankingEmp', JSON.stringify(response.user));
        //alert(response.message);
        this.router.navigate(['/employee-dashboard']);
      } else {
        alert("Error" + response.message);
      }
    } catch (error) {
      alert("Username or Password Error");
      console.error("Error:", error);
    }
  }

}
