import { Component, Input, OnInit } from '@angular/core';
import { MdFile } from 'src/app/models/md-file.model';

@Component({
  selector: 'app-md-file',
  templateUrl: './md-file.component.html',
  styleUrls: ['./md-file.component.scss'],
})
export class MdFileComponent implements OnInit {
  @Input() mdFile!: MdFile;
  createdDate!: any;
  constructor() {}

  ngOnInit(): void {
    this.createdDate = new Date(this.mdFile.createdAt.seconds * 1000);
  }
}
