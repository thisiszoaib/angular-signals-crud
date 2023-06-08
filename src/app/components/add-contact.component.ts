import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ContactsService } from '../services/contacts.service';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule,
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
        <!-- <mat-form-field>
          <mat-select
            [ngModel]="country()"
            placeholder="Country"
            (ngModelChange)="country.set($event)"
          >
            <mat-option *ngFor="let country of countries()" [value]="country">{{
              country
            }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-select [(ngModel)]="city" placeholder="City">
            <mat-option *ngFor="let city of cities()" [value]="city">{{
              city
            }}</mat-option>
          </mat-select>
        </mat-form-field> -->
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
  city = '';

  countries = signal(['United Kingdom', 'Pakistan', 'India']);

  country = signal('');

  cities = computed(() => {
    if (this.country() === 'United Kingdom')
      return ['London', 'Manchester', 'Glasgow'];
    if (this.country() === 'Pakistan')
      return ['Lahore', 'Karachi', 'Islamabad'];
    if (this.country() === 'India') return ['Delhi', 'Mumbai', 'Hyderabad'];

    return [];
  });

  save() {
    this.contactsService.addContact({
      name: this.name,
      email: this.email,
      phone: this.phone,
    });
  }
}
