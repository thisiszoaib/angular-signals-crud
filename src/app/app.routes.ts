import { Routes } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list.component';
import { AddContactComponent } from './components/add-contact.component';
import { EditContactComponent } from './components/edit-contact.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ContactsListComponent,
  },
  {
    path: 'add',
    component: AddContactComponent,
  },
  {
    path: 'edit/:id',
    component: EditContactComponent,
  },
];
