import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MdFile } from '../models/md-file.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private firestore: AngularFirestore) {}

  createNewFile(userId: string, currentFiles: MdFile[]): void {
    const untitled = currentFiles.filter((file) =>
      file.name.startsWith('untitled-document')
    );
    console.log(untitled.length);
    const newFileName = untitled.length
      ? `untitled-document(${untitled.length}).md`
      : `untitled-document.md`;
    const file = {
      createdAt: { seconds: Date.now() },
      name: newFileName,
      content: '',
    };
    this.firestore.doc(`users/${userId}`).update({
      mdFiles: [file, ...currentFiles],
    });
  }

  saveFile(): void {}

  deleteCurrentFile(user: User): void {
    // need to filter out deleted file
    // update the store mdfiles with filtered
  }
}
