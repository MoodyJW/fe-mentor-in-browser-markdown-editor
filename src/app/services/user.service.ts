import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  get userExists(): boolean {
    // check for user local storage key
    const userId = localStorage.getItem('id');
    return !!userId;
  }

  constructor(private firestore: AngularFirestore) {}

  createUser() {
    return 'obs from creating';
  }

  getUser() {
    if (this.userExists) {
      // return user here
      return;
    } else return this.createUser();
  }
}
