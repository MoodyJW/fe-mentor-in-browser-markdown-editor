import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from 'src/app/models/user.model';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  @Output() closeModal = new EventEmitter();

  userId: string = localStorage.getItem('inBrowserMarkdownId');

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    private filesService: FilesService,
    @Inject(MAT_DIALOG_DATA)
    public data: { currentUser: User }
  ) {}

  deleteDocument() {
    this.filesService.deleteCurrentFile(this.data.currentUser);
  }
}
