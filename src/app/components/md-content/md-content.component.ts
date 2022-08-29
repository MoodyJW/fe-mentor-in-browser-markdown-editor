import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, debounceTime } from 'rxjs/operators';

import 'showdown/dist/showdown.js';

import { MdFile } from 'src/app/models/md-file.model';
import { DEFAULT_DEBOUNCE } from 'src/app/constants/default-values';

@Component({
  selector: 'app-md-content',
  templateUrl: './md-content.component.html',
  styleUrls: ['./md-content.component.scss'],
})
export class MdContentComponent implements OnChanges, OnInit {
  @Output() mdFileContentChanged = new EventEmitter<string>();
  @Input() currentMdFile!: MdFile;
  @Input() showMd: boolean = true;

  showdown = require('showdown');
  converter = new this.showdown.Converter();
  mdContent!: string;
  mdFormControl = new FormControl('');
  mdPreview = '';
  unsubscribe$ = new Subject();

  ngOnInit(): void {
    // this.mdFormControl.valueChanges()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.currentMdFile?.currentValue) return;
    this.mdContent =
      this.currentMdFile?.content.replace(/\n{2,}/g, (m) =>
        m.replace(/\n/g, '<br/>')
      ) ?? null;
    this.mdContent = this.mdContent?.replace(/<br\/>([^<])/g, '<br/>\n\n$1');
    this.mdPreview = this.converter.makeHtml(this.mdContent);
    this.mdFormControl.patchValue(this.currentMdFile?.content);
    this.mdFormControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(DEFAULT_DEBOUNCE),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((mdText: string) => {
        this.mdFileContentChanged.emit(mdText);
        this.mdPreview = this.converter.makeHtml(mdText);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
