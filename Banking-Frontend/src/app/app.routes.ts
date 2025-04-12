import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/home/user-login/dashboard/dashboard.component';
import { LoginComponent } from './pages/home/user-login/login.component';
import { RegisterComponent } from './pages/home/register/register.component';
import { AccountComponent } from './pages/home/user-login/account/account.component';
import { LoansComponent } from './pages/home/user-login/loans/loans.component';
import { SupportComponent } from './pages/home/user-login/support/support.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: 'loans', component: LoansComponent },
  { path: 'support', component: SupportComponent }
];
