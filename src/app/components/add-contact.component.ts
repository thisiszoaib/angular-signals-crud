import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ContactsService } from '../services/contacts.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  template: `
    <div class="container">
      <h2>Add Contact</h2>
      <div class="fields">
        <mat-form-field>
          <input [(ngModel)]="name" placeholder="Name" matInput />
        </mat-form-field>
        <mat-form-field>
          <input [(ngModel)]="email" placeholder="Email" matInput />
        </mat-form-field>
        <mat-form-field>
          <input [(ngModel)]="phone" placeholder="Phone" matInput />
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

      .fields {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .actions {
        display: flex;
        gap: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddContactComponent {
  contactsService = inject(ContactsService);

  name = '';
  email = '';
  phone = '';

  save() {
    this.contactsService.addContact({
      name: this.name,
      email: this.email,
      phone: this.phone,
    });
  }
}
