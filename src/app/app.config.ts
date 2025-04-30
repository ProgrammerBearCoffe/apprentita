import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp,  } from "firebase/app";
import { provideDatabase } from '@angular/fire/database';
import { getDatabase } from 'firebase/database';
import { routes } from './app.routes';
import { initializeApp as initializeApp_alias, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
/*
const firebaseConfig = {
  apiKey: "AIzaSyCJ8aWRi4GZRIpo9eIoV9x_SmIqqpsBzK0",
  authDomain: "rentascarros-ec2a2.firebaseapp.com",
  projectId: "rentascarros-ec2a2",
  storageBucket: "rentascarros-ec2a2.firebasestorage.app",
  messagingSenderId: "856054079077",
  appId: "1:856054079077:web:4a55f254d58a694c57f08c"
};
*/
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "rentascarros-ec2a2", appId: "1:856054079077:web:4a55f254d58a694c57f08c", storageBucket: "rentascarros-ec2a2.firebasestorage.app", apiKey: "AIzaSyCJ8aWRi4GZRIpo9eIoV9x_SmIqqpsBzK0", authDomain: "rentascarros-ec2a2.firebaseapp.com", messagingSenderId: "856054079077" })), provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ]
};

