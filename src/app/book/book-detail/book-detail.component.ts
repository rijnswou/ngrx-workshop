import { Component, OnInit } from '@angular/core';
import { IBook } from '../shared/book';
import { ActivatedRoute } from '@angular/router';
import { BookDataService } from '../shared/book-data.service';
import { Store } from '@ngrx/store';
import { getBookSelector } from '../store/books.selectors';

@Component({
  selector: 'book-detail',
  templateUrl: 'book-detail.component.html',
  styleUrls: ['book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  public book: IBook;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookDataService,
    private store: Store<{}>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: { isbn: string }) => {
      this.store
        .select(getBookSelector(params.isbn))
        .subscribe((book) => (this.book = book));
      // this.bookService
      //   .getBookByIsbn(params.isbn)
      //   .subscribe((book) => (this.book = book));
    });
  }
}
