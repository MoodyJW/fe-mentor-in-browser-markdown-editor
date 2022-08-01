import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements OnInit {
  // @Input() buttonText: string = '';
  @Input() actionType!:
    | 'delete'
    | 'create'
    | 'save'
    | 'sidenavToggle'
    | 'confirmDelete';
  @Output() actionClicked = new EventEmitter<any>();

  menuIsOpen = true;

  constructor(public deleteDialog: MatDialog) {}

  ngOnInit(): void {}

  sidenavToggleClicked(): void {
    this.menuIsOpen = !this.menuIsOpen;
    this.actionClicked.emit(this.menuIsOpen);
  }

  openConfirmDeleteDialog(): void {
    this.deleteDialog.open(DeleteModalComponent, {
      hasBackdrop: true,
      disableClose: false,
      backdropClass: 'dialog-backdrop',
    });
    this.actionClicked.emit('delete');
  }

  deleteCurrentFile(): void {
    this.actionClicked.emit('delete');
  }

  saveCurrentFile(): void {
    this.actionClicked.emit('save');
  }

  createNewFile(): void {
    this.actionClicked.emit('create');
  }
}
