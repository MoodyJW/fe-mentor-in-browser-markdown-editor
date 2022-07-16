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
