import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-preview-bar',
  templateUrl: './preview-bar.component.html',
  styleUrls: ['./preview-bar.component.scss'],
})
export class PreviewBarComponent {
  @Output() previewToggled = new EventEmitter<boolean>();

  isLargeScreen = false;
  showMd = true;

  toggleMdPreview(): void {
    this.showMd = !this.showMd;
    this.previewToggled.emit(this.showMd);
  }
}
