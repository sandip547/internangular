import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'books',
    canActivate: [authGuard],
    loadComponent: () => import('./components/book-list/book-list.component').then(m => m.BookListComponent)
  },
  {
    path: 'books/add',
    canActivate: [authGuard],
    loadComponent: () => import('./components/book-form/book-form.component').then(m => m.BookFormComponent)
  },
  {
    path: 'books/edit/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./components/book-form/book-form.component').then(m => m.BookFormComponent)
  },
  {
    path: 'quotes',
    canActivate: [authGuard],
    loadComponent: () => import('./components/quote-list/quote-list.component').then(m => m.QuoteListComponent)
  },
  {
    path: 'quotes/add',
    canActivate: [authGuard],
    loadComponent: () => import('./components/quote-form/quote-form.component').then(m => m.QuoteFormComponent)
  },
  {
    path: 'quotes/edit/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./components/quote-form/quote-form.component').then(m => m.QuoteFormComponent)
  },
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/books'
  }
];
