import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent {
  @Input() actionType!:
    | 'openConfirm'
    | 'create'
    | 'save'
    | 'sidenavToggle'
    | 'confirmDelete';
  @Input() disabled = false;
  @Output() actionClicked = new EventEmitter<any>();

  menuIsOpen = true;

  sidenavToggleClicked(): void {
    this.menuIsOpen = !this.menuIsOpen;
    this.actionClicked.emit(this.menuIsOpen);
  }

  openConfirmDeleteDialog(): void {
    this.actionClicked.emit('openConfirm');
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
