import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar *ngIf="authService.isLoggedIn$ | async"></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [`:host { display: block; }`]
})
export class AppComponent {
  authService = inject(AuthService);
}
