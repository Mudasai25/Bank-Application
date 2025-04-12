import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    id: '',
    pass: ''
  };
  otp: string = '';
  showOtpField: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}

  /*async login() {
    try {
      const response: any = this.http.get(`http://localhost:8400/api/banking/login/${this.user.id}/${this.user.pass}`).toPromise();
      if (response){
        localStorage.setItem('Banking', JSON.stringify(response));
        alert("✅ Login Successful!");
        const b=localStorage.getItem("banking");
        if(b){
          console.log(b);
        }
        else{
          console.log("Not founded here. Upload once again");
        }
        this.router.navigate(['/dashboard']);
      } else {
        alert("Invalid Username or Password. Please try again.");
      }
    } catch (error) {
      alert("Login Failed. Please check your credentials.");
      console.error("Error:", error);
    }
  }*/
    async login() {
      try {
        const response: any = await this.http.get(`http://localhost:8400/api/banking/login/${this.user.id}/${this.user.pass}`).toPromise();

        if (response) {
          alert(`OTP has been sent to your registered email.`);
          this.showOtpField = true; // Show OTP input field after login
        } else {
          alert("Error: Wrong Username or Password");
        }
      } catch (error) {
        alert("Username or Password Error");
        console.error("Error:", error);
      }
    }

    async verifyOtp() {
      try {
        const response: any = await this.http.get(`http://localhost:8400/api/banking/login/${this.user.id}/${this.user.pass}/otp/${this.otp}`).toPromise();

        if (response) {
          localStorage.setItem('Username', this.user.id);
          localStorage.setItem('UserPass', this.user.pass);
          localStorage.setItem('Banking', JSON.stringify(response));

          this.router.navigate(['/dashboard']); // Redirect to dashboard
        } else {
          alert("Invalid OTP. Please try again.");
        }
      } catch (error) {
        alert("Invalid OTP. Please try again.");
        console.error("Error:", error);
      }
    }



  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
