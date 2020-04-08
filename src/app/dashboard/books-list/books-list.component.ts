import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BookService, Book, getAllBooks, bookActionTypes } from 'src/app/core/book';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'symbol', 'action'];
  books = new MatTableDataSource<any>([]);
  books$: Observable<Book[]>;
  bookToBeUpdated: Book;
  isUpdateActivated = false;
  bookForm: FormGroup;

  constructor(private store: Store, fb: FormBuilder, private router: Router) {
    this.bookForm = fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      symbol: ['', Validators.required]
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.books$ = this.store.select(getAllBooks);
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
