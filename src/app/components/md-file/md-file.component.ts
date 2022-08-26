import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MdFile } from 'src/app/models/md-file.model';

@Component({
  selector: 'app-md-file',
  templateUrl: './md-file.component.html',
  styleUrls: ['./md-file.component.scss'],
})
export class MdFileComponent implements OnInit {
  @Input() mdFile: MdFile;
  @Input() fileIsSelected: boolean;
  @Output() mdFileSelected = new EventEmitter<MdFile>();

  createdDate: Date;

  ngOnInit(): void {
    this.createdDate = new Date(this.mdFile.createdAt.seconds);
  }
}
