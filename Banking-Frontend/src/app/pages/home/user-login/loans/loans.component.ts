import { Component } from '@angular/core';
import { BankingService } from 'src/app/services/banking.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent {
  loan = { amount: 0, type: '', duration: 0 };

  constructor(private bankingService: BankingService) {}

  applyLoan() {
    const userId = localStorage.getItem('userId'); // Get userId from session
    if (!userId) {
      alert('Please log in first!');
      return;
    }

    this.bankingService.applyLoan(userId, this.loan.type, this.loan.amount, this.loan.duration).subscribe({
      next: (response) => {
        console.log('Loan Applied:', response);
        alert('Loan Application Successful!');
      },
      error: () => {
        alert('Error applying for loan');
      }
    });
  }
}
