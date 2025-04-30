import { Injectable } from '@angular/core';
import { collectionData,collection,Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }
  getUsers(): Observable<any[]> {
    const usersCollection = collection(this.firestore, 'Users');
    return collectionData(usersCollection,{idField:'id'});
  }
}
