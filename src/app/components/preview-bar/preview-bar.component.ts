import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-bar',
  templateUrl: './preview-bar.component.html',
  styleUrls: ['./preview-bar.component.scss'],
})
export class PreviewBarComponent implements OnInit {
  isLargeScreen = false;
  showMd = true;

  constructor() {}

  ngOnInit(): void {}

  toggleMdPreview(): void {
    this.showMd = !this.showMd;
  }
}
