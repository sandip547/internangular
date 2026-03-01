import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private themeKey = 'app_theme';
  private isDarkSubject = new BehaviorSubject<boolean>(this.loadTheme());
  isDark$ = this.isDarkSubject.asObservable();

  constructor() {
    this.applyTheme(this.isDarkSubject.value);
  }

  toggleTheme(): void {
    const newValue = !this.isDarkSubject.value;
    this.isDarkSubject.next(newValue);
    this.applyTheme(newValue);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.themeKey, newValue ? 'dark' : 'light');
    }
  }

  private loadTheme(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.themeKey) === 'dark';
    }
    return false;
  }

  private applyTheme(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  }
}