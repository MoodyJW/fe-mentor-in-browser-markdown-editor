import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'showdown/dist/showdown.js';

import { MdFile } from 'src/app/models/md-file.model';

@Component({
  selector: 'app-md-content',
  templateUrl: './md-content.component.html',
  styleUrls: ['./md-content.component.scss'],
})
export class MdContentComponent implements OnChanges {
  @Input() currentMdFile!: MdFile;
  @Input() showMd!: boolean;

  showdown = require('showdown');
  converter = new this.showdown.Converter();
  mdContent!: string;
  mdFormControl = new FormControl('');
  mdPreview = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.currentMdFile?.currentValue) return;
    this.mdContent =
      this.currentMdFile?.content.replace(/\n{2,}/g, (m) =>
        m.replace(/\n/g, '<br/>')
      ) ?? null;
    this.mdContent = this.mdContent?.replace(/<br\/>([^<])/g, '<br/>\n\n$1');
    this.mdPreview = this.converter.makeHtml(this.mdContent);
    this.mdFormControl.patchValue(this.currentMdFile?.content);
    this.mdFormControl.valueChanges.subscribe((mdText) => {
      this.mdPreview = this.converter.makeHtml(mdText);
    });
  }
}
