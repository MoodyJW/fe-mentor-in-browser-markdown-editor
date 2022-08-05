import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MdFile } from 'src/app/models/md-file.model';

@Component({
  selector: 'app-current-file-name',
  templateUrl: './current-file-name.component.html',
  styleUrls: ['./current-file-name.component.scss'],
})
export class CurrentFileNameComponent implements OnChanges {
  @Input() currentMdFile!: MdFile;

  fileNameControl: FormControl = new FormControl('', Validators.required);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.currentMdFile?.currentValue) {
      this.fileNameControl.setValue(this.currentMdFile.name);
    }
  }
}
