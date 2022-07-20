import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MdFile } from 'src/app/models/md-file.model';

@Component({
  selector: 'app-current-file-name',
  templateUrl: './current-file-name.component.html',
  styleUrls: ['./current-file-name.component.scss'],
})
export class CurrentFileNameComponent implements OnInit {
  @Input() currentMdFile!: MdFile;

  fileNameControl: FormControl = new FormControl('', Validators.required);

  constructor() {}

  ngOnInit(): void {
    this.fileNameControl.setValue(this.currentMdFile.name);
  }
}
