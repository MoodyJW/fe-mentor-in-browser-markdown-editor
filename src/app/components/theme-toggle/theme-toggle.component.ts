import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent implements OnInit {
  userTheme = window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light-theme'
    : 'dark-theme';
  isLightTheme = this.userTheme === 'light-theme';
  themeToggleControl = new FormControl(this.isLightTheme);
  unsubscribe$ = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.themeToggleControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLight: any) => {
        this.isLightTheme = isLight;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
