import { Injectable, computed, inject, signal } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Router, RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contacts = signal<Contact[]>([
    {
      name: 'Bibbye Gutcher',
      phone: '885-131-9176',
      email: 'bgutcher0@smh.com.au',
    },
    {
      name: 'Gabbie Haslegrave',
      phone: '541-172-6277',
      email: 'ghaslegrave1@mashable.com',
    },
    {
      name: 'Catie Nettleship',
      phone: '201-539-6873',
      email: 'cnettleship2@google.nl',
    },
    { name: 'Mahalia Sones', phone: '535-669-7499', email: 'msones3@ihg.com' },
    {
      name: 'Lia Yurmanovev',
      phone: '381-531-3649',
      email: 'lyurmanovev4@bravesites.com',
    },
    {
      name: 'Daisy Simonel',
      phone: '890-576-1438',
      email: 'dsimonel5@php.net',
    },
    { name: 'Bobby Coller', phone: '129-638-2410', email: 'bcoller6@usda.gov' },
    {
      name: 'Peri Hockey',
      phone: '290-234-4247',
      email: 'phockey7@edublogs.org',
    },
    {
      name: 'Cordie Crosscombe',
      phone: '907-576-1311',
      email: 'ccrosscombe8@youku.com',
    },
    {
      name: 'Rodrigo Alexsandrovich',
      phone: '799-587-4536',
      email: 'ralexsandrovich9@illinois.edu',
    },
    {
      name: 'Hortensia Fishleigh',
      phone: '434-950-3630',
      email: 'hfishleigha@ft.com',
    },
    {
      name: 'Atlante Rait',
      phone: '445-521-0518',
      email: 'araitb@t-online.de',
    },
    {
      name: 'Marysa Bartolomeoni',
      phone: '256-694-5017',
      email: 'mbartolomeonic@taobao.com',
    },
    {
      name: 'Gussi Albasiny',
      phone: '444-436-5627',
      email: 'galbasinyd@jiathis.com',
    },
    {
      name: 'Betsey Kears',
      phone: '280-992-9432',
      email: 'bkearse@simplemachines.org',
    },
    {
      name: 'Conni Marzellano',
      phone: '425-276-4741',
      email: 'cmarzellanof@usgs.gov',
    },
    {
      name: 'Natalina Burnsides',
      phone: '826-545-7370',
      email: 'nburnsidesg@wikipedia.org',
    },
    {
      name: 'Scarface Samet',
      phone: '606-139-9514',
      email: 'ssameth@bloglovin.com',
    },
    {
      name: 'Shelley Riglar',
      phone: '822-991-7728',
      email: 'sriglari@time.com',
    },
    {
      name: 'Judon Keen',
      phone: '539-279-0970',
      email: 'jkeenj@bizjournals.com',
    },
  ]);

  totalContacts = computed(() => this.contacts().length);

  maxReached = computed(() => this.totalContacts() >= 21);

  constructor() {}

  router = inject(Router);

  addContact(newContact: Contact) {
    setTimeout(() => {
      this.contacts.update((contacts) => [newContact, ...contacts]);
      this.router.navigate(['']);
    }, 1000);
  }

  deleteContact(contact: Contact) {
    setTimeout(() => {
      this.contacts.update((contacts) =>
        contacts.filter((c) => c.email !== contact.email)
      );
    }, 1000);
  }
}
