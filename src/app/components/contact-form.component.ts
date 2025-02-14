import { Component, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Contact } from '../model/contact.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  template: `
    <form class="container" (ngSubmit)="onSubmit()">
      <h2>{{ title() }}</h2>
      <div class="fields">
        <mat-form-field>
          <input [(ngModel)]="name" placeholder="Name" matInput name="name" />
        </mat-form-field>
        <mat-form-field>
          <input
            [(ngModel)]="email"
            placeholder="Email"
            matInput
            name="email"
          />
        </mat-form-field>
        <mat-form-field>
          <input
            [(ngModel)]="phone"
            placeholder="Phone"
            matInput
            name="phone"
          />
        </mat-form-field>
      </div>
      <div class="actions">
        <button mat-flat-button type="submit">Save</button>
        <button type="button" mat-raised-button routerLink="/">Cancel</button>
      </div>
    </form>
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
        margin-top: 16px;
      }
    `,
  ],
})
export class ContactFormComponent {
  title = input<string>('');
  contact = input<Contact>();

  id = linkedSignal(() => this.contact()?.id ?? '');
  name = linkedSignal(() => this.contact()?.name ?? '');
  email = linkedSignal(() => this.contact()?.email ?? '');
  phone = linkedSignal(() => this.contact()?.phone ?? '');

  save = output<Contact>();

  onSubmit() {
    this.save.emit({
      id: this.id(),
      name: this.name(),
      email: this.email(),
      phone: this.phone(),
    });
  }
}
