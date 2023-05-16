import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactsService } from './services/contacts.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <mat-toolbar color="primary"
      >My Contacts ({{ totalContacts() }})

      <button mat-icon-button routerLink="/add">
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
  ],
})
export class AppComponent {
  title = 'Angular Signals Crud';

  contacts = inject(ContactsService).contacts;

  loading = inject(LoaderService).loading;

  totalContacts = computed(() => this.contacts().length);
}
