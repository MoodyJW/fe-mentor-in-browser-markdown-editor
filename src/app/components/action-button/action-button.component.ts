import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements OnInit {
  // @Input() buttonText: string = '';
  @Input() actionType!: 'delete' | 'create' | 'save' | 'sidenavToggle';
  @Output() actionClicked = new EventEmitter<any>();

  menuIsOpen = true;

  constructor() {}

  ngOnInit(): void {}

  sidenavToggleClicked(): void {
    this.menuIsOpen = !this.menuIsOpen;
    this.actionClicked.emit(this.menuIsOpen);
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
