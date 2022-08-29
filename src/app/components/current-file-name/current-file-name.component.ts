import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { MdFile } from 'src/app/models/md-file.model';

@Component({
  selector: 'app-current-file-name',
  templateUrl: './current-file-name.component.html',
  styleUrls: ['./current-file-name.component.scss'],
})
export class CurrentFileNameComponent implements OnInit, OnDestroy, OnChanges {
  @Input() currentMdFile: MdFile;
  @Output() mdFileNameChanged = new EventEmitter<string>();
  mdFileNameControl: FormControl = new FormControl('', Validators.required);
  unsubscribe$ = new Subject();

  ngOnInit(): void {
    this.mdFileNameChanged.emit(this.currentMdFile.name);
    this.mdFileNameControl.setValue(this.currentMdFile.name);
    this.mdFileNameControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe((mdFileName: string) => {
        this.mdFileNameChanged.emit(mdFileName);
        console.log('no file name', mdFileName);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.currentMdFile?.currentValue) {
      this.mdFileNameControl.setValue(this.currentMdFile.name);
    } else {
      this.mdFileNameControl.setValue('');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
