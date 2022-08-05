import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { WELCOME_FILE } from '../constants/fake-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  createUser(userId: string): void {
    this.firestore
      .collection('users')
      .add({ id: userId, mdFiles: [WELCOME_FILE] });
  }

  createUserId(): string {
    return this.firestore.createId();
  }

  getUser(userId: string): Observable<any[]> {
    return this.firestore
      .collection('users', (ref) => ref.where('id', '==', userId))
      .valueChanges();
  }
}
