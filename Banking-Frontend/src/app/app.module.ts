import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/user-navbar/navbar.component';
import { DashboardComponent } from './pages/home/user-login/dashboard/dashboard.component';
import { LoginComponent } from './pages/home/user-login/login.component';
import { RegisterComponent } from './pages/home/register/register.component';
import { AccountComponent } from './pages/home/user-login/account/account.component';
import { LoansComponent } from './pages/home/user-login/loans/loans.component';
import { SupportComponent } from './pages/home/user-login/support/support.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeLoginComponent } from './pages/home/employee-login/employee-login.component';
import { EmployeeDashboardComponent } from './pages/home/employee-login/employee-dashboard/employee-dashboard.component';
import { AdminLoginComponent } from './pages/home/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/home/admin-login/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './pages/home/admin-login/user-management/user-management.component';
import { SystemConfigComponent } from './pages/home/admin-login/system-config/system-config.component';
import { EmployeeNavbarComponent } from './components/employee-navbar/employee-navbar.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { TransactionComponent } from './pages/home/user-login/transaction/transaction.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    LoansComponent,
    SupportComponent,
    HomeComponent,
    EmployeeLoginComponent,
    EmployeeDashboardComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    UserManagementComponent,
    SystemConfigComponent,
    EmployeeNavbarComponent,
    AdminNavbarComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
