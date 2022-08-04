import { Component } from '@angular/core';

export interface User {
  createdDate: string;
  fileContent: string;
  fileName: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fe-mentor-in-browser-markdown-editor';
}
