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
    const updatedFiles = currentUser.mdFiles.filter(
      (file) => file.id !== currentMdFile.id
    );
    this.firestore.doc(`users/${currentUser.id}`).update({
      mdFiles: updatedFiles,
    });
  }
}
