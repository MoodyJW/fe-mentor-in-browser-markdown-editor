import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  hamburgerClicked(event: boolean): void {
    console.log(event);
    this.toggleSidenav.emit(event);
  }

  deleteCurrentFile(): void {
    console.log('delete');
  }

  saveCurrentFile(): void {
    console.log('save');
  }
}
