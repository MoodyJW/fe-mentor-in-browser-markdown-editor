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
  @Output() mdFileNameChanged = new EventEmitter<string>();
  @Input() currentMdFile: MdFile;
  @Input() isMobileScreen: boolean;
  mdFileNameControl: FormControl = new FormControl('', Validators.required);
  unsubscribe$ = new Subject();

  ngOnInit(): void {
    this.mdFileNameChanged.emit(this.currentMdFile?.name);
    this.mdFileNameControl.setValue(this.currentMdFile?.name ?? '');
    this.mdFileNameControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe((mdFileName: string) => {
        this.mdFileNameChanged.emit(mdFileName);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes || !changes.currentMdFile) return;
    this.mdFileNameControl.setValue(this.currentMdFile?.name ?? null);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
