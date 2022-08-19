import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { MdFile } from '../models/md-file.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  unsubscribe$ = new Subject();
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  createNewFile(userId: string, currentFiles: MdFile[]): void {
    const untitled = currentFiles.filter((file) =>
      file.name.startsWith('untitled-document')
    );
    console.log(untitled.length);
    const newFileName = untitled.length
      ? `untitled-document(${untitled.length}).md`
      : `untitled-document.md`;
    const file = {
      id: this.firestore.createId(),
      createdAt: { seconds: Date.now() },
      name: newFileName,
      content: '',
    };
    this.firestore.doc(`users/${userId}`).update({
      mdFiles: [file, ...currentFiles],
    });
  }

  saveFile(): void {}

  deleteCurrentFile(currentUser: User, currentMdFile: MdFile): void {
    // need to filter out deleted file
    // update the store mdfiles with filtered
    // this.userDoc = afs.doc<Item>('user/david');
    // this.tasks = this.userDoc.collection<Task>('tasks').valueChanges();
    // getUsers(userId: string): Observable<User[]> {
    //   return this.firestore
    //     .collection<User>('users', (ref) => ref.where('id', '==', userId))
    //     .valueChanges();
    // }
    // this.firestore.doc(`users/${userId}`).update({
    //   mdFiles: [file, ...currentFiles],
    // });
    const updatedFiles = currentUser.mdFiles.filter(
      (file) => file.id !== currentMdFile.id
    );
    console.log(updatedFiles);
    this.firestore.doc(`users/${currentUser.id}`).update({
      mdFiles: updatedFiles,
    });
    // this.firestore.doc(`users/${userId}`).update({
    //   mdFiles: this.firestore.FieldValue.arrayRemove({

    //   })
    // })
  }
}
