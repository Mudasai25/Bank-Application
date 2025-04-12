import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  senderId: string = '';
  password: string = '';
  receiverId: string = '';
  amount: number = 0;
  message: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUserCredentials();
  }

  // Load logged-in user credentials from localStorage
  loadUserCredentials(): void {
    const storedItem = localStorage.getItem('Banking');

    if (storedItem) {
      try {
        const user = JSON.parse(storedItem);
        if (user.username && user.password) {
          this.senderId = user.username;
          this.password = user.password;
        } else {
          console.error('⚠️ Incomplete user data in localStorage.');
          this.message = '⚠️ Please log in again.';
        }
      } catch (error) {
        console.error('❌ Error parsing user data:', error);
        this.message = '⚠️ Error retrieving user data.';
      }
    } else {
      console.warn('⚠️ No user data found in localStorage.');
    }
  }

  // Transfer money function
  transferMoney() {
    if (!this.senderId || !this.password) {
      this.message = '⚠️ Please log in first.';
      return;
    }

    if (!this.receiverId || this.amount <= 0) {
      this.message = '⚠️ Please enter valid details.';
      return;
    }

    const apiUrl = `http://localhost:8400/api/banking/login/${this.senderId}/${this.password}/trans/${this.receiverId}/${this.amount}`;

    this.http.put(apiUrl, {}).subscribe({
      next: (response: any) => {
        console.log('✅ Transaction Success:', response);
        this.message = response || '✅ Transaction Successful!';
      },
      error: (error) => {
        console.error('❌ Transaction Failed:', error);
        this.message = error.error || '❌ Transaction Failed';
      }
    });
  }
}
