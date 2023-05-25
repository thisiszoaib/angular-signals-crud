import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ContactsService } from '../services/contacts.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule],
  template: `
    <mat-list>
      <mat-list-item *ngFor="let contact of contacts()">
        <h3 matListItemTitle>
          {{ contact.name }}
        </h3>
        <p matListItemLine>
          {{ contact.email }}
        </p>
        <button matListItemMeta mat-icon-button (click)="delete(contact)">
          <mat-icon>delete</mat-icon>
        </button>
      </mat-list-item>
    </mat-list>
  `,
  styles: [],
})
export class ContactsListComponent {
  contactsService = inject(ContactsService);
  contacts = this.contactsService.contacts;

  delete(contact: Contact) {
    this.contactsService.deleteContact(contact);
  }
}
