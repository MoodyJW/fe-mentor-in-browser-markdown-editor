import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { MdFile } from '../models/md-file.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  unsubscribe$ = new Subject();

  constructor(private firestore: AngularFirestore) {}

  createNewFile(userId: string, currentFiles: MdFile[]): void {
    const untitled = currentFiles.filter((file) =>
      file.name.startsWith('untitled-document')
    );
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
      currentMdFile: file,
    });
  }

  saveFile(): void {}

  updateCurrentFile(userId: string, currentMdFile: MdFile): void {
    this.firestore.doc(`users/${userId}`).update({
      currentMdFile: currentMdFile,
    });
  }

  deleteCurrentFile(currentUser: User): void {
    const updatedFiles = currentUser.mdFiles.filter(
      (file) => file.id !== currentUser.currentMdFile.id
    );
    this.firestore.doc(`users/${currentUser.id}`).update({
      mdFiles: updatedFiles,
      currentMdFile: updatedFiles[0],
    });
  }
}
