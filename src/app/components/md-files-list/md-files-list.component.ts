import { Component, Input, OnInit } from '@angular/core';
import { MdFile } from 'src/app/models/md-file.model';

@Component({
  selector: 'app-md-files-list',
  templateUrl: './md-files-list.component.html',
  styleUrls: ['./md-files-list.component.scss'],
})
export class MdFilesListComponent implements OnInit {
  @Input() mdFiles!: MdFile[];
  constructor() {}

  ngOnInit(): void {}
}
