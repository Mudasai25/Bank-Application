import { Component } from '@angular/core';
import { SupportService } from 'src/app/services/support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  query = { subject: '', message: '' };

  constructor(private supportService: SupportService) {}

  submitQuery() {
    if (!this.query.message.trim()) {
      alert('Message cannot be empty!');
      return;
    }

    this.supportService.submitQuery(this.query.message).subscribe({
      next: (response) => {
        console.log('Query Sent:', response);
        alert('Support query submitted successfully!');
        this.query.message = '';
      },
      error: (err) => {
        console.log('Error sending query:', err);
        alert('Failed to submit query.');
      }
    });
  }
}
