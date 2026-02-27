import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  private bookService = inject(BookService);
  private router = inject(Router);

  books: Book[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.bookService.getAll().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load books.';
        this.isLoading = false;
      }
    });
  }

  addBook(): void {
    this.router.navigate(['/books/add']);
  }

  editBook(id: number): void {
    this.router.navigate(['/books/edit', id]);
  }

  deleteBook(id: number, title: string): void {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      this.bookService.delete(id).subscribe({
        next: () => {
          this.successMessage = `"${title}" has been deleted.`;
          this.books = this.books.filter(b => b.id !== id);
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to delete book.';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }
}
