import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MdFile } from 'src/app/models/md-file.model';
import { User } from 'src/app/models/user.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<boolean>();
  @Output() saveCurrentMdFile = new EventEmitter<{
    currentMdFile: MdFile;
    newMdFileName: string;
  }>();
  @Input() currentUser: User;

  isLargeScreen = false;
  newMdFileName: string;

  constructor(public deleteDialog: MatDialog) {}

  hamburgerClicked(event: boolean): void {
    this.toggleSidenav.emit(event);
  }

  openDeleteModal(): void {
    this.deleteDialog.open(DeleteModalComponent, {
      hasBackdrop: true,
      disableClose: false,
      backdropClass: 'dialog-backdrop',
      panelClass: 'dialog-panel',
      data: {
        currentUser: this.currentUser,
      },
    });
  }

  updateMdFileName(newMdFileName: string): void {
    this.newMdFileName = newMdFileName;
    console.log(this.newMdFileName);
  }

  saveMdFile(): void {
    this.saveCurrentMdFile.emit({
      currentMdFile: this.currentUser.currentMdFile,
      newMdFileName: this.newMdFileName ?? this.currentUser.currentMdFile.name,
    });
  }
}
