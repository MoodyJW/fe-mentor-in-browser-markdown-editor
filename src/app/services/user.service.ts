import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { WELCOME_FILE } from '../constants/default-values';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  createUser(userId: string): void {
    const user = {
      id: userId,
      mdFiles: [WELCOME_FILE],
      currentMdFile: WELCOME_FILE,
    };
    this.firestore.collection('users').doc(user.id).set(user);
    localStorage.setItem('inBrowserMarkdownId', user.id);
  }

  createUserId(): string {
    return this.firestore.createId();
  }

  getUsers(userId: string): Observable<User[]> {
    return this.firestore
      .collection<User>('users', (ref) => ref.where('id', '==', userId))
      .valueChanges();
  }
}
