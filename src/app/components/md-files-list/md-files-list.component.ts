import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MdFile } from 'src/app/models/md-file.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-md-files-list',
  templateUrl: './md-files-list.component.html',
  styleUrls: ['./md-files-list.component.scss'],
})
export class MdFilesListComponent implements OnInit {
  @Input() currentUser: User;
  @Output() mdFileSelected = new EventEmitter<MdFile>();

  constructor() {}

  ngOnInit(): void {}

  mdFileChanged(mdFile: MdFile): void {
    this.mdFileSelected.emit(mdFile);
  }
}
