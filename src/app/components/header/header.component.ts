import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MdFile } from 'src/app/models/md-file.model';
import { User } from 'src/app/models/user.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { SCREEN_WIDTHS } from '../../constants/screen-sizes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<'open' | 'close'>();
  @Output() saveCurrentMdFile = new EventEmitter<{
    currentMdFile: MdFile;
    newMdFileName: string;
  }>();
  @Input() currentUser: User;
  @Input() menuIsOpen = true;

  newMdFileName: string;
  isMobileScreen = false;
  isLargeScreen = false;
  isTabletOrLarger = false;

  constructor(public deleteDialog: MatDialog) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileScreen = window.innerWidth < SCREEN_WIDTHS.MOBILE_MAX;
    this.isLargeScreen = window.innerWidth > SCREEN_WIDTHS.DESKTOP_MIN;
    this.isTabletOrLarger = window.innerWidth > SCREEN_WIDTHS.TABLET_MIN;
  }

  ngOnInit(): void {
    this.isMobileScreen = window.innerWidth < SCREEN_WIDTHS.MOBILE_MAX;
    this.isLargeScreen = window.innerWidth > SCREEN_WIDTHS.DESKTOP_MIN;
    this.isTabletOrLarger = window.innerWidth > SCREEN_WIDTHS.TABLET_MIN;
  }

  hamburgerClicked(event: 'open' | 'close'): void {
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
  }

  saveMdFile(): void {
    this.saveCurrentMdFile.emit({
      currentMdFile: this.currentUser.currentMdFile,
      newMdFileName: this.newMdFileName ?? this.currentUser.currentMdFile.name,
    });
  }
}
