import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ContactFormComponent } from './contact-form.component';
import { Contact } from '../model/contact.model';
import { ApiService } from '../services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [ContactFormComponent, MatProgressSpinnerModule],
  template: `
    <app-contact-form title="Add Contact" (save)="addContact($event)" />
    @if (saving()) {
    <mat-progress-spinner
      mode="indeterminate"
      diameter="50"
    ></mat-progress-spinner>
    }
  `,
})
export class AddContactComponent {
  private router = inject(Router);
  private api = inject(ApiService);

  saving = signal(false);

  async addContact(newContact: Contact) {
    this.saving.set(true);
    await this.api.addContact(newContact);
    this.saving.set(false);
    this.router.navigate(['/']);
  }
}
