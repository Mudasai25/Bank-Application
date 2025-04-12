import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private baseUrl = 'http://localhost:8400/api/banking';
  user = {
    id: '',
    pass: ''
  };
  balance: number = 1000;
  depositAmount: number | null = null;
  withdrawAmount: number | null = null;
  loanAmount: number | null = null;
  loanType: string = '';
  loanDuration: number | null = null;

  activeSection: string | null = null;

  constructor(private http: HttpClient) {
    this.getBalance();
  }

  showSection(section: string) {
    this.activeSection = this.activeSection === section ? null : section;
  }
  /*
  getBalance() {
    const storedUser = localStorage.getItem('Banking');  // Get user data from localStorage

    if (!storedUser) {
        console.log("User data not found in localStorage.");
        alert('User Balance not found');
        return;
    }

    const user = JSON.parse(storedUser);  // Parse JSON string to an object
    // Correct API request format
    var bal = this.http.get<number>(`${this.baseUrl}/${user.username}/${user.password}/balance`);


}*/

getBalance() {
  const storedUser = localStorage.getItem('Banking'); // Retrieve stored user data

  if (!storedUser) {
      console.log("User data not found in localStorage.");
      alert('User Balance not found');
      return;
  }

  const user = JSON.parse(storedUser);

  const apiUrl = `${this.baseUrl}/${user.username}/${user.password}/balance`;
  console.log("Fetching balance from:", apiUrl);

  this.http.get<number>(apiUrl).subscribe({
      next: (response) => {
          console.log("Balance fetched successfully:", response);
          this.balance = response;
      },
      error: (error) => {
          console.error("Error fetching balance:", error);
          alert('Error fetching balance. Please try again.');
      }
  });
}

  /*getBalance() {
    const userId = localStorage.getItem('userId');

    if (!userId || userId.trim() === '') { // Added check for empty string
      console.log("User ID is null or empty:", userId);
      alert('User ID not found. Please log in again.');
      return;
    }

    this.http.get<number>(`${this.baseUrl}/balance/${userId}`).subscribe({
      next: (response) => {
        this.balance = response;
      },
      error: () => {
        alert('Error fetching balance');
      }
    });
  }*/

    deposit() {
    if (this.depositAmount === null || this.depositAmount <= 0) {
        alert('Please enter a valid deposit amount');
        return;
    }

    const storedUser = localStorage.getItem('Banking');

    if (!storedUser) {
        alert('User data not found. Please log in again.');
        return;
    }

    try {
        const user = JSON.parse(storedUser);
        if (!user.username || !user.password) {
            alert('Invalid user data. Please log in again.');
            return;
        }

        this.http.put(`${this.baseUrl}/login/${user.username}/${user.password}/deposit/${this.depositAmount}`, {}, { responseType: 'text' })
        .subscribe({
            next: (response) => {
                alert(response);
                this.getBalance();
                this.depositAmount = null;
            },
            error: (error) => {
                console.error('Error depositing money:', error);
                alert('Error depositing money');
            }
        });
    } catch (error) {
        console.error('Error parsing user data:', error);
        alert('Error processing user data. Please log in again.');
    }
}


withdraw() {
  if (this.withdrawAmount === null || this.withdrawAmount <= 0) {
      alert('Please enter a valid withdrawal amount');
      return;
  }

  const storedUser = localStorage.getItem('Banking');
  if (!storedUser) {
      alert('User data not found');
      return;
  }

  const user = JSON.parse(storedUser);
  const { username, password } = user;

  this.http.put(`${this.baseUrl}/login/${user.username}/${user.password}/withdraw/${this.withdrawAmount}`, {}, { responseType: 'text' })
  .subscribe({
      next: (response) => {
          alert(response);
          this.getBalance();
          this.withdrawAmount = null;
      },
      error: (error) => {
          console.error('Error withdrawing money:', error);
          alert('Error drawing money');
      }
  });
}
applyLoan() {
  if (!this.loanType) {
      alert('Please select a loan type');
      return;
  }

  if (this.loanAmount === null || this.loanAmount <= 0) {
      alert('Please enter a valid loan amount');
      return;
  }

  if (this.loanDuration === null || this.loanDuration <= 0) {
      alert('Please enter a valid loan duration');
      return;
  }

  const storedUser = localStorage.getItem('Banking'); 
  if (!storedUser) {
      alert('User not found');
      return;
  }

  const user = JSON.parse(storedUser);
  const { username, password } = user;


  this.http.put(`${this.baseUrl}/login/${username}/${password}/loan/${this.loanType}/${this.loanAmount}/${this.loanDuration}`, {}, { responseType: 'text' }).subscribe({
      next: (response) => {
          alert(response);
          this.loanAmount = null;
          this.loanDuration = null;
          this.loanType = '';
      },
      error: (error) => {
          console.error('Error applying for loan:', error);
          alert('Error applying for loan');
      }
  });
  }
}
