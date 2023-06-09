import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCfHjWcPDlecLG5rFco6kLQi70aoQCjZok',
  authDomain: 'angular-signals-crud.firebaseapp.com',
  projectId: 'angular-signals-crud',
  storageBucket: 'angular-signals-crud.appspot.com',
  messagingSenderId: '922593477182',
  appId: '1:922593477182:web:8f893b210d150c35c1c76f',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig))
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
