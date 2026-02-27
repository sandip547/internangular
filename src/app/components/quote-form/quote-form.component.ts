import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css'
})
export class QuoteFormComponent implements OnInit {
  private quoteService = inject(QuoteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  quote: Partial<Quote> = { text: '', author: '' };
  isEditMode = false;
  quoteId: number | null = null;
  isLoading = false;
  isFetching = false;
  errorMessage = '';
  pageTitle = 'Add New Quote';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.quoteId = +id;
      this.pageTitle = 'Edit Quote';
      this.loadQuote();
    }
  }

  loadQuote(): void {
    if (!this.quoteId) return;
    this.isFetching = true;

    this.quoteService.getById(this.quoteId).subscribe({
      next: (quote) => {
        this.quote = { text: quote.text, author: quote.author };
        this.isFetching = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load quote.';
        this.isFetching = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.quote.text || !this.quote.author) {
      this.errorMessage = 'Quote text and author are required.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    if (this.isEditMode && this.quoteId) {
      this.quoteService.update(this.quoteId, this.quote).subscribe({
        next: () => this.router.navigate(['/quotes']),
        error: () => {
          this.errorMessage = 'Failed to update quote.';
          this.isLoading = false;
        }
      });
    } else {
      this.quoteService.create(this.quote).subscribe({
        next: () => this.router.navigate(['/quotes']),
        error: () => {
          this.errorMessage = 'Failed to create quote.';
          this.isLoading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/quotes']);
  }
}
