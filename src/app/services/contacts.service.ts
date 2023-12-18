import { Injectable, computed, inject } from '@angular/core';
import { Contact } from '../model/contact.model';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  firestore = inject(Firestore);
  contactsCollection = collection(
    this.firestore,
    'contacts'
  ) as CollectionReference<Contact>;
  contacts = toSignal(
    collectionData(this.contactsCollection, { idField: 'id' }),
    {
      initialValue: [],
    }
  );

  readonly MAX_CONTACTS_ALLOWED = 50;

  totalContacts = computed(() => this.contacts().length);

  maxReached = computed(
    () => this.totalContacts() >= this.MAX_CONTACTS_ALLOWED
  );

  router = inject(Router);
  loader = inject(LoaderService);

  constructor() {}

  async addContact(newContact: Partial<Contact>) {
    this.loader.showLoader();
    await addDoc(this.contactsCollection, { ...newContact });
    this.loader.hideLoader();
    this.router.navigate(['/']);
  }

  async deleteContact(id: string) {
    this.loader.showLoader();
    const docRef = doc(this.firestore, 'contacts', id);
    await deleteDoc(docRef);
    this.loader.hideLoader();
  }
}
