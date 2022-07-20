import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<boolean>();
  // not sure but need some way to only display if large screen
  // can probably do something in a service or just listen for window sizes
  isLargeScreen = false;

  constructor() {}

  ngOnInit(): void {}

  hamburgerClicked(event: boolean): void {
    console.log('hamburger');
    this.toggleSidenav.emit(event);
  }

  deleteCurrentFile(event: string): void {
    console.log('delete');
  }

  saveCurrentFile(event: string): void {
    console.log('save');
  }
}
