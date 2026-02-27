import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
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
    localStorage.setItem(this.themeKey, newValue ? 'dark' : 'light');
  }

  private loadTheme(): boolean {
    const stored = localStorage.getItem(this.themeKey);
    return stored === 'dark';
  }

  private applyTheme(isDark: boolean): void {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }
}
