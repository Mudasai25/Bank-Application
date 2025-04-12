import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  Banking = {
    username: '',
    email: '',
    password: '',
    gender: '',
    location: '',
    nationality: '',
    accountNo: '',
    cifNo: null,
    branchCode: null,
    facility: ''
  };

  usernameExists = false;
  emailExists = false;
  accountExists = false;

  constructor(private http: HttpClient, private router: Router) {}

  async register() {
    try {
      const response: any = this.http.post('http://localhost:8400/api/banking/register', this.Banking).toPromise();

      if (response.error) {
        if (response.error === 'UsernameExists') {
          this.usernameExists = true;
          alert("❌ Registration Failed: Username is already taken.");
        } else if (response.error === 'EmailExists') {
          this.emailExists = true;
          alert("❌ Registration Failed: Email is already in use.");
        } else if (response.error === 'accountExists') {
          alert("❌ Registration Failed: Account number is already registered.");
        } else {
          alert("❌ Registration Failed: " + response.error);
        }
        return;
      }
      if (response && response.success) {
        alert("✅ Registration Successful!");
        this.router.navigate(['/login']);
      }
    } catch (error) {
      alert("❌ Registration Failed. Please try again.");
      console.error("Error:", error);
    }
  }
}

/*export class RegisterComponent {
  Banking = {
    username: '',
    email: '',
    password: '',
    gender: '',
    location: '',
    nationality: '',
    accountNo: '',
    cifNo: null,
    branchCode: null,
    facility: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  /*async register() {
    try {
      const response: any = this.http
      .post('http://localhost:8400/api/banking/register', this.Banking)


    console.log("🔍 API Response:", response);

    if (this.Banking) {
      alert("✅ Registration Successful!");
      this.router.navigate(['/login']);
    } else {
      alert("❌ Registration Failed");
      console.log(response,response.user);
    }

    } catch (error) {
      alert("Registration Failed. Please try again.");

      console.error("Error:", error);
    }
  }*/
   /* async register() {
      try {
        const response: any = this.http.post('http://localhost:8400/api/banking/register', this.Banking).toPromise();

        if (this.Banking) {
          alert("✅ Registration Successful!");
          this.router.navigate(['/login']);
        } else {
          alert("❌ Registration Failed: " + response.error);
        }
      } catch (error) {
        alert("❌ Registration Failed. Please try again.");
        console.error("Error:", error);
      }
    }

}*/
