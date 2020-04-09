import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BookService, Book, getAllBooks, bookActionTypes } from 'src/app/core/book';
import { Observable, merge, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksDataSource } from 'src/app/core/book/datasource/books.datasource';
import { AppState } from 'src/app/store/reducers';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'symbol', 'action'];
  books = new MatTableDataSource<any>([]);
  books$: BooksDataSource;
  bookToBeUpdated: Book;
  isUpdateActivated = false;
  bookForm: FormGroup;
  // Subscriptions
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>, fb: FormBuilder, private router: Router) {
    this.bookForm = fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      symbol: ['', Validators.required]
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    // If the user changes the sort order, reset back to the first page.
    const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.subscriptions.push(sortSubscription);

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
    const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => {

      })
    ).subscribe();
    this.subscriptions.push(paginatorSubscriptions);
    this.books$ = new BooksDataSource(this.store);
  }

  deleteBook(bookId: string) {
    this.store.dispatch(bookActionTypes.deleteBook({ bookId }));
  }

  showUpdateForm(book: Book) {
    this.bookToBeUpdated = { ...book };
    this.bookForm.patchValue(this.bookToBeUpdated)
    this.isUpdateActivated = true;
  }

  onAddBook() {
    this.router.navigateByUrl('/dashboard/books/add', {})
  }

  onUpdateBook() {
    const update: Update<Book> = {
      id: this.bookToBeUpdated.id,
      changes: {
        ...this.bookToBeUpdated,
        ...this.bookForm.value
      }
    };

    this.store.dispatch(bookActionTypes.updateBook({ update }));

    this.isUpdateActivated = false;
    this.bookToBeUpdated = null;
  }
}
