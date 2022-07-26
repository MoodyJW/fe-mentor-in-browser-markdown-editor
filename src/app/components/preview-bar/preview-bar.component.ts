import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-preview-bar',
  templateUrl: './preview-bar.component.html',
  styleUrls: ['./preview-bar.component.scss'],
})
export class PreviewBarComponent implements OnInit {
  @Output() previewToggled = new EventEmitter<boolean>();

  isLargeScreen = false;
  showMd = false;

  constructor() {}

  ngOnInit(): void {}

  toggleMdPreview(): void {
    this.showMd = !this.showMd;
    this.previewToggled.emit(this.showMd);
  }
}
