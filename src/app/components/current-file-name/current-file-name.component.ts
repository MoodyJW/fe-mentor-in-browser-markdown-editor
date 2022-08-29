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
import { takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { MdFile } from 'src/app/models/md-file.model';
import { DEFAULT_DEBOUNCE } from 'src/app/constants/default-values';

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
    this.mdFileNameControl.setValue(this.currentMdFile.name);
    this.mdFileNameControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe((mdFileName: string) => {
        this.mdFileNameChanged.emit(mdFileName);
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
