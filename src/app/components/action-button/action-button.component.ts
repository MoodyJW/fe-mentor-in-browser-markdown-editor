import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent {
  @Output() actionClicked = new EventEmitter<string>();
  @Output() sidenavMenuClicked = new EventEmitter<'open' | 'close'>();
  @Input() actionType:
    | 'openConfirm'
    | 'create'
    | 'save'
    | 'sidenavToggle'
    | 'confirmDelete';
  @Input() disabled = true;
  @Input() isMobileScreen = false;
  @Input() isTabletOrLarger = false;
  @Input() menuIsOpen = true;

  sidenavToggleClicked(): void {
    this.menuIsOpen = !this.menuIsOpen;
    this.sidenavMenuClicked.emit(this.menuIsOpen ? 'open' : 'close');
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
