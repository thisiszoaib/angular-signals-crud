import { Component, computed, inject, resource, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  template: `
    <mat-list>
      @for (contact of contactsResource.value(); track contact.id) {
      <mat-list-item>
        <h3 matListItemTitle>{{ contact.name }}</h3>
        <p matListItemLine>{{ contact.email }}</p>
        <div matListItemMeta>
          <button mat-icon-button [routerLink]="['/edit', contact.id]">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button (click)="deleteContact(contact.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </mat-list-item>
      }
    </mat-list>
    @if (loading()) {
    <mat-progress-spinner
      mode="indeterminate"
      diameter="50"
    ></mat-progress-spinner>
    }
  `,
})
export class ContactsListComponent {
  apiService = inject(ApiService);

  contactsResource = resource({
    loader: () => this.apiService.getContacts(),
  });

  deleting = signal(false);

  loading = computed(
    () => this.deleting() || this.contactsResource.isLoading()
  );

  async deleteContact(id: string) {
    this.deleting.set(true);
    await this.apiService.deleteContact(id);
    this.deleting.set(false);
    this.contactsResource.reload();
  }
}
