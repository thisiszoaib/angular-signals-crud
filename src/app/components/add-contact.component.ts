import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
  ],
  template: `
    <div class="container">
      <h2>Add New Contact</h2>
      <div class="form">
        <mat-form-field>
          <input [(ngModel)]="name" matInput placeholder="Name" />
        </mat-form-field>
        <mat-form-field>
          <input [(ngModel)]="email" matInput placeholder="Email Address" />
        </mat-form-field>
        <mat-form-field>
          <input [(ngModel)]="phone" matInput placeholder="Phone" />
        </mat-form-field>
      </div>
      <div class="actions">
        <button mat-raised-button color="primary" (click)="save()">Save</button>
        <button mat-raised-button routerLink="/">Back</button>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 24px;
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .actions {
        display: flex;
        gap: 8px;
      }
    `,
  ],
})
export class AddContactComponent {
  name = '';
  email = '';
  phone = '';

  contactsService = inject(ContactsService);

  save() {
    const payload = { name: this.name, phone: this.phone, email: this.email };
    this.contactsService.addContact(payload);
  }
}
