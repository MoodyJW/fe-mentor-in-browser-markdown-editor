import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MdFile } from 'src/app/models/md-file.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() currentMdFile!: MdFile;
  @Output() toggleSidenav = new EventEmitter<boolean>();
  // not sure but need some way to only display if large screen
  // can probably do something in a service or just listen for window sizes
  isLargeScreen = false;

  constructor(public deleteDialog: MatDialog) {}

  ngOnInit(): void {}

  hamburgerClicked(event: boolean): void {
    console.log('hamburger');
    this.toggleSidenav.emit(event);
  }

  openDeleteModal(): void {
    this.deleteDialog.open(DeleteModalComponent, {
      hasBackdrop: true,
      disableClose: false,
      backdropClass: 'dialog-backdrop',
      data: 'send file name probably?',
    });
  }

  saveCurrentFile(event: string): void {
    console.log('save');
  }
}
