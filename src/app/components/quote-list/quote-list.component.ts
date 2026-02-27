import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.css'
})
export class QuoteListComponent implements OnInit {
  private quoteService = inject(QuoteService);
  private router = inject(Router);

  quotes: Quote[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.isLoading = true;
    this.quoteService.getAll().subscribe({
      next: (quotes) => {
        this.quotes = quotes;
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 404) {
          this.quotes = [];
        } else {
          this.errorMessage = 'Failed to load quotes.';
        }
        this.isLoading = false;
      }
    });
  }

  addQuote(): void {
    this.router.navigate(['/quotes/add']);
  }

  editQuote(id: number): void {
    this.router.navigate(['/quotes/edit', id]);
  }

  deleteQuote(id: number, author: string): void {
    if (confirm(`Delete quote by "${author}"?`)) {
      this.quoteService.delete(id).subscribe({
        next: () => {
          this.successMessage = 'Quote deleted successfully.';
          this.quotes = this.quotes.filter(q => q.id !== id);
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to delete quote.';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }
}
