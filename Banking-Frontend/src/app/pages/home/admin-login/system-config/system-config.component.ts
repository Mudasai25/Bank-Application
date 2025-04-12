import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.css']
})
export class SystemConfigComponent {
  settings: Record<string, any> = {
    maxLoginAttempts: 3,
    sessionTimeout: 15,
    securityLevel: 'High'
  };
  constructor(private router: Router) {}

  updateSetting(key: string, value: any) {
    this.settings[key] = value;
  }
  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
}
