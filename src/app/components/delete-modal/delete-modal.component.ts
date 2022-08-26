import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MdFile } from 'src/app/models/md-file.model';
import { User } from 'src/app/models/user.model';
import { FilesService } from 'src/app/services/files.service';
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter();

  userId = localStorage.getItem('inBrowserMarkdownId');

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    private filesService: FilesService,
    @Inject(MAT_DIALOG_DATA)
    public data: { currentUser: User }
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  deleteDocument() {
    this.filesService.deleteCurrentFile(this.data.currentUser);
    console.log('delete');
  }
}
