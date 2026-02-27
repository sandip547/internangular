import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  book: Partial<Book> = {
    title: '',
    author: '',
    isbn: '',
    price: 0,
    publishedDate: '',
    pages: 0
  };

  isEditMode = false;
  bookId: number | null = null;
  isLoading = false;
  isFetching = false;
  errorMessage = '';
  pageTitle = 'Add New Book';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.bookId = +id;
      this.pageTitle = 'Edit Book';
      this.loadBook();
    }
  }

  loadBook(): void {
    if (!this.bookId) return;
    this.isFetching = true;

    this.bookService.getById(this.bookId).subscribe({
      next: (book) => {
        this.book = {
          ...book,
          publishedDate: book.publishedDate ? book.publishedDate.substring(0, 10) : ''
        };
        this.isFetching = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load book details.';
        this.isFetching = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.book.title || !this.book.author) {
      this.errorMessage = 'Title and Author are required.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const bookData = {
      ...this.book,
      publishedDate: this.book.publishedDate
        ? new Date(this.book.publishedDate).toISOString()
        : new Date().toISOString()
    };

    if (this.isEditMode && this.bookId) {
      this.bookService.update(this.bookId, bookData).subscribe({
        next: () => this.router.navigate(['/books']),
        error: () => {
          this.errorMessage = 'Failed to update book.';
          this.isLoading = false;
        }
      });
    } else {
      this.bookService.create(bookData).subscribe({
        next: () => this.router.navigate(['/books']),
        error: () => {
          this.errorMessage = 'Failed to create book.';
          this.isLoading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/books']);
  }
}
