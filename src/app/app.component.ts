import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fe-mentor-in-browser-markdown-editor';
  users!: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.users = firestore.collection('users').valueChanges();
    this.users.subscribe((a) =>
      console.log(new Date(a[0].createdDate.seconds))
    );
  }
}
