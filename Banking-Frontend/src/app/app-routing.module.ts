import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/home/user-login/dashboard/dashboard.component';
import { LoginComponent } from './pages/home/user-login/login.component';
import { RegisterComponent } from './pages/home/register/register.component';
import { AccountComponent } from './pages/home/user-login/account/account.component';
import { TransactionComponent } from './pages/home/user-login/transaction/transaction.component';
import { LoansComponent } from './pages/home/user-login/loans/loans.component';
import { SupportComponent } from './pages/home/user-login/support/support.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeLoginComponent } from './pages/home/employee-login/employee-login.component';
import { EmployeeDashboardComponent } from './pages/home/employee-login/employee-dashboard/employee-dashboard.component';
import { AdminLoginComponent } from './pages/home/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/home/admin-login/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './pages/home/admin-login/user-management/user-management.component';
import { SystemConfigComponent } from './pages/home/admin-login/system-config/system-config.component';
import { EmployeeAuthGuard } from './guards/employee-auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employee-login', component: EmployeeLoginComponent },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [EmployeeAuthGuard] },
  { path: 'employee-dashboard/:section', component: EmployeeDashboardComponent },
  { path: 'employee-dashboard/users', component: EmployeeDashboardComponent, data: { section: 'users' } },
  { path: 'employee-dashboard/loans', component: EmployeeDashboardComponent, data: { section: 'loans' } },
  { path: 'employee-dashboard/reports', component: EmployeeDashboardComponent, data: { section: 'reports' } },
  { path: 'employee-dashboard/feedback', component: EmployeeDashboardComponent, data: { section: 'feedback' } },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin-dashboard/user-management', component: UserManagementComponent },
  { path: 'admin-dashboard/system-config', component: SystemConfigComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'account', component: AccountComponent },
  { path: 'transaction-form', component: TransactionComponent, canActivate: [AuthGuard] },
  { path: 'loans', component: LoansComponent },
  { path: 'support', component: SupportComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'elogin', pathMatch: 'full' },
  { path: '**', redirectTo: 'alogin', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
