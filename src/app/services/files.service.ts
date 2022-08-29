import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { MdFile } from '../models/md-file.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  unsubscribe$ = new Subject();

  constructor(private firestore: AngularFirestore, public http: HttpClient) {}

  createNewFile(userId: string, currentFiles: MdFile[]): void {
    this.createRandomFileName()
      .pipe(take(1))
      .subscribe((words: string[]) => {
        const randomNumber = Math.floor(Math.random() * 1936);
        const newFileName = `${words[0]}-${words[1]}-${randomNumber}`;
        const newFile = {
          id: this.firestore.createId(),
          createdAt: { seconds: Date.now() },
          name: newFileName,
          content: '',
        };
        this.firestore.doc(`users/${userId}`).update({
          mdFiles: [newFile, ...currentFiles],
          currentMdFile: newFile,
        });
      });
  }

  saveFile(currentUser: User): void {
    // PROBABLY JUST DO AN UPDATE ON THE FIRESTORE DOC
    // WOULD NEED TO UPDATE BOTH CURRENT FILE
    // AND THE FILE LIST
    // WORKS ALMOST EXACTLY LIKE DELETING WOULD, I GUESS
    this.firestore.doc(`users/${currentUser.id}`).update({
      ...currentUser,
    });
  }

  changeCurrentFile(userId: string, currentMdFile: MdFile): void {
    this.firestore.doc(`users/${userId}`).update({
      currentMdFile: currentMdFile,
    });
  }

  deleteCurrentFile(currentUser: User): void {
    const updatedFiles = currentUser.mdFiles.filter(
      (file) => file.id !== currentUser.currentMdFile.id
    );
    this.firestore.doc(`users/${currentUser.id}`).update({
      mdFiles: updatedFiles ?? [],
      currentMdFile: updatedFiles[0] ?? null,
    });
  }

  private createRandomFileName(): Observable<any> {
    const randomWordLength = Math.floor(Math.random() * 10 + 1);
    return this.http.get(
      `https://random-word-api.herokuapp.com/word?number=2&length=${randomWordLength}`
    );
  }
}
