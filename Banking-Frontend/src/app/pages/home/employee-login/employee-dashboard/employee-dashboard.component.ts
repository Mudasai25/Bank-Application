import { Component, OnInit } from '@angular/core';
import { EmployeeDashboardService } from './employee-dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  activeSection: string = 'users';
  users: any[] = [];
  loans: any[] = [];
  feedbacks: any[] = [];
  approvals: string[] = [];
  username: string | null = '';


  constructor(
    private dashboardService: EmployeeDashboardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const section = params.get('section');
      if (section) {
        this.activeSection = section;
      }
    });

    this.loadUsers();
    this.loadLoans();
    this.loadFeedbacks();
    this.loadApprovals();
    this.getUsername();
  }

  navigateToSection(section: string) {
    this.activeSection = section; // Update the UI
    this.router.navigate(['/employee-dashboard', section]);
  }

  getUsername() {
    const storedUser = localStorage.getItem('BankingEmp');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.username = user.username || 'Guest';
    } else {
      this.username = 'Guest';
    }
  }

  loadUsers() {
    this.dashboardService.getAllUsers().subscribe({
      next: (data) => {
        console.log("Data values"+data);
        this.users = data
      },
      error: (err) => console.log('Error loading users:', err)
    });
  }

  loadLoans() {
    this.dashboardService.getAllLoans().subscribe({
      next: (data) => {
        console.log("Loan Applications:", data);
        this.loans = data.map(loan => ({
          ...loan,
          status: loan.status || 'Pending'
        }));
      },
      error: (err) => console.log('Error loading loans:', err)
    });
  }



  approveLoan(loan: any) {
    this.dashboardService.approveLoan(loan.id, true).subscribe({
      next: () => {
        console.log(`Loan ${loan.id} approved`);
        this.loadLoans();
      },
      error: (err) => console.log('Error approving loan:', err)
    });
  }

  rejectLoan(loan: any) {
    this.dashboardService.approveLoan(loan.id, false).subscribe({
      next: () => {
        console.log(`Loan ${loan.id} rejected`);
        this.loadLoans();
      },
      error: (err) => console.log('Error rejecting loan:', err)
    });
  }

  loadFeedbacks() {
    this.dashboardService.getFeedbacks().subscribe({
      next: (data) => {
        console.log("Received feedbacks:", data);
        this.feedbacks = data;
      },
      error: (err) => console.error('Error loading feedbacks:', err)
    });
}


  loadApprovals() {
    this.dashboardService.getPendingApprovals().subscribe({
      next: (data) => (this.approvals = data),
      error: (err) => console.log('Error loading approvals:', err)
    });
  }

  respondToFeedback(feedback: any) {
    alert('Responding to: ' + feedback.Username);
  }

  logout() {
    localStorage.removeItem('employeeId');
    this.router.navigate(['/employee-login']);
  }


  viewHistory(user: any) {
    const storedEmployee = localStorage.getItem('BankingEmp');
    if (!storedEmployee) {
      console.error('Employee credentials not found');
      alert('Employee credentials not found');
      return;
    }

    const employee = JSON.parse(storedEmployee);
    const { username, password } = employee;

    this.dashboardService.getUserTransactionHistory(username, password, user.username).subscribe({
      next: (history) => {
        console.log('Transaction history:', history);
        alert(`Transaction history for ${user.username}: \n ${JSON.stringify(history, null, 2)}`);
      },
      error: (err) => {
        console.error('Error fetching transaction history:', err);
        alert('Failed to fetch transaction history');
      }
    });
}


  generateReport() {
    alert('Generating Financial Report...');
  }
}
