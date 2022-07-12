import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements OnInit {
  @Input() buttonText: string = '';
  @Input() actionType: string = '';
  @Output() actionClicked = new EventEmitter<any>();

  menuOpen = false;

  constructor() {}

  ngOnInit(): void {}

  actionButtonClicked() {
    if (this.actionType === 'sidenav') {
      this.menuOpen = !this.menuOpen;
      this.actionClicked.emit(this.menuOpen);
    }
  }
}
