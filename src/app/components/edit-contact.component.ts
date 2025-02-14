import {
  Component,
  input,
  inject,
  resource,
  computed,
  signal,
} from '@angular/core';
import { ContactFormComponent } from './contact-form.component';
import { ApiService } from '../services/api.service';
import { Contact } from '../model/contact.model';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [
    ContactFormComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    @if (loading()) {
    <mat-progress-spinner mode="indeterminate" diameter="50" />
    } @if (contactResource.value(); as contact) {
    <app-contact-form
      title="Edit Contact"
      [contact]="contact"
      (save)="updateContact($event)"
    />
    }
  `,
})
export class EditContactComponent {
  id = input.required<string>();
  private router = inject(Router);

  private apiService = inject(ApiService);

  saving = signal(false);

  loading = computed(() => this.contactResource.isLoading() || this.saving());

  contactResource = resource({
    request: this.id,
    loader: ({ request: id }) => this.apiService.getContact(id),
  });

  async updateContact(contact: Contact) {
    this.saving.set(true);
    await this.apiService.updateContact(this.id(), contact);
    this.saving.set(false);
    this.router.navigate(['/']);
  }
}
