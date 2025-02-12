import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactsService } from './services/contacts.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './services/loader.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterOutlet,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
    ],
    template: `
    <mat-toolbar color="primary"
      >My Contacts ({{ totalContacts() }})

      <button mat-icon-button routerLink="/add" [disabled]="maxReached()">
        <mat-icon>add_circle</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
    <mat-progress-spinner
      mode="indeterminate"
      *ngIf="loading()"
    ></mat-progress-spinner>
  `,
    styles: [
        `
      mat-toolbar {
        justify-content: space-between;
      }

      mat-progress-spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `,
    ]
})
export class AppComponent {
  title = 'Angular Signals Crud';

  contactsService = inject(ContactsService);

  totalContacts = this.contactsService.totalContacts;
  maxReached = this.contactsService.maxReached;

  loading = inject(LoaderService).loading;

  snackbar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      if (this.contactsService.maxReached()) {
        this.snackbar.open(
          "You've reached the maximum contacts allowed in this app. Please delete some to continue adding...",
          'Close'
        );
      }
    });
  }
}
