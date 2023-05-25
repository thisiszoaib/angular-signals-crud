import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactsService } from './services/contacts.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  template: `
    <mat-toolbar color="primary">
      My Contacts ({{ totalContacts() }})

      <button mat-icon-button routerLink="/add" [disabled]="maxReached()">
        <mat-icon>add_circle</mat-icon>
      </button>
    </mat-toolbar>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      mat-toolbar {
        justify-content: space-between;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Angular Signals Crud';

  contactsService = inject(ContactsService);
  totalContacts = this.contactsService.totalContacts;
  maxReached = this.contactsService.maxReached;

  snackbar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      if (this.maxReached()) {
        this.snackbar.open(
          "You've reached your limit. Please remove some contacts before adding again!",
          'Close'
        );
      }
    });
  }
}
