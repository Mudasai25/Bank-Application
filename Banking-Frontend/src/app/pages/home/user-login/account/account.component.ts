import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  transactions: number[] = []; // Transactions will always be numbers
  messages: string[] = []; // Messages remain strings
  formattedTransactions: string[] = [];
  userId: string = '';
  password: string = '';

  constructor(private http: HttpClient, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getUserCredentials();
    this.getTransactions();
  }

  getUserCredentials(): void {
    const storedUser = localStorage.getItem('Banking');

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.userId = user.username || '';
        this.password = user.password || '';

        if (!this.userId || !this.password) {
          console.error('Invalid user credentials');
        }
      } catch (error) {
        console.error('Error parsing user credentials:', error);
      }
    } else {
      console.error('User credentials not found in local storage');
    }
  }

  getTransactions(): void {
    if (this.userId && this.password) {
      const apiUrl = `http://localhost:8400/api/banking/login/transactions/${this.userId}/${this.password}`;

      this.http.get<{ amounts: number[], messages: string[] }>(apiUrl).subscribe({
        next: (data) => {
          console.log('📜 Transactions:', data.amounts);
          console.log('📩 Messages:', data.messages);

          this.transactions = data.amounts;
          this.messages = data.messages;

          this.formattedTransactions = this.transactions.map(txn => `₹ ${txn.toFixed(2)}`);
        },
        error: (error) => {
          console.error('❌ Error fetching transactions:', error);
          this.transactions = [];
          this.messages = [];
          this.formattedTransactions = ['❌ Unable to load transactions'];
        }
      });
    } else {
      console.warn('⚠️ User credentials are missing, cannot fetch transactions.');
    }
  }



}
