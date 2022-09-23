import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  currentTheme = window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light-theme'
    : 'dark-theme';
  isLightTheme = this.currentTheme === 'light-theme';
  themeToggleControl = new FormControl(this.isLightTheme);
  unsubscribe$ = new Subject();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.themeToggleControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLight: any) => {
        this.isLightTheme = isLight;
        this.toggleTheme();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  toggleTheme(): void {
    const bodyElem = this.document.body;
    const isLightTheme = bodyElem.classList.contains('light-theme');
    if (!isLightTheme) {
      this.currentTheme = 'light-theme';
      this.renderer.removeClass(bodyElem, 'dark-theme');
      this.renderer.addClass(bodyElem, this.currentTheme);
    } else {
      this.currentTheme = 'dark-theme';
      this.renderer.removeClass(bodyElem, 'light-theme');
      this.renderer.addClass(bodyElem, this.currentTheme);
    }
  }
}
