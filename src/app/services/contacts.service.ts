import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Contact } from '../model/contact.model';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contacts = signal<Contact[]>([]);

  readonly MAX_CONTACTS_ALLOWED = 21;

  totalContacts = computed(() => this.contacts().length);

  maxReached = computed(
    () => this.totalContacts() >= this.MAX_CONTACTS_ALLOWED
  );

  router = inject(Router);
  loader = inject(LoaderService);
  firestore = inject(Firestore);

  contactsCollection = collection(
    this.firestore,
    'contacts'
  ) as CollectionReference<Contact>;

  constructor() {
    this.fetchContacts();
  }

  async fetchContacts() {
    const contacts = await getDocs(this.contactsCollection);
    this.contacts.set(contacts.docs.map((c) => ({ ...c.data(), id: c.id })));
  }

  async addContact(newContact: Partial<Contact>) {
    this.loader.showLoader();
    await addDoc(this.contactsCollection, { ...newContact });
    await this.fetchContacts();
    this.loader.hideLoader();
    this.router.navigate(['/']);
  }

  async deleteContact(id: string) {
    this.loader.showLoader();
    const docRef = doc(this.firestore, 'contacts', id);
    await deleteDoc(docRef);
    await this.fetchContacts();
    this.loader.hideLoader();
  }
}
